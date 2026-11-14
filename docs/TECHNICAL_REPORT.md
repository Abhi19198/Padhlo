# 📄 Padhlo. Technical Architecture Report

**Version:** 2.0 (Dynamic Engine) | **Author:** AI Development Partner

---

## 1. Project Overview

**Padhlo.** is a high-performance, single-page educational platform designed for Computer Science students. It provides interactive, data-driven career roadmaps with a premium "Tron-inspired" aesthetic.

## 2. Technology Stack

The project is built using purely native web technologies to ensure maximum performance, instant load times, and zero dependency overhead.

- **HTML5**: Semantic structure and host for the application shell.
- **CSS3 (Vanilla)**: Advanced styling using CSS Variables, Flexbox/Grid, and hardware-accelerated keyframe animations.
- **JavaScript (ES6+)**: Custom-built **Modular App Engine** for routing and dynamic rendering.
- **Data Architecture**: JSON-like JS object structure for scalable content management.

---

## 3. Core Software Architecture

The application follows a **"Single Source of Truth"** pattern. Everything you see on the screen is generated dynamically from a central data file.

### A. The Brain (`data.js`)

- **Purpose**: Stores all information about skills, roadmaps, career paths, and resources.
- **Interlinking**: Every skill object contains unique properties (`id`, `themeColor`, `roadmap`, `sampleCode`) that the Engine uses to configure the UI.

### B. The Engine (`script.js`)

- **State Management**: Tracks the current page (Home vs. Detail).
- **Dynamic Router**: Uses URL parameters (`?skill=web-dev`) to handle navigation without reloading the page.
- **Component System**: Contains reusable logic for:
  - `laptopMockup()`: Generates the code terminal with skill-specific logic.
  - `skillAnimation()`: Injects background visuals based on the skill category.
- **Theme Injector**: Dynamically updates CSS variables (`--primary`) when switching skills.

### C. The Visuals (`style.css`)

- **Tron Aesthetic**: Uses a dark palette with neon red highlights.
- **Performance Layer**: Implements `will-change` and `backdrop-filter` for smooth 60FPS animations.
- **Global Effects**: Scanline overlays and floating particle systems.

---

## 4. How Everything is Interlinked

**Step-by-Step Execution Flow:**

1.  **Load**: `index.html` loads and calls `AppEngine.init()`.
2.  **Read**: The Engine reads `skillsData` from `data.js`.
3.  **Render Home**: It maps through the data to create the skill cards.
4.  **User Action**: When a user clicks a card, the `navigateTo()` function updates the URL and triggers a re-render.
5.  **Dynamic Build**: The Engine reads the specific skill's `themeColor` and `sampleCode`. It updates the CSS colors and builds a custom Hero section.
6.  **Final Polish**: The `IntersectionObserver` triggers entrance animations as the user scrolls.

---

## 5. Optimization & Scalability

- **Traffic Handling**: The pure JS architecture means no server-side processing is required, there is no server-side processing, so it can be hosted as plain static files.
- **Adaptability**: To add a new skill (e.g., "AI Engineering"), you only need to add one object to `data.js`. The UI will adapt automatically.
- **Modern UX**: Features custom scrollbars, glassmorphism, and direct links to YouTube playlists.

---

_Generated for the developer of Padhlo._
