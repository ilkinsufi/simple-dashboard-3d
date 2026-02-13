# Simple Dashboard 3D

React app with two pages: **Designers** and **Editor**. Designers page lists designers and allows adding new ones; Editor page provides a 3D canvas to add, select, move and edit objects linked to designers.

## Tech stack

- **React** + **TypeScript**
- **Vite**
- **TanStack Router** (file-based routing)
- **Tailwind CSS**
- **Zod** (validation)

## Run locally

**Prerequisites:** Node.js and [pnpm](https://pnpm.io/) installed.

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Other scripts

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Lint
pnpm lint
```

## Project structure

- `src/routes/` — TanStack Router file-based routes (Designers, Editor, root, index redirect, not-found)
- `src/components/` — Reusable components
- `src/` — Store, API layer, schemas as you add them
