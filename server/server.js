'use strict';

/**
 * Padhlo server — serves the static frontend and a small REST API.
 *
 * Run:  npm install && npm start        (http://localhost:3000)
 * Env:  PORT (default 3000), PADHLO_DB (default data/padhlo.db),
 *       PADHLO_JWT_SECRET (set a real secret in production).
 *
 * API:
 *   POST /api/auth/signup   { name, email, password } -> { token, user }
 *   POST /api/auth/login    { email, password }        -> { token, user }
 *   POST /api/auth/logout   (Bearer token)              -> { ok: true }
 *   GET  /api/auth/me      (Bearer token)              -> { user }
 *   GET  /api/journey      (Bearer token)              -> { visited: [skill ids] }
 *   POST /api/journey      (Bearer token) { visited }  -> { visited: [skill ids] }
 *
 * Passwords are hashed with bcrypt and never stored or returned in plain
 * text. Journey progress is stored server-side per user, so it follows the
 * user across devices; guests keep using browser localStorage only.
 */

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const express = require('express');

const db = require('./db');
const { hashPassword, checkPassword, signToken, requireAuth } = require('./auth');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.env.PORT || 3000);

/** Valid roadmap ids, loaded from data.js so the server and frontend agree. */
function loadSkillIds() {
  const code = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  // `const` bindings don't attach to the sandbox object, so evaluate the
  // array as the script's completion value instead.
  const skills = vm.runInContext(`${code}\nskillsData;`, sandbox);
  return new Set((skills || []).map((s) => s.id));
}

const VALID_SKILL_IDS = loadSkillIds();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createApp() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  // Never serve the server code, the database, or VCS metadata.
  app.use((req, res, next) => {
    if (/^\/(server|data|\.git|tests|node_modules)(\/|$)/.test(req.path)) {
      return res.status(404).json({ error: 'Not found' });
    }
    return next();
  });

  // --- Auth ---
  app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body || {};
    if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email is required' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    const cleanEmail = email.trim().toLowerCase();
    if (db.findUserByEmail(cleanEmail)) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }
    const user = db.createUser({
      name: name.trim(),
      email: cleanEmail,
      passwordHash: await hashPassword(password),
    });
    return res.status(201).json({ token: signToken(user), user });
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = db.findUserByEmail(email.trim().toLowerCase());
    if (!user || !(await checkPassword(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const safe = { id: user.id, name: user.name, email: user.email };
    return res.json({ token: signToken(safe), user: safe });
  });

  app.post('/api/auth/logout', requireAuth, (req, res) => {
    // JWTs are stateless: logout is the client discarding its token.
    // The endpoint exists so the client has one place to end the session.
    return res.json({ ok: true });
  });

  app.get('/api/auth/me', requireAuth, (req, res) => {
    const user = db.findUserById(req.user.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    return res.json({ user });
  });

  // --- Journey (visited roadmaps) ---
  app.get('/api/journey', requireAuth, (req, res) => {
    return res.json({ visited: db.getJourney(req.user.id) });
  });

  app.post('/api/journey', requireAuth, (req, res) => {
    const { visited } = req.body || {};
    if (!Array.isArray(visited)) {
      return res.status(400).json({ error: 'visited must be an array of roadmap ids' });
    }
    // Keep only known roadmap ids, de-duplicated, in first-seen order.
    const clean = [...new Set(visited.filter((id) => typeof id === 'string' && VALID_SKILL_IDS.has(id)))];
    return res.json({ visited: db.saveJourney(req.user.id, clean) });
  });

  // --- Static frontend (same files as before) ---
  app.use(express.static(ROOT, { dotfiles: 'ignore', index: 'index.html' }));

  // Unknown API route (not a static file).
  app.use('/api', (req, res) => res.status(404).json({ error: 'Unknown API endpoint' }));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error('[padhlo] error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[padhlo] server running at http://localhost:${PORT} (db: ${db.DB_PATH})`);
  });
}

module.exports = { createApp, VALID_SKILL_IDS };
