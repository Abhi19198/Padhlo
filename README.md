# Padhlo

A single-page web app that gives Computer Science students interactive,
data-driven career roadmaps — Web Development, App Development, Data Science,
Cyber Security, AI & ML, Cloud, DevOps, Game Development, Blockchain and
UI/UX. Each roadmap has phases, resources, recommended channels/courses,
practice topics and project ideas, plus a quiz ("Path Finder") that recommends
a path and a "My Journey" page that tracks visited roadmaps in the browser.

Pure HTML + CSS + vanilla JavaScript frontend, with an optional
Node.js + Express backend (SQLite) that adds real accounts and
server-side journey progress. No build step.

## Run it

Full app (frontend + backend — accounts and synced progress):

```bash
npm install
npm start
# open http://localhost:3000
```

The server stores its SQLite database in `data/padhlo.db` (created on first
run, never committed). Environment variables: `PORT` (default `3000`),
`PADHLO_DB` (database path), `PADHLO_JWT_SECRET` (set a real secret in
production — a dev-only default is used otherwise).

Static only (no backend — the app still works, but login is unavailable
and journey progress stays in the browser's localStorage):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or enable **GitHub Pages** for this repo (Settings → Pages → Deploy from a
branch → `main`, `/ (root)`) — `index.html` is at the repo root.

## API

All `/api/*` routes return JSON. Auth uses a JWT (`Authorization: Bearer
<token>`, issued at signup/login, valid 7 days).

| Method & path | What it does |
| --- | --- |
| `POST /api/auth/signup` | `{ name, email, password }` (password ≥ 8 chars) → `{ token, user }` |
| `POST /api/auth/login` | `{ email, password }` → `{ token, user }` |
| `POST /api/auth/logout` | Ends the session (client discards its token) |
| `GET /api/auth/me` | The logged-in user |
| `GET /api/journey` | `{ visited: [roadmap ids] }` for the logged-in user |
| `POST /api/journey` | `{ visited: [roadmap ids] }` — unknown ids are dropped, duplicates removed |

## Project layout

| Path | What it is |
| --- | --- |
| `index.html` | App shell (loads `data.js`, `script.js`, `style.css`) |
| `data.js` | All content: the 10 skills, roadmaps, links (`skillsData`) |
| `script.js` | The app engine: routing, rendering, search, quiz, journey, server-backed auth |
| `style.css` | All styling (dark neon theme) |
| `server/server.js` | Express app: static files + `/api/*` routes |
| `server/db.js` | SQLite storage (`users`, `journey`) via Node's built-in `node:sqlite` |
| `server/auth.js` | bcrypt password hashing + JWT issue/verify |
| `data/padhlo.db` | SQLite database (created at runtime, gitignored) |
| `docs/TECHNICAL_REPORT.md` | Architecture overview |
| `docs/TECH_DEEP_DIVE.md` | Why each technology choice was made |
| `tests/` | Node tests — see below |

## Tests

```bash
npm test        # node --test on the files in tests/ (Node 22.5+; npm install first)
```

- `tests/data.test.js` — validates `data.js`: 10 skills, unique ids, every
  required field present, no dead `#` links, all links `https://`, valid and
  distinct theme colours, 3 roadmap phases per skill, quiz keywords present.
- `tests/site.test.js` — static checks: referenced files exist, no leftover
  old branding, no hard-coded credentials, CSS covers the badge/notification
  classes the JS uses, fonts referenced in CSS are loaded in `index.html`.
- `tests/smoke.test.js` — renders the app in jsdom (home page, skill detail,
  search, quiz recommendation) and checks the DOM. Skipped automatically if
  `jsdom` is not installed; to run it locally: `npm install --no-save jsdom`
  (dev-only, not needed for CI).
- `tests/api.test.js` — boots the real server on an ephemeral port with a
  throwaway SQLite file and exercises signup/login/journey over HTTP,
  including that passwords are bcrypt-hashed and unknown roadmap ids are
  rejected. Needs the dependencies installed (`npm install`).

## How it works

- **Routing:** `?skill=<id>` renders a skill detail page, `?page=journey`
  the progress page, `?page=news` the Tech Pulse news page. Back/forward
  works via `history.pushState` + `popstate`.
- **Data:** everything renders from the single `skillsData` array in
  `data.js`. To add a skill, add one object — the UI adapts automatically.
- **Progress & login:** when logged in, visited roadmaps sync to the
  server (`GET/POST /api/journey`) and follow the user across devices;
  anything explored as a guest merges in on login. Guests keep progress
  in the browser only (`localStorage` key `padhlo_visited`). The session
  stores identity only (`padhlo_user` = `{ name, email }`) and the JWT
  (`padhlo_token`) — never a password.
- **Tech Pulse:** fetches from the public `ok.surf` news API
  (`https://ok.surf/api/v1/cors/news-feed`) with no key. If that third-party
  service is down or unreachable, the page shows an offline state with a
  retry button — the rest of the app keeps working.

## Security notes

- Passwords are hashed with bcrypt (bcryptjs) and never stored or returned
  in plain text. The old demo login stored passwords in plain text in
  `localStorage` — that store is gone; on first load the app deletes the
  legacy `padhlo_users` key if it exists. There is no hard-coded or
  backdoor account (a previous hard-coded admin login was removed).
- Auth is a JWT (7-day expiry) sent as `Authorization: Bearer <token>`.
  The token lives in `localStorage` — good enough for this learning
  project, but a production app would use an httpOnly cookie instead.
- The server never serves `server/`, `data/` (the SQLite file), `.git`,
  `tests/` or `node_modules/` — requests to those paths get 404.
- Set `PADHLO_JWT_SECRET` to a real secret in production; the dev default
  is only for local use.
- The news page inserts article titles from a third-party API into the page;
  treat that feed as untrusted content.
- No secrets, API keys or credentials are stored in this repo.

## CI

CI is prepared but **not yet live**: pushing `.github/workflows/ci.yml`
through the API is blocked with `403 Resource not accessible by
integration` — the GitHub App installation for this repo does not have the
**Workflows** permission. Until that permission is granted (repo Settings →
GitHub Apps), add the workflow manually: in the GitHub web UI, create
`.github/workflows/ci.yml` on `main` with exactly this content:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Syntax check
        run: npm run check
      - name: Tests
        run: npm test
```

It runs `npm run check` (`node --check` on the JS files) and `npm test` on
every push / pull request to `main`.

## Contributing

Keep changes small and content-only where possible: fix/add links in
`data.js` (with a real, reachable URL — never `#`), keep the visual theme
consistent, and run `npm test` before opening a PR.
