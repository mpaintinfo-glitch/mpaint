# Mpaint

Car painting and bodywork workshop site for Mpaint, Tallinn. Next.js (App Router) with `next-intl` for Estonian (default) / Russian / English.

## Running locally

```
npm install
npm run dev
```

Opens at `http://localhost:3000`. Estonian serves at `/`, Russian at `/ru`, English at `/en`.

## Building

```
npm run build
```

Statically generates every route for all three locales (see `next.config.ts`, `src/i18n/`, `messages/*.json`).

## Structure

- `app/[locale]/` — routes (home, services, services/[slug], contact)
- `messages/{et,ru,en}.json` — all translated copy
- `src/components/` — shared UI (header, footer, quote funnel, email modal)
- `src/data/services.ts` — service slugs/ids shared across routes
- `src/assets/` — real images, imported as ES modules
- `src/styles/` — hand-written CSS (Tailwind v4 + `site.css`)
