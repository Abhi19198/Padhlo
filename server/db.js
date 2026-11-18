'use strict';

/**
 * SQLite storage for Padhlo (Node's built-in node:sqlite, no native modules).
 *
 * Tables:
 *   users   — id, name, email (unique), password_hash, created_at
 *   journey — user_id (unique), visited_json (JSON array of skill ids), updated_at
 *
 * The database file lives in data/padhlo.db by default (see .gitignore — it is
 * never committed). Override with the PADHLO_DB environment variable, e.g.
 * PADHLO_DB=/tmp/test.db for tests.
 */

const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = process.env.PADHLO_DB || path.join(__dirname, '..', 'data', 'padhlo.db');

let db = null;

function getDb() {
  if (db) return db;
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS journey (
      user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      visited_json TEXT NOT NULL DEFAULT '[]',
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  return db;
}

function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}

function createUser({ name, email, passwordHash }) {
  const stmt = getDb().prepare(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
  );
  const result = stmt.run(name, email, passwordHash);
  return { id: result.lastInsertRowid, name, email };
}

function findUserByEmail(email) {
  return getDb().prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function findUserById(id) {
  return getDb().prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id);
}

function getJourney(userId) {
  const row = getDb().prepare('SELECT visited_json FROM journey WHERE user_id = ?').get(userId);
  if (!row) return [];
  try {
    const parsed = JSON.parse(row.visited_json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveJourney(userId, visited) {
  const json = JSON.stringify(visited);
  getDb()
    .prepare(
      `INSERT INTO journey (user_id, visited_json, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(user_id) DO UPDATE SET visited_json = excluded.visited_json, updated_at = datetime('now')`
    )
    .run(userId, json);
  return visited;
}

module.exports = { getDb, closeDb, createUser, findUserByEmail, findUserById, getJourney, saveJourney, DB_PATH };
