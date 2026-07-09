---
name: verify
description: How to build, launch, and drive PRTFLO to verify changes at the browser surface.
---

# Verifying PRTFLO changes

## Build / launch

- `npm run build` — fastest full type/route check (no tests exist).
- Elliott usually has `npm run dev` already running on **:3000** (falls back to :3001) — check
  `Get-NetTCPConnection -LocalPort 3000,3001 -State Listen` before starting another. Turbopack
  HMR picks up edits, so you can drive the running instance immediately.

## The gate

Every page redirects to `/enter` unless the auth cookie is set. Password is `SITE_PASSWORD` in
`.env.local`. Elliott's Chrome usually already has the cookie; if you land on `/enter`, read the
password from `.env.local` and submit it once.

## Flows worth driving

- **PDP** `/product/heavyweight-boxy-tee` — gallery, ref-image hover, ADD TO BASKET (button flips
  to "Added", header count ticks), PIPELINE (generation dossier overlay with the
  model + mannequin + backdrop = final-shot animation; replays on each open).
- **Basket** `/basket` — qty steppers, remove, subtotal; empty state after removing everything.
- **Checkout** `/checkout` — delivery form → CONTINUE TO PAYMENT → ~1.4s processing beat → the
  disclosure/contact reveal. Name field personalises the reveal line.
- **Currency** — switch GBP/USD/EUR in the header; every price (incl. dossier + checkout ledgers)
  must reflow. **Restore GBP afterwards** — the choice persists in localStorage.

## Gotchas

- Basket/currency/pipeline state persists in localStorage (`eq.basket`, `eq.currency`,
  `eq.pipeline`) — the dev browser may carry state from earlier sessions; don't mistake it for a bug.
- The PDP info rail is `position: sticky`, which forms a stacking context: any overlay rendered
  inside `ProductDetails` must portal to `document.body` or it's trapped under the z-40 header.
- Don't click the mailto CTA (external-protocol browser modal blocks automation) — verify its href
  via the find/read_page tools instead.
- `npm run lint` fails on pre-existing `react-hooks/set-state-in-effect` errors in the contexts and
  intro components — not a regression signal.
