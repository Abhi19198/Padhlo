/**
 * Static site checks for Padhlo — no DOM, no network.
 * Guards the regressions found in the 2026-11-14 audit.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

const html = read('index.html');
const js = read('script.js');
const css = read('style.css');
const data = read('data.js');

test('index.html loads the files that exist at the repo root', () => {
  for (const f of ['style.css', 'data.js', 'script.js']) {
    assert.ok(html.includes(f), `index.html does not reference ${f}`);
    assert.ok(exists(f), `${f} referenced but missing`);
  }
});

test('no leftover ConceptCrush branding or dead og-image domain', () => {
  for (const [name, src] of [['index.html', html], ['script.js', js], ['data.js', data], ['style.css', css]]) {
    assert.ok(!src.includes('ConceptCrush'), `${name} still mentions ConceptCrush`);
    assert.ok(!src.includes('conceptcrush.edu'), `${name} still links conceptcrush.edu`);
  }
});

test('no hard-coded credentials anywhere in the shipped code', () => {
  for (const [name, src] of [['script.js', js], ['data.js', data], ['index.html', html]]) {
    assert.ok(!src.includes('codex@agent.ai'), `${name} has hard-coded admin email`);
    assert.ok(!src.includes('concept_crush'), `${name} has hard-coded admin password`);
  }
});

test('localStorage keys use the padhlo_ prefix', () => {
  assert.ok(!/\bcc_/.test(js), 'script.js still uses cc_ localStorage keys');
  for (const k of ['padhlo_user', 'padhlo_users', 'padhlo_visited']) {
    assert.ok(js.includes(k), `script.js missing ${k}`);
  }
});

test('session storage never stores a password', () => {
  // handleLogin/handleSignup must only persist { name, email } as the session.
  assert.ok(!js.includes("localStorage.setItem('padhlo_user', JSON.stringify(foundUser))"));
  assert.ok(!js.includes("localStorage.setItem('padhlo_user', JSON.stringify(newUser))"));
});

test('CSS defines every dynamic class the JS renders', () => {
  // badge-<first word of difficulty, lowercased>
  for (const cls of ['badge-beginner', 'badge-moderate', 'badge-advanced', 'badge-very']) {
    assert.ok(css.includes(`.${cls}`), `style.css missing .${cls}`);
  }
  assert.ok(css.includes('.notification-portal'), 'style.css missing .notification-portal');
  // .modal-overlay is injected at runtime by injectGlobalStyles() in script.js.
  assert.ok(js.includes('.modal-overlay'), 'script.js does not inject .modal-overlay');
});

test('fonts referenced in CSS are loaded in index.html', () => {
  for (const font of ['Orbitron', 'Share+Tech+Mono']) {
    assert.ok(html.includes(font), `index.html does not load ${font}`);
  }
});

test('logo link is relative (works under a GitHub Pages subpath)', () => {
  assert.ok(!html.includes('href="/"'), 'logo still links to site root /');
  assert.ok(html.includes('href="./"'), 'logo does not link to ./');
});

test('README documents how to run and test', () => {
  const readme = read('README.md');
  assert.ok(readme.includes('http.server') || readme.includes('GitHub Pages'));
  assert.ok(readme.includes('npm test'));
});

test('CI workflow exists and runs the tests', () => {
  assert.ok(exists('.github/workflows/ci.yml'));
  assert.ok(read('.github/workflows/ci.yml').includes('npm test'));
});
