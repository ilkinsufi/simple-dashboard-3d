# Simple Dashboard 3D

A small React app with two pages: **Designers** and **Editor**. Built as a front-end test (React + 3D).

- **Designers** — List designers, add new (modal form), remove. Data is stored via a mock API and persists in the browser.
- **Editor** — 3D canvas to add, select, move and edit objects linked to designers.

---

## Tech stack

| Area         | Choice                       |
| ------------ | ---------------------------- |
| UI           | React 19, TypeScript         |
| Build        | Vite                         |
| Routing      | TanStack Router (file-based) |
| State        | Zustand (+ persist)          |
| Styling      | Tailwind CSS, DaisyUI        |
| Validation   | Zod                          |
| Code quality | ESLint, Prettier             |

---

## Run locally

**Requirements:** Node.js 18+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Then open the URL from the terminal (e.g. `http://localhost:5173`).

---

## Scripts

| Command             | Description                |
| ------------------- | -------------------------- |
| `pnpm dev`          | Start dev server           |
| `pnpm build`        | Production build           |
| `pnpm preview`      | Preview production build   |
| `pnpm lint`         | Run ESLint                 |
| `pnpm format`       | Format with Prettier       |
| `pnpm format:check` | Check formatting (e.g. CI) |

---

## Project structure

```
src/
  api/           # Mock API (designers & objects). Swap for real API here.
  components/    # AddDesignerModal, PageTabs, not-found, etc.
  data/          # Initial mock designers
  routes/        # TanStack Router: designers, editor, root, index, 404
  schemas/       # Zod: designer, object (+ form schemas)
  store/         # Zustand: designers, objects (with persist)
```

---

## Deployment

The app can be deployed to any static host (e.g. Vercel, GitHub Pages). Use the same build:

```bash
pnpm build
```

Output is in `dist/`. For GitHub Pages, set the repo’s base path in Vite config if needed.
