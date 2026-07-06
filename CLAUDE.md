# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Next.js docs for the installed version live at `node_modules/next/dist/docs/` — check there before assuming an API works like it did in older versions.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000. If port 3000 is taken it falls back to 3001; check for an already-running dev server before starting another.
- `npm run build` — production build (also the quickest full type/route check; there are no tests).
- `npm run lint` — ESLint.

## What this is

A portfolio piece disguised as a fictional fashion house ("ELLIOTT QUASHIE") where every product image is AI-generated. It is browse-only by design: no checkout, no backend, no API routes, no data fetching — the entire catalogue is compile-time static. Commerce-shaped controls (add to basket, search, filters) being inert is intentional, not unfinished.

## Architecture

**Content flows from `config/`, never from component code.** `config/products.ts` (catalogue + `PRODUCT_MAP` + `productsByCategory`), `config/categories.ts`, `config/site.ts`, `config/copy.ts`, `config/currencies.ts` — all typed by `types/`. To add a product: append to `PRODUCTS` and drop images at `public/products/{category}/{slug}/01.webp`, `02.webp`, … Category slugs are `men` / `women` / `archive` (`types/product.ts`).

**Route groups control chrome.** `app/page.tsx` (landing) and `app/intro/` are deliberately chromeless. `app/(store)/layout.tsx` adds Header/Footer for `/collection`, `/about`, and the `(storefront)` group, where `[category]` and `product/[slug]` use `generateStaticParams` + `notFound()`.

**All prices go through the currency system.** `context/CurrencyContext.tsx` (client context, persisted to localStorage as `eq.currency`) + `lib/pricing.ts` (`convertFromGBP`, `formatPrice`). Base prices are GBP; never format or hardcode a price outside these helpers.

**Styling is Tailwind 4, CSS-first — there is no tailwind.config.** The seven design tokens (`ground`, `canvas`, `panel`, `ink`, `muted`, `hairline`, `selected`) and keyframes live in `@theme` in `app/globals.css`. House rules: square corners (no pills on commerce CTAs), hairline dividers, Geist at light weight, near-zero letter-spacing. Missing product images fall back to a `bg-panel` block by design.

## Source-of-truth docs

- `Brand.md` — voice and copy rules (quiet, declarative, no urgency; MEN / WOMEN / ARCHIVE, never "Sale").
- `Design.md` — visual language; `zara-ui-spec.md` — structural spec for layout/component anatomy (the active refactor reference).
- `prompts/SYSTEM-INSTRUCTIONS.md` + `prompts/new-in-ss26.csv` — the image-generation pipeline (locked flatlay prompt system).
- `UI.pen` — Pencil design file; encrypted, only accessible via the Pencil MCP tools, never Read/Grep.

Match the brand docs when writing any user-facing copy or new UI.
