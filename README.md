# Simple Dashboard 3D

React app with two pages: **Designers** and **Editor**. Designers page lists designers and allows adding new ones; Editor page provides a 3D canvas to add, select, move and edit objects linked to designers.

## Tech stack

- **React** + **TypeScript**
- **Vite**
- **TanStack Router** (file-based routing, meta/head, not-found)
- **Tailwind CSS**
- **Zod** (schemas & validation)

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

- `src/routes/` — TanStack Router file-based routes: Designers, Editor, root layout, index redirect to `/designers`, 404 not-found
- `src/components/` — Reusable UI: `LinkButton`, `DesignerForm`, `not-found` page
- `src/schemas/` — Zod validation: `designer.ts` (Designer + DesignerFormSchema), `object.ts` (SceneObject + ObjectFormSchema), `index.ts` re-exports
- `src/store/` — State (e.g. Zustand) for designers and objects
- `src/api/` — Mock API layer (to be wired to store; easy swap for real API later)
