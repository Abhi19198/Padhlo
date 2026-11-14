# Padhlo

A single-page web app that gives Computer Science students interactive,
data-driven career roadmaps — Web Development, App Development, Data Science,
Cyber Security, AI & ML, Cloud, DevOps, Game Development, Blockchain and
UI/UX. Each roadmap has phases, resources, recommended channels/courses,
practice topics and project ideas, plus a quiz ("Path Finder") that recommends
a path and a "My Journey" page that tracks visited roadmaps in the browser.

Pure HTML + CSS + vanilla JavaScript. No build step, no backend, no
dependencies at runtime.

## Run it

Any static server works — the app must be served over HTTP (opening
`index.html` via `file://` still renders, but `fetch`-based features and
routing behave best over HTTP):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or enable **GitHub Pages** for this repo (Settings → Pages → Deploy from a
branch → `main`, `/ (root)`) — `index.html` is at the repo root.

## Project layout

| Path | What it is |
| --- | --- |
| `index.html` | App shell (loads `data.js`, `script.js`, `style.css`) |
| `data.js` | All content: the 10 skills, roadmaps, links (`skillsData`) |
| `script.js` | The app engine: routing, rendering, search, quiz, journey, demo auth |
| `style.css` | All styling (dark neon theme) |
| `docs/TECHNICAL_REPORT.md` | Architecture overview |
| `docs/TECH_DEEP_DIVE.md` | Why each technology choice was made |
| `tests/` | Node tests — see below |

## Tests

```bash
npm test        # node --test on the files in tests/ (Node 18+; no dependencies to install)
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

## How it works

- **Routing:** `?skill=<id>` renders a skill detail page, `?page=journey`
  the progress page, `?page=news` the Tech Pulse news page. Back/forward
  works via `history.pushState` + `popstate`.
- **Data:** everything renders from the single `skillsData` array in
  `data.js`. To add a skill, add one object — the UI adapts automatically.
- **Progress & demo login:** stored only in the browser (`localStorage`
  keys `padhlo_visited`, `padhlo_user`, `padhlo_users`). There is no server
  and no real account system.
- **Tech Pulse:** fetches from the public `ok.surf` news API
  (`https://ok.surf/api/v1/cors/news-feed`) with no key. If that third-party
  service is down or unreachable, the page shows an offline state with a
  retry button — the rest of the app keeps working.

## Security notes

- Login/signup is a **demo only**. Passwords are stored in plain text in the
  browser's `localStorage`, so never reuse a real password here. There is no
  hard-coded or backdoor account (a previous hard-coded admin login was
  removed).
- The news page inserts article titles from a third-party API into the page;
  treat that feed as untrusted content.
- No secrets, API keys or credentials are stored in this repo.

## CI

`.github/workflows/ci.yml` runs `npm test` plus `node --check` on the JS
files on every push / pull request. It needs the **Workflows** permission on
the GitHub App installation to be added via the API; if the workflow file
cannot be pushed by automation, add it manually from this repo (the file is
checked in and ready).

## Contributing

Keep changes small and content-only where possible: fix/add links in
`data.js` (with a real, reachable URL — never `#`), keep the visual theme
consistent, and run `npm test` before opening a PR.
