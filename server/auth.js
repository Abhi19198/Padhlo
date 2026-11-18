'use strict';

/**
 * Auth helpers: bcrypt password hashing (bcryptjs, pure JS — no native build)
 * and JWT session tokens (jsonwebtoken).
 *
 * The JWT secret comes from PADHLO_JWT_SECRET. If it is not set, a dev-only
 * default is used and a warning is printed — never use the default in
 * production.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.PADHLO_JWT_SECRET || 'padhlo-dev-secret-change-me';
const JWT_EXPIRES_IN = '7d';

if (!process.env.PADHLO_JWT_SECRET) {
  // eslint-disable-next-line no-console
  console.warn('[padhlo] WARNING: PADHLO_JWT_SECRET is not set — using a dev-only default. Set a real secret in production.');
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function checkPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

/** Express middleware: require a valid Bearer token, sets req.user. */
function requireAuth(req, res, next) {
  const header = req.get('Authorization') || '';
  const match = /^Bearer\s+(.+)$/.exec(header);
  if (!match) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  try {
    const payload = verifyToken(match[1]);
    req.user = { id: payload.sub, email: payload.email, name: payload.name };
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { hashPassword, checkPassword, signToken, verifyToken, requireAuth };
