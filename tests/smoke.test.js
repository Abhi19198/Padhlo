/**
 * Render smoke tests for Padhlo — boots the real index.html + data.js +
 * script.js in jsdom and checks the app actually renders and navigates.
 *
 * Skipped automatically when jsdom is not installed (it is a dev-only
 * dependency: `npm install --no-save jsdom`). CI runs the static tests only.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const root = path.join(__dirname, '..');

let JSDOM;
try {
  ({ JSDOM } = require('jsdom'));
} catch {
  JSDOM = null;
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const dataJs = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const appJs = fs.readFileSync(path.join(root, 'script.js'), 'utf8');

function boot(url = 'http://localhost/') {
  const errors = [];
  const dom = new JSDOM(html, {
    url,
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    beforeParse(window) {
      window.addEventListener('error', (e) => errors.push(e.message || String(e.error)));
      // jsdom has no IntersectionObserver; the app only uses it for reveal animations.
      window.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
      window.scrollTo = () => {};
      window.matchMedia = window.matchMedia || (() => ({
        matches: false, addListener() {}, removeListener() {},
      }));
    },
  });
  const { window } = dom;
  // Load the scripts as <script> elements, like a real browser: separate
  // window.eval() calls do NOT share top-level const/let bindings.
  for (const code of [dataJs, appJs]) {
    const el = window.document.createElement('script');
    el.textContent = code;
    window.document.head.appendChild(el);
  }
  // Top-level const bindings are not window properties; expose for tests.
  window.AppEngine = window.eval('AppEngine');
  window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));
  return { dom, window, errors };
}

test('home page renders 10 skill cards', { skip: !JSDOM }, (t) => {
  const { dom, window, errors } = boot();
  t.after(() => dom.window.close());
  assert.deepEqual(errors, [], `JS errors on load: ${errors}`);
  const cards = window.document.querySelectorAll('.skill-card[data-id]');
  assert.equal(cards.length, 10, `expected 10 skill cards, got ${cards.length}`);
  assert.ok(window.document.querySelector('#app').textContent.includes('Web Development'));
});

test('clicking a skill card renders its detail page', { skip: !JSDOM }, (t) => {
  const { dom, window } = boot();
  t.after(() => dom.window.close());
  window.document.querySelector('.skill-card[data-id="ai-ml"]').click();
  const text = window.document.querySelector('#app').textContent;
  assert.ok(text.includes('AI & Machine Learning'), 'detail title missing');
  assert.ok(text.includes('STRATEGIC LEARNING VECTOR'), 'roadmap missing');
  assert.ok(text.includes('Expert Tip:'), 'expert tip missing');
  assert.equal(window.location.search, '?skill=ai-ml');
});

test('unknown ?skill= id falls back to the home page', { skip: !JSDOM }, (t) => {
  const { dom, window } = boot('http://localhost/?skill=not-a-skill');
  t.after(() => dom.window.close());
  assert.equal(window.document.querySelectorAll('.skill-card[data-id]').length, 10);
});

test('search finds a skill and hides results on empty query', { skip: !JSDOM }, (t) => {
  const { dom, window } = boot();
  t.after(() => dom.window.close());
  const input = window.document.getElementById('skill-search');
  const results = window.document.getElementById('search-results');
  input.value = 'cyber';
  input.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert.equal(results.style.display, 'block');
  assert.ok(results.textContent.includes('Cyber Security'));
  input.value = '';
  input.dispatchEvent(new window.Event('input', { bubbles: true }));
  assert.equal(results.style.display, 'none');
});

test('quiz recommendation matches the selected keywords', { skip: !JSDOM }, (t) => {
  const { dom, window } = boot();
  t.after(() => dom.window.close());
  const container = window.document.createElement('div');
  window.document.body.appendChild(container);
  // design + web + logic all match Web Development best.
  window.AppEngine.showQuizResult(container, ['design', 'web', 'logic'], 'Tester', () => {});
  assert.ok(container.textContent.includes('Web Development'),
    `expected Web Development, got: ${container.textContent.slice(0, 200)}`);
  // Negative case: keywords that match nothing well still return a real skill, never crash.
  const container2 = window.document.createElement('div');
  window.document.body.appendChild(container2);
  window.AppEngine.showQuizResult(container2, ['zzz', 'qqq'], 'Tester', () => {});
  assert.ok(container2.textContent.includes('Ready to go, Tester!'));
});

test('journey page renders with zero progress for a new visitor', { skip: !JSDOM }, (t) => {
  const { dom, window } = boot();
  t.after(() => dom.window.close());
  window.AppEngine.navigateTo(null, 'journey');
  const text = window.document.querySelector('#app').textContent;
  assert.ok(text.includes('My Journey'));
  assert.ok(text.includes('0%'), 'expected 0% progress for a fresh visitor');
});
