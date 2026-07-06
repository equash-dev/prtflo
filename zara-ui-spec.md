# Zara UI scan — build spec (working reference)

Captured live from zara.com/uk via Playwright (real Chrome) on 2026-06-14, desktop 1440×900 and
mobile 390×844. Surfaces: home, PLP (`man-l534.html`), PDP (linen bermuda shorts). Screenshots +
computed styles in `C:/Users/curti/zara-scan/out/`. This is the structural source of truth for the
refactor. **We replicate structure/grid/spacing/anatomy only — not Zara's photos, font, or copy.**

## Global tokens & feel
- **Font:** Helvetica Now Text, **weight 300 dominant** (light). EQ keeps **Geist** (neo-grotesque
  substitute) but shifts default weight from 500 → **300/400**. Headings are not bold.
- **Tracking:** essentially **normal (0)** everywhere — product titles, nav, prices, micro-labels.
  This is the biggest departure from EQ's current 0.18–0.28em tracking. **Reduce tracking hard.**
  Keep a light tracking (~0.1em) only on the EQ wordmark/serial as a brand signature.
- **Colour mapping (keep all 7 EQ warm tokens):** Zara white `#fff` → EQ `canvas`; Zara product
  grey panel `~#ECECEC` → EQ `panel`; Zara black text `#000` → EQ `ink`; greys → `muted`/`hairline`.
- **Type scale (measured):**
  | role | size / line-height / weight / transform |
  |---|---|
  | PDP product title (h1) | 15px / 24px / 300 / uppercase |
  | Price | 13px / 16px / 300 / none |
  | PLP card name | ~13px / 300 / uppercase, **1-line truncate** |
  | Nav + utility (BAG, LOG IN, HELP, FILTERS) | ~12–13px / 300 / uppercase |
  | Micro-label (FEW ITEMS LEFT, colour ref) | ~11px / 400 / uppercase / muted |
- **Buttons:** **square — `border-radius: 0`**, 1px hairline border, white/transparent fill,
  uppercase 13px/300, ~40–48px tall. (EQ's pill buttons become squared for commerce CTAs.)
- **Spacing:** generous whitespace; large grid gaps; full-bleed sections with modest side padding.

## Header / nav
- Sparse, minimal-height, **sticky + hide-on-scroll**. Transparent over the home hero (light text),
  solid `canvas` on PLP/PDP.
- **Left:** hamburger (two thin lines) → opens a **category drawer/mega-menu** (this is how Zara
  exposes categories even on desktop — there is no inline category bar).
- **Right cluster:** `SEARCH` (with a thin underline) + stacked utility links `BAG (n) / LOG IN /
  HELP`. Mobile: hamburger left; centred page label (e.g. `FILTERS` on PLP); right icons =
  density-toggle, search, bag(count).
- Top categories seen: WOMAN / MAN / KIDS / ZARA HOME / BEAUTY … with deep subcategory lists in the
  drawer (T-SHIRTS, TROUSERS, BERMUDA SHORTS, SHIRTS, JACKETS|BLAZERS, …).
- **EQ adaptation:** keep wordmark + serial (small, left, beside/below hamburger). Drawer lists
  MEN / WOMEN / ARCHIVE + their subcategories. Utility cluster holds **Search, CurrencySwitcher,
  PipelineToggle, Contact/Bag** — all must keep working.

## PLP (category grid)
- **Grid columns:** mobile **2**, desktop **4** (measured); tablet **3** (interpolated). Wide
  desktop outer margins, large column gaps (~40px desktop); mobile gap tiny (~2–6px).
- **Card anatomy (vertical stack):** image on light `panel`, **aspect ≈ 2:3 (portrait, tall)**,
  `object-fit: cover`; then **uppercase name (1-line truncate)** with a **`+` quick-add icon on the
  right**; then **price**; then a **row of small colour-swatch squares**.
- **Hover:** swap to second image (`images[1]`).
- **Chrome:** `FILTERS` control top-left of the content rail; **`VIEW 1 2 3` density toggle**
  bottom-left; `VIEW ALL` links between sections.
- **EQ adaptation:** drop `shortDescription` from card (name + price only, Zara-style). Keep
  `AssetCostBadge` overlay on the image + currency-formatted price.

## PDP (product page)
- **Desktop = two zones:** **left large-image gallery** (single column of big **stacked** images,
  ~610px wide zone; 9 images for this product; `object-fit: cover`, tall ~2:3) + **right sticky
  info rail** (~336px).
- **Info-rail order (top→bottom):**
  1. micro-label (`FEW ITEMS LEFT`)
  2. **product title** — uppercase 15px/300
  3. **price** (13px)
  4. **hairline rule** (full rail width)
  5. colour name + ref (`LIGHT BEIGE | 5070/903/052`, tiny)
  6. **colour swatch squares** (row)
  7. **ADD** button (square, bordered) + a secondary square button beside it (Zara = Apple Pay;
     **EQ uses `FIND IN STORE`**)
  8. short **description** paragraph
  9. `COMPLETE YOUR LOOK` thumbnail strip (optional / skip for EQ)
  10. **meta accordion links:** `PRODUCT MEASUREMENTS` · `COMPOSITION, CARE & ORIGIN` ·
      `CHECK IN-STORE AVAILABILITY` · `SHIPPING, EXCHANGES AND RETURNS`
- **Mobile:** full-width stacked gallery, then a **horizontal tab bar**
  (`DESCRIPTION | COLOUR | COMPOSITION | MEASUREMENTS`), title + price, **ADD + secondary sticky at
  bottom**.
- **EQ adaptation:** replace current 50/50 hairline split with gallery + sticky rail; size selector
  as a list/row in the rail; description/composition/care become **accordions** (desktop) / tabs
  (mobile). Keep ADD TO BASKET / FIND IN STORE, currency, `AssetCostBadge`.

## Home
- **Full-bleed editorial campaign imagery** dominating the viewport (Zara: two large side-by-side
  images + huge `ZARA` wordmark overlaid as art). Near-invisible overlaid header.
- **EQ adaptation:** full-bleed hero (warm `panel` placeholders since no photos), large EQ wordmark,
  then **category entry blocks** (MEN / WOMEN / ARCHIVE as big image tiles), then the reframed ROI
  strip, and the reveal-line → `/intro` link. Keep all EQ copy.

## Footer (not in live capture — use documented Zara pattern)
- **Accordion columns** on mobile (HELP / COMPANY / FOLLOW US / NEWSLETTER), expanded columns on
  desktop; **newsletter** signup; **region/language** selector; thin **legal row** at the bottom.
- **EQ adaptation:** accordion columns (Collections / House / Contact), newsletter, region+currency,
  legal row. Keep reveal-line → `/intro` link and © line.

## Decisions / tensions logged
- **Square buttons** override EQ's pill — required for Zara structural match; applies to commerce
  CTAs. (EQ `Button` gains a squared default or a `shape` prop.)
- **Tight tracking + light weight** override EQ's wide-tracked medium type, except the wordmark.
- **No real images:** galleries/cards/hero foreground warm `panel` placeholders; generated imagery
  drops in later. Structural match is about layout, not photography.
