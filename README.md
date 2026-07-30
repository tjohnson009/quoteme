# QuoteMe

> A personal quote library — save the words that matter, tag them, add your own notes, and revisit them anytime. Built with Next.js, React, Express, and Supabase.

**Live demo:** [quoteme-live.vercel.app](https://quoteme-live.vercel.app/) · **Source:** [github.com/tjohnson009/quoteme](https://github.com/tjohnson009/quoteme)

<!-- Screenshots go here once available. Suggested: docs/screenshot-dashboard.png, docs/screenshot-add-quote.png -->

## What It Is

QuoteMe is a full-stack web app for building a personal collection of quotes. Sign up, save quotes with attribution, tag them by theme, add your own notes about why they resonate, and come back to them whenever you need. Built end-to-end — auth, database, API, UI, and deployment.

## Features

- **Auth** — email/password signup and login backed by Supabase
- **Full CRUD** for quotes: create, read, update, delete
- **Tags and notes** — categorize each quote and attach personal reflections
- **Progressive disclosure** — notes and tags hide behind toggles so cards start clean and expand on demand
- **Responsive layout** — single-column on mobile, two-column on wider screens
- **Dark mode** — follows OS preference via CSS variables
- **Accessible modals** — Escape-to-close, focus management, backdrop dismiss
- **Deployed** — Vercel (frontend) + Render (backend) + Supabase (managed Postgres)

## Tech Stack

| Layer | Choice |
|---|---|
| Language | TypeScript |
| Frontend | Next.js (Pages Router), React 19, Tailwind CSS v4 |
| Backend | Express (Node) |
| Database + Auth | Supabase (Postgres) |
| Hosting | Vercel (frontend) + Render (backend) |

## Architecture

Every browser request follows a proxy pattern that keeps secrets server-side and sidesteps CORS entirely:

```
Browser  ─►  Next.js API route  ─►  Express server  ─►  Supabase
             (proxy layer)          (business logic)     (data + auth)
```

**Why the extra hop through Next.js API routes?** CORS is a browser-enforced restriction — server-to-server calls skip it. Routing browser requests through Next.js API handlers means the browser only ever talks to its own origin, and the Next → Express call happens server-side where CORS doesn't apply. It also keeps the Supabase service-role key out of the client bundle.

Auth is handled by Supabase; JWTs are forwarded from the browser through the proxy to the Express server, which verifies them before touching the database.

## Running Locally

**Requirements:** Node 18+, a Supabase project.

```bash
git clone https://github.com/tjohnson009/quoteme.git
cd quoteme
npm install
```

Create `.env.local` in the project root (used by Next.js):

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_EXPRESS_API=http://localhost:5000
```

Create `.env` in the project root (used by the Express server):

```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Start both servers:

```bash
npm run dev:all
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000`.

## Design Choices

- **Two-runtime setup (Next + Express) instead of Next-only.** Adds complexity, but forced clean separation between UI and API concerns and taught me production-shape data flow (browser → proxy → server → DB) rather than everything-in-one-framework shortcuts.
- **CSS variables + Tailwind v4 `@theme inline`** for the design system. Every color is a semantic token (`bg-background`, `text-muted-foreground`, `border-border`) mapped once to raw values — flipping to dark mode is a single `@media` block, not per-component overrides.
- **"Approach B" modal rendering.** The dashboard mounts modals conditionally rather than passing `isOpen` — internal form state resets naturally between opens, no cleanup needed, and animation state can be added later without refactoring the mount logic.
- **Escape-to-close via `useEffect` cleanup pattern.** Global keydown listeners added on mount, removed on unmount — cleanest React pattern for global browser APIs.

## Roadmap

Next up:
- Search and tag-based filtering
- Optimistic UI on save/delete
- Dark mode toggle (currently OS-only)
- Focus trap + full ARIA in modals
- Move off `localStorage` for auth tokens (XSS-safer session handling)
- Progressive Web App (installable, offline-capable)