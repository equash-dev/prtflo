# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Next.js docs for the installed version live at `node_modules/next/dist/docs/` — check there before assuming an API works like it did in older versions.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000. If port 3000 is taken it falls back to 3001; check for an already-running dev server before starting another.
- `npm run build` — production build (also the quickest full type/route check; there are no tests). **Never run it while the dev server is up** — both write `.next` and the dev server starts throwing ChunkLoadErrors; use `npx tsc --noEmit` for type checks instead, or restart dev after building.
- `npm run lint` — ESLint.
- `npm run ingest` — converts PNG masters dropped under `product/` (gitignored) into `public/products/{category}/{slug}/NN.webp` via sharp. Filenames are linesheet asset codes: `PRTM01_INK_01.png` → shot `01.webp`; the un-numbered `PRTM01_INK.png` is the generation source → `ref-01.webp`.

## What this is

A portfolio piece disguised as a fictional fashion house ("PRTFLO") where every product image is AI-generated. There is no backend: no API routes, no data fetching, no orders submitted anywhere — the entire catalogue is compile-time static. Commerce controls are theatre with a payoff, not inert: ADD TO BASKET feeds a real client-side basket (`context/BasketContext`, localStorage `eq.basket`) through `/basket` into the `/checkout` funnel, which plays it straight until the payment step and then discloses and pitches contact (`components/checkout/CheckoutFunnel.tsx`). PIPELINE opens the generation dossier (`PipelineDossier`): a staged model + mannequin + backdrop = final-shot equation over the hero image, plus attempts, minutes, and cost vs studio equivalent, computed in `lib/generation.ts` from house averages in `config/pipeline.ts`, overridden by a per-piece `generation` log on `Product` when one is recorded. Belief before reveal — basket and delivery copy never wink; the disclosure lands at payment and in the dossier. Search and filters remain inert by design.

## Environment

- `SITE_PASSWORD` (`.env.local` locally; set in the host's env vars in production) — the site-wide gate password. The gate **fails closed**: if unset, every page redirects to `/enter` and the gate rejects all submissions. The auth cookie is an HMAC derived from the password (`lib/access.ts`), so changing the password immediately logs everyone out. Never expose it via `NEXT_PUBLIC_`.

## Architecture

**Content flows from `config/`, never from component code.** `config/products.ts` (catalogue + `PRODUCT_MAP` + `productsByCategory`), `config/categories.ts`, `config/site.ts`, `config/copy.ts`, `config/currencies.ts` — all typed by `types/`. The catalogue is the 20-piece SS26 range transcribed from `PRTFLO_linesheet_v1.xlsx` (source of truth for codes, colourways, fabrics, descriptions, and the four-shot manifest: 01 ghost hero, 02 editorial, 03 mid-crop, 04 detail macro). To add a product: append to `PRODUCTS` (keep `scripts/ingest-assets.mjs`'s code→slug map in sync) and run `npm run ingest` on its PNGs. Category slugs are `men` / `women` / `archive` (`types/product.ts`); archive is intentionally empty for now.

**Route groups control chrome.** `app/page.tsx` (landing) and `app/intro/` are deliberately chromeless. `app/(store)/layout.tsx` adds Header/Footer for `/collection`, `/about`, and the `(storefront)` group, where `[category]` and `product/[slug]` use `generateStaticParams` + `notFound()`.

**All prices go through the currency system.** `context/CurrencyContext.tsx` (client context, persisted to localStorage as `eq.currency`) + `lib/pricing.ts` (`convertFromGBP`, `formatPrice`). Base prices are GBP; never format or hardcode a price outside these helpers.

**Styling is Tailwind 4, CSS-first — there is no tailwind.config.** The seven design tokens (`ground`, `canvas`, `panel`, `ink`, `muted`, `hairline`, `selected`) and keyframes live in `@theme` in `app/globals.css`. House rules: square corners (no pills on commerce CTAs), hairline dividers, Geist at light weight, near-zero letter-spacing. Missing product images fall back to a `bg-panel` block by design.

## Source-of-truth docs

- `Brand.md` — voice and copy rules (quiet, declarative, no urgency; MEN / WOMEN / ARCHIVE, never "Sale").
- `Design.md` — visual language; `zara-ui-spec.md` — structural spec for layout/component anatomy (the active refactor reference).
- `prompts/SYSTEM-INSTRUCTIONS.md` + `prompts/new-in-ss26.csv` — the image-generation pipeline (locked flatlay prompt system).
- `UI.pen` — Pencil design file; encrypted, only accessible via the Pencil MCP tools, never Read/Grep.

Match the brand docs when writing any user-facing copy or new UI.
