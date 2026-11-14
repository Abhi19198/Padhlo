/**
 * Data tests for Padhlo.
 * Loads the real data.js (the same file the site ships) in a vm sandbox
 * and validates its structure. No DOM or network needed.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'data.js'), 'utf8');

function loadSkills() {
  const sandbox = {};
  vm.createContext(sandbox);
  // Top-level const is a lexical binding, not a global property, so return
  // it as the script's completion value instead of reading sandbox.skillsData.
  return vm.runInContext(src + '\n;skillsData;', sandbox, { filename: 'data.js' });
}

const skills = loadSkills();

test('data.js defines a skills array with 10 entries', () => {
  assert.ok(Array.isArray(skills));
  assert.equal(skills.length, 10);
});

test('every skill has a unique kebab-case id', () => {
  const ids = skills.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length, `duplicate ids: ${ids}`);
  for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/);
});

test('every skill has all required content fields, non-empty', () => {
  const required = ['title', 'icon', 'themeColor', 'difficulty', 'expertTip',
    'shortDesc', 'fullDesc', 'upcomingJobs', 'quizKeywords', 'animation',
    'roadmap', 'youtube', 'courses', 'practice', 'projects', 'sampleCode'];
  for (const s of skills) {
    for (const f of required) {
      assert.ok(s[f] !== undefined && s[f] !== null && s[f] !== '',
        `${s.id}: missing/empty ${f}`);
    }
    assert.ok(s.careers.length >= 1, `${s.id}: no careers`);
    assert.ok(s.quizKeywords.length >= 1, `${s.id}: no quiz keywords`);
    assert.ok(s.sampleCode.length >= 1, `${s.id}: no sample code`);
  }
});

test('every skill has exactly 3 roadmap phases with details', () => {
  for (const s of skills) {
    assert.equal(s.roadmap.length, 3, `${s.id}: expected 3 phases`);
    for (const step of s.roadmap) {
      assert.ok(step.step && step.details, `${s.id}: phase missing step/details`);
      assert.ok(Array.isArray(step.resources), `${s.id}: resources not an array`);
    }
  }
});

test('no dead "#" links; every youtube/course link is a real https URL', () => {
  const bad = [];
  for (const s of skills) {
    for (const link of [...s.youtube, ...s.courses]) {
      if (link.link === '#') bad.push(`${s.id}: ${link.name} -> #`);
      assert.ok(/^https:\/\//.test(link.link),
        `${s.id}: ${link.name} is not https: ${link.link}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('theme colours are valid hex and distinct per skill', () => {
  const colours = skills.map((s) => s.themeColor);
  for (const c of colours) assert.match(c, /^#[0-9a-fA-F]{6}$/, `bad colour ${c}`);
  assert.equal(new Set(colours).size, colours.length,
    `theme colours not distinct: ${colours}`);
});

test('practice difficulties use only known labels', () => {
  const allowed = new Set(['Beginner', 'Intermediate', 'Advanced']);
  for (const s of skills) {
    for (const p of s.practice) {
      assert.ok(allowed.has(p.difficulty),
        `${s.id}: unknown difficulty ${p.difficulty}`);
      assert.ok(p.topic, `${s.id}: practice topic empty`);
    }
  }
});

test('sample code lines are non-empty strings', () => {
  for (const s of skills) {
    for (const line of s.sampleCode) {
      assert.equal(typeof line, 'string');
      assert.ok(line.trim().length > 0, `${s.id}: empty sample line`);
    }
  }
});
