# Kultura

Gamified culture-learning prototype: landing screen → author/story content →
map activity with sequentially-unlocked trivia stations.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS. No backend yet — progress
is stored in the browser via `localStorage`. Structured so a real backend
(FastAPI + Postgres, like `ph-literature-map`) can be dropped in later without
touching the UI: swap `ProgressProvider`'s localStorage calls for API calls.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Where things live

- `app/page.tsx` — landing screen ("KULTURA" + Simulan button)
- `app/content/page.tsx` — author card + short story + CTA into the activity
- `app/activity/page.tsx` + `components/StationMap.tsx` — the map, station
  unlocking, and trivia modal
- `lib/stations.ts` — **all story/author/trivia content lives here.** This is
  currently filled with placeholder content (Ibong Adarna, a public-domain
  Filipino folk epic) — swap it for the client's real content. Each station
  just needs an `x`/`y` position (percent), a `title`, and a `fact`.
- `components/ProgressProvider.tsx` — tracks which stations are unlocked/done,
  persisted to `localStorage`

## Known limitation

`next/font/google` fetches font files from Google at build time, so builds
require network access to `fonts.googleapis.com`. Works fine on a normal dev
machine or CI; won't build in fully offline/sandboxed environments unless you
swap to self-hosted font files.
