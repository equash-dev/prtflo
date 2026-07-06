# design.md

## Design Language

A faithful **Zara-structured** e-commerce system wearing **Elliott Quashie's** warm-neutral skin.
The structure — grid, spacing, type scale, and component anatomy — is taken directly from Zara
(scanned live; see `zara-ui-spec.md`): edge-to-edge imagery, extreme restraint in the chrome, tiny
light-weight uppercase labels with **near-zero letter-spacing**, square controls, and generous
whitespace. EQ keeps its warm palette, its wordmark + serial, its voice, and its currency switcher.
Nothing competes with the product. The page does very little and trusts the imagery to carry it.

> We replicate Zara's *structure, grid, spacing, and interaction patterns* — never its photography,
> font, or copy. EQ supplies its own assets and words.

---

## Layout & grid

Content runs **edge-to-edge on the warm `canvas`** (no floating frame). Side padding scales with
viewport; sections are full-bleed.

- **Side padding:** 16px mobile → 24px tablet → 40px desktop.
- **PLP grid:** `2` columns mobile · `3` tablet · `4` desktop. Large column gaps on desktop
  (~32–40px), tight on mobile (~4–8px). Big vertical rhythm between rows.
- **PDP:** two zones on desktop — a **left image gallery** (single column of large stacked images,
  ~60% width) and a **right sticky info rail** (~33%, ~340px). Stacks to one column on mobile.
- **Home:** full-bleed editorial hero, then category entry tiles, then content blocks.
- Alignment is strict and flush-left. Nothing is centred except deliberate hero/campaign type.

---

## Breakpoints

| Name | Width | PLP cols |
|---|---|---|
| mobile | < 768px | 2 |
| tablet | 768–1199px | 3 |
| desktop | ≥ 1200px | 4 |

(Tailwind `md` = 768, `lg` = 1024, `xl` = 1280 map onto these.)

---

## Spacing

Base unit **4px**; structural rhythm leans on `8 / 12 / 16 / 24 / 40 / 64`. Whitespace is the
primary luxury signal — when in doubt, add more. Grid gaps are large; component internals are tight.

---

## Colour

Unchanged from EQ. A near-monochrome, **warm-neutral** palette — colour only ever enters through
product imagery. These are the seven tokens in `app/globals.css` `@theme`.

| Role | Token | Colour | Zara equivalent |
|---|---|---|---|
| App ground (behind canvas, hero/footer accents) | `ground` | `#4F4A44` | — |
| Storefront background | `canvas` | `#F4F2ED` | Zara white `#fff` |
| Image-panel background | `panel` | `#EDEAE4` | Zara product grey `~#ECECEC` |
| Primary text | `ink` | `#1A1A1A` | Zara black `#000` |
| Muted / secondary text | `muted` | `#8A857D` | Zara grey |
| Hairlines / dividers | `hairline` | `#DAD6CE` | Zara hairline |
| Selected state fill | `selected` | `#D8D2C8` | Zara selected |

Contrast stays deliberately soft. Borders and dividers are felt more than seen.

---

## Typography

**Geist** (neo-grotesque, close to Zara's Helvetica Now). The defining shift from the old EQ system:
**light weight (300/400), not medium**, and **near-zero letter-spacing**. Light tracking (~0.1em) is
reserved for the EQ wordmark/serial as a brand signature.

| Role | Size / line-height / weight / transform / tracking |
|---|---|
| Wordmark | caps, ~16px, weight 400, tracking ~0.1em (signature) |
| Serial / technical mark | ~10px, weight 400, uppercase, muted |
| PDP product title (h1) | 15px / 24px / 300 / uppercase / 0 |
| Price | 13px / 16px / 300 / none / 0 |
| PLP card name | 13px / 300 / uppercase / 0 — **1-line truncate** |
| Nav + utility (BAG, LOG IN, HELP, FILTERS) | 12–13px / 300 / uppercase / 0 |
| Micro-label (FEW ITEMS LEFT, colour ref, section signposts) | 11px / 400 / uppercase / muted |
| Body copy | 13–14px / ~1.5 / 300–400 / sentence case |

Headings are **not bold**. The light-weight uppercase label at near-zero tracking is the house
structural signature now (replacing the old wide-tracked medium caps).

---

## Components

**Header / nav**
Sparse, minimal-height, **sticky with hide-on-scroll**. Transparent over the home hero (light text),
solid `canvas` elsewhere. Left: EQ wordmark + serial beside a **hamburger** that opens a **category
drawer / mega-menu** (MEN / WOMEN / ARCHIVE + subcategories) — there is no inline category bar.
Right: `SEARCH` (thin underline) + a utility cluster — **CurrencySwitcher, Contact/Bag**. Mobile:
hamburger left, optional centred page label, icon cluster right.

**PLP grid + card**
Grid per the breakpoint table. Card is a vertical stack: image on `panel`, **aspect ~2:3 (tall
portrait)**, `object-fit: cover`, **hover-swaps to the second image**; then **uppercase name
(1-line truncate)** with a **`+` quick-add icon** at the right; then **price**; then a **row of small
square colour swatches**. No description on the card.
A `FILTERS` control sits at the top of the rail; an optional `VIEW` density toggle sits below.

**PDP gallery + info rail**
Left: **large stacked-image gallery**, edge-to-edge within its zone, no frames or shadows. Right:
**sticky info rail**, in order — micro-label → **title (uppercase 15px)** → **price** → **hairline
rule** → colour name + ref → **square colour swatches** → **ADD TO BASKET** (square) +
**FIND IN STORE** (square secondary) → short description → **accordion meta sections**
(`PRODUCT MEASUREMENTS` · `COMPOSITION, CARE & ORIGIN` · `SHIPPING & RETURNS`). On mobile the gallery
goes full-width and the meta sections become a **horizontal tab bar**
(`DESCRIPTION / COLOUR / COMPOSITION / MEASUREMENTS`); ADD + FIND IN STORE stick to the bottom.

**Buttons**
**Square — `border-radius: 0`.** 1px hairline border, `canvas`/transparent fill (or `ink` fill for a
primary emphasis), uppercase 13px/300, ~40–48px tall. Pills are retired for commerce CTAs.

**Size selector**
A row/grid of square cells, thin border, disabled sizes struck through/greyed, selected gets the
`selected` taupe fill.

**Colour swatches**
Small **square** thumbnails in a tight row, thin border, selected one outlined; tiny muted caps label
above (`COLOUR: [NAME]`).

**Footer**
**Accordion columns** on mobile (Collections / House / Contact), expanded columns on desktop;
**newsletter** signup; **region + currency** selector; thin **legal row**. Keeps the reveal-line →
`/intro` link and the © line.

---

## Iconography

Thin, single-weight monoline icons only — hamburger, search, bag, plus (quick-add), location pin,
chevron (accordion). Functional, never decorative, all the same hairline weight, no fills.

---

## Interaction & motion

Minimal and quick. Hover: image-swap on cards, slight opacity/underline on links — nothing bouncy.
Swatch/size selection is an instant fill change. Header hides on scroll-down, reveals on scroll-up.
Accordions expand with a short height/opacity transition. No parallax, no heavy carousels. The
experiential motion lives only on `/intro`; the store stays restrained.

---

## Principles

1. **The product is the only colour.** Chrome stays warm-neutral; imagery does the talking.
2. **Zara structure, EQ skin.** Match the grid, spacing, and component anatomy exactly; dress it in
   the warm palette, wordmark, and voice.
3. **Light + tight type.** Light weight, near-zero tracking, small uppercase labels — not bold,
   not widely spaced.
4. **Square, not pill.** Controls and CTAs are squared with hairline borders.
5. **Hairlines, not boxes.** Separate with 1px low-contrast rules, not borders, shadows, or fills.
6. **Space is the luxury signal.** Generous whitespace and large grid gaps over decoration.
7. **Warm neutrals, never cold.** Bone and taupe, not pure white and grey.
8. **Quiet interaction.** Fast, subtle, never showy — the experiential layer stays on `/intro`.
