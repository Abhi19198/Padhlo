/**
 * API tests for the Padhlo backend — boots the real Express server on an
 * ephemeral port with a throwaway SQLite file and exercises the auth and
 * journey endpoints over HTTP with the global fetch.
 */
'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

// Temp DB + test JWT secret, set BEFORE requiring the server.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'padhlo-api-test-'));
process.env.PADHLO_DB = path.join(tmpDir, 'test.db');
process.env.PADHLO_JWT_SECRET = 'test-secret-for-api-tests';

const { createApp } = require('../server/server');
const db = require('../server/db');

let base;
let server;

test.before(async () => {
  const app = createApp();
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  db.closeDb();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

async function req(p, { method = 'GET', body = undefined, token = undefined } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(base + p, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

test('static frontend is served and server internals are not', async () => {
  const home = await fetch(base + '/');
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Padhlo/);
  assert.equal((await req('/server/server.js')).status, 404);
  assert.equal((await req('/data/padhlo.db')).status, 404);
  assert.equal((await req('/api/nope')).status, 404);
});

test('signup creates a user, hashes the password, and returns a token', async () => {
  const { status, data } = await req('/api/auth/signup', {
    method: 'POST',
    body: { name: 'Test Explorer', email: 'test@padhlo.dev', password: 'hunter2-hunter2' },
  });
  assert.equal(status, 201);
  assert.equal(data.user.email, 'test@padhlo.dev');
  assert.equal(data.user.name, 'Test Explorer');
  assert.ok(typeof data.token === 'string' && data.token.length > 20);
  assert.ok(!('password_hash' in data.user), 'password hash leaked in response');
  // Stored hash is bcrypt, never the plain password.
  const stored = db.findUserByEmail('test@padhlo.dev');
  assert.ok(stored.password_hash.startsWith('$2b$'), 'password not bcrypt-hashed');
  assert.notEqual(stored.password_hash, 'hunter2-hunter2');
});

test('signup validation and duplicate email', async () => {
  assert.equal((await req('/api/auth/signup', {
    method: 'POST', body: { name: 'X', email: 'x@padhlo.dev', password: 'short' },
  })).status, 400, 'short password must be rejected');
  assert.equal((await req('/api/auth/signup', {
    method: 'POST', body: { name: 'X', email: 'not-an-email', password: 'long-enough-1' },
  })).status, 400, 'bad email must be rejected');
  assert.equal((await req('/api/auth/signup', {
    method: 'POST', body: { name: 'Again', email: 'test@padhlo.dev', password: 'another-long-1' },
  })).status, 409, 'duplicate email must be rejected');
});

let token;
test('login rejects a wrong password and accepts the right one', async () => {
  assert.equal((await req('/api/auth/login', {
    method: 'POST', body: { email: 'test@padhlo.dev', password: 'wrong-password' },
  })).status, 401);
  const { status, data } = await req('/api/auth/login', {
    method: 'POST', body: { email: 'test@padhlo.dev', password: 'hunter2-hunter2' },
  });
  assert.equal(status, 200);
  assert.ok(data.token);
  token = data.token;
});

test('journey requires auth and round-trips visited roadmaps', async () => {
  assert.equal((await req('/api/journey')).status, 401, 'no token must be rejected');
  assert.equal((await req('/api/journey', { token: 'bogus' })).status, 401, 'bad token must be rejected');
  const empty = await req('/api/journey', { token });
  assert.equal(empty.status, 200);
  assert.deepEqual(empty.data.visited, []);

  const saved = await req('/api/journey', {
    method: 'POST', token,
    body: { visited: ['web-development', 'ai-ml', 'not-a-skill', 'web-development'] },
  });
  assert.equal(saved.status, 200);
  // Unknown ids are dropped, duplicates removed.
  assert.deepEqual(saved.data.visited, ['web-development', 'ai-ml']);

  const fetched = await req('/api/journey', { token });
  assert.deepEqual(fetched.data.visited, ['web-development', 'ai-ml']);

  assert.equal((await req('/api/journey', {
    method: 'POST', token, body: { visited: 'web-development' },
  })).status, 400, 'non-array visited must be rejected');
});

test('me and logout work with a valid token', async () => {
  const me = await req('/api/auth/me', { token });
  assert.equal(me.status, 200);
  assert.equal(me.data.user.email, 'test@padhlo.dev');
  const out = await req('/api/auth/logout', { method: 'POST', token });
  assert.equal(out.status, 200);
  assert.equal(out.data.ok, true);
});
