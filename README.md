# Simple Dashboard 3D

A small React app with two pages: **Designers** and **Editor**. Built as a front-end test (React + 3D).

- **Designers** — List designers, add new (modal form), remove. Data is stored via a mock API and persists in the browser.
- **Editor** — 3D canvas: double-click to add an object at that spot (then pick designer, name, color, size), click to select, drag to move. Objects highlight on hover. Edit panel on the left for name, designer, color, size and position; save closes the panel. “How to use” tips in the sidebar. Layout is responsive with a scrollable sidebar and a canvas that keeps a usable height on mobile.

---

## Tech stack

| Area         | Choice                            |
| ------------ | --------------------------------- |
| UI           | React 19, TypeScript              |
| Build        | Vite                              |
| Routing      | TanStack Router (file-based)      |
| State        | Zustand (+ persist)               |
| 3D           | Three.js, React Three Fiber, Drei |
| Styling      | Tailwind CSS, DaisyUI             |
| Validation   | Zod                               |
| Code quality | ESLint, Prettier                  |

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
| `pnpm test`         | Run tests (Vitest)         |
| `pnpm test:watch`   | Run tests in watch mode    |

---

## Project structure

```
src/
  api/           Mock API (designers & objects). Swap for real API here.
  components/    Scene3D, AddDesignerModal, AddObjectModal, PageTabs, not-found, Footer
  data/          Initial mock designers
  routes/        TanStack Router: designers, editor, root, index, 404
  schemas/       Zod: designer, object (incl. ObjectEditSchema for edit form)
  store/         Zustand: designers, objects (with persist)
```

---

## Deployment

The app can be deployed to any static host (e.g. Vercel, GitHub Pages). Use the same build:

```bash
pnpm build
```

Output is in `dist/`. For GitHub Pages, set the repo’s base path in Vite config if needed.
