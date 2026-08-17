# design.md

## Design Language

PRTFLO in **Acne Studios'** register: quiet, thin-type utility chrome wrapped around one **loud
graphic move** — the wordmark itself, run at massive scale as a recurring full-width interstitial
between full-bleed, zero-margin image blocks. Chrome is black, white, and cold grey only; colour
lives entirely in product photography. This system is not uniformly quiet — the header and nav are
genuinely sparse and light-weight, but the site punctuates that restraint with a bold, confident,
near-maximalist use of its own logotype as recurring graphic content, not just a small corner mark.

> **Verified against a real screenshot of acnestudios.com, not text research.** Earlier drafts of
> this document were written from secondary sources (design write-ups, a 2019 case study) because no
> tool in-session could render the live JS-heavy site — that gap is a mistake worth naming, not
> papering over. A homepage screenshot has since corrected several specifics below: the oversized
> wordmark interstitial, true zero-margin full-bleed layout, and candid/styled (not sterile)
> photography were all missed by the earlier text-only research. **PLP, PDP, and footer remain
> unverified** — the capture cut off before those sections — and are flagged as lower-confidence
> below until checked against real screenshots too.

This document is now self-sufficient. It replaces the earlier doctrine of matching Zara's structure
exactly and dressing it in a warm palette (`zara-ui-spec.md`, retained for provenance only — see
Appendix). Both structure and skin are rewritten here from Acne-derived reasoning. A few skeleton
choices survive from the previous system — the sticky header, the two-zone PDP, the grouped footer
— not because they came from Zara, but because they're sound, category-appropriate e-commerce
patterns that nothing in the Acne research contradicts.

> We take Acne's *restraint in chrome, boldness in brand*: a thin-type utility header, a sparse
> "undesigned" grid, zero-margin full-bleed imagery, and an oversized recurring wordmark as the one
> loud graphic move. PRTFLO supplies its own wordmark, serial, voice, and imagery — never Acne's
> photography, copy, or literal brand assets.

---

## Layout & grid

Content runs **edge-to-edge on `canvas`** (no floating frame). The header carries modest utility
padding; full-bleed image sections carry **none at all** — this is a confirmed correction from a
real screenshot, not a guess.

- **Header padding:** ~16–24px sides — the one place in the layout with a conventional gutter.
- **Hero / editorial / interstitial sections: true zero margin.** Confirmed from screenshot: the
  homepage hero's split-screen imagery runs flush to the viewport edge on both sides, and the two
  halves touch each other at the centre with no gap at all — not the 64px side padding this
  document previously specified for the hero. PRTFLO's hero and any full-bleed editorial section
  should match: 0px outer padding, 0px gap between split panels.
- **PLP grid — confirmed, correcting an earlier wrong guess:** `4` columns desktop, images touching
  **edge-to-edge with zero gap and zero outer side padding** — the opposite of the "sparser 2/2/3,
  generous gaps" spec this document previously carried, which was written from secondary text
  sources and turned out wrong. The real PLP is dense and full-bleed, not sparse. Full-length
  on-model editorial photography fills each column, not flatlays or ghost-mannequin shots. Mobile
  column count is still unverified (no mobile screenshot) — a reasonable fallback is `2`, but treat
  that as a guess, not a confirmed number.
- **PDP — confirmed:** two zones on desktop — a **left image column** (~50–52% width) and a **right
  info rail** (~48%). The left column runs **zero padding, flush to the viewport edge**, and shows
  **one full-bleed image at a time**, taller than the viewport, continuing below the fold as the user
  scrolls — not the paired/cropped secondary images this document previously specified. The right
  rail stays in view while the left column's image stack scrolls past it (confirmed: "PDP content
  scrolls on the left hand side"). Inter-image gap on the left column is effectively zero (each shot
  runs full-bleed into the next). Stacks to one column on mobile (unverified).
- **Home:** the hero and category strip are one continuous zero-margin, zero-gap zone — see
  "Signature device" below for the pinned wordmark that scrolls over it. The product grid beneath it
  (Home's "New In" section) is **also zero padding and zero gap between tiles**, confirmed by direct
  instruction rather than screenshot — outer margin removed and cards touch edge-to-edge, same as
  the hero/category imagery above it. This raises the likelihood the same zero-margin treatment
  applies to the PLP grid too, but that's still unverified — don't assume it there until checked.
- Alignment is strict and flush-left within components. Nothing is centred except deliberate
  hero/campaign type and the wordmark interstitial itself.

---

## Breakpoints

| Name | Width | PLP cols |
|---|---|---|
| mobile | < 768px | 2 |
| tablet | 768–1279px | 2 |
| desktop | ≥ 1280px | 3 |

(Tailwind `md` = 768, `xl` = 1280 map onto these. `lg` [1024px] is no longer a PLP density step —
one fewer tier is itself an expression of "sparser grid.")

---

## Spacing

Base unit **4px**; structural rhythm is `8 / 12 / 16 / 24 / 40 / 64 / 96`. The new 96px tier is
reserved for hero-to-section and major-block transitions only — not for component-internal padding,
which stays tight. Whitespace is the primary luxury signal, taken further than before: when in
doubt, cut a competing element before adding padding everywhere.

---

## Colour

**Correction, confirmed from PLP/PDP screenshots: chrome is not purely monochrome.** A saturated
accent blue runs through the real site's UI — product-name links in the PLP grid, the primary
"ADD TO BAG" button fill, accordion headings, breadcrumb and inline text links. The earlier
"colour lives entirely in product photography" principle was wrong; it was written from secondary
text sources before any real screenshot existed. Everything *else* about the monochrome read still
holds — background, panels, dividers, and body text are all true black/white/grey — but there is one
functional accent colour doing real UI work, not zero.

Add an eighth token, `accent`, approximated from the screenshots at **`#1414E0`** (a saturated
cobalt/electric blue) pending an exact colour pick from a live inspector — treat the hex as a close
approximation, not a verified value. Use it exactly where the real site uses it and nowhere else:

- PLP card product-name link text (replaces plain `ink`)
- Primary commerce CTA fill (`ADD TO BASKET`, `WORKFLOW`) — replaces the `ink` fill specified below;
  secondary/outline buttons stay `ink`-bordered, not blue
- Inline text links — breadcrumbs, "Size guide," accordion headings, "Keep browsing," footer legal
  links wherever they're actual links rather than static labels
- Never as a background fill, never on panels, never on more than text/thin strokes — it's a link
  and CTA colour, not a surface colour

This is a real, if narrow, exception to "the product is the only colour" (Principles, below) — that
principle now reads as "the product and the accent are the only colour," which is a more honest
statement of what's actually there.

These are the tokens in `app/globals.css` `@theme` (seven existing plus the new `accent`). Token
**names** are unchanged from the previous system for the original seven — only the values shift from
warm to cold. In the old warm palette, `hairline` and `selected` were differentiated mainly by hue; a
true zero-saturation palette can't do that, so these values are chosen with deliberately separated
luminance steps instead.

| Role | Token | Colour |
|---|---|---|
| App ground (dark surfaces — landing, `/enter`, `/intro`, **and the footer band**) | `ground` | `#000000` |
| Storefront background | `canvas` | `#FFFFFF` |
| Image-panel background | `panel` | `#F2F2F2` |
| Primary text | `ink` | `#111111` |
| Muted / secondary text | `muted` | `#767676` |
| Hairlines / dividers | `hairline` | `#E2E2E2` |
| Selected / active-surface fill | `selected` | `#D4D4D4` |
| **Link / CTA accent** (confirmed) | `accent` | `#1414E0` *(approximate — verify against a live pick)* |

`muted` is chosen at the AA threshold (4.5:1 on `canvas`) deliberately, not approximately — but it
runs close to that boundary at the smallest micro-label sizes (10–11px). Re-verify contrast if any
label ever drops smaller.

`selected` is a **surface wash**, not a "chosen" control state — see Size selector under Components,
which uses a literal ink/canvas invert instead.

**Acne's dusty pink is out of scope for on-screen UI.** It's a packaging and retail-environment
signature (tissue paper, flagship-store granite), not a website colour — PRTFLO has no packaging or
physical-retail surface today, so it has no home here. If that ever changes, it belongs on print or
packaging assets, never as a token.

**`.ambient` gradient stops** (the slow-drift glow on immersive dark surfaces in `app/globals.css`)
are hardcoded to the old warm literals and need re-deriving against the values above:

```
radial-gradient(45% 55% at 22% 28%, rgba(255,255,255,0.10), transparent 70%),
radial-gradient(55% 65% at 80% 75%, rgba(17,17,17,0.20), transparent 72%),
radial-gradient(36% 45% at 68% 12%, rgba(212,212,212,0.07), transparent 70%)
```

---

## Typography

**Geist** stays. It's already installed, already a clean light-weight grotesque, and Acne's actual
typeface (a proprietary custom cut by Letters from Sweden) isn't attainable for this project — nor
would swapping families be a documentation-only change. What changes is *how* Geist is used: fewer
distinct sizes, with **weight and case** doing the differentiating work instead of a wide type scale.

**Weight rule** (medium confidence — see note): base weight is **400 on `canvas`**, **300 on
`ground`**. Light-weight text optically reads bolder white-on-black than the same weight reads
dark-on-white; holding 300 uniformly on true white risks reading washed-out rather than quietly
confident. *If a future implementation pass wants zero ambiguity and less code churn, holding a
uniform 300 everywhere is an acceptable fallback — this split is a reasoned adaptation, not a
measured Acne fact.*

| Role | Size / line-height | Weight (canvas) | Weight (ground) | Transform | Tracking |
|---|---|---|---|---|---|
| Header wordmark | 16px / 1 | 500 | 500 | caps | 0.08em (signature) |
| **Wordmark interstitial** (confirmed) | fluid, ~90% of container width | **700–800, bold** | 700–800 | sentence case, as logotype | 0 |
| Serial / technical mark | 10px / 1 | 400 | 400 | uppercase | 0.16em |
| Display / hero headline | fluid 44–96px / 0.95 | 400 | 300 | uppercase | −0.01em |
| PDP product title (h1) | 15px / 20px | 400 | — | uppercase | 0 |
| Price | 13px / 16px | 400 | — | none | 0 |
| PLP card name | 11px / 14px | 400 | — | uppercase, 1-line truncate | 0 |
| Nav + utility (SEARCH, BASKET, FILTERS) | 11–12px / 1 | 400 | 400 | uppercase | 0.02em |
| Micro-label (signposts, colour ref) | 10px / 1 | 400 | — | uppercase, muted | 0.04em |
| Body copy | 13–14px / 1.6 | 400 | 300 | sentence case | 0 |

**Correction:** the earlier "no weight is ever bold" rule was wrong. Confirmed from screenshot: the
wordmark interstitial runs bold/heavy — a confident, geometric, near-rounded grotesque at a size and
weight nothing else on the page approaches. Every *utility* role (nav, price, labels, body) stays
light per the table above; the interstitial is the one deliberate exception, exactly the way the
header wordmark's wider tracking is the one exception to near-zero tracking elsewhere. Restraint in
chrome, one confident exception for the brand itself — not restraint everywhere.

---

## Signature device — the pinned wordmark overlay

**Confirmed from screenshot and corrected after review; the single most distinctive thing on the
real homepage, and the biggest miss in earlier drafts of this system.** This is not a set of static
alternating bands between sections (an earlier draft of this document got that wrong). It's one
giant, bold, centred wordmark that **stays fixed in the middle of the viewport while the hero and
category imagery scroll behind and around it**, then releases — stops being pinned — once the
scroll reaches the product grid, which continues normally underneath.

For PRTFLO:

- On Home, the **hero split panels and the category strip together form one continuous "pinned
  wordmark zone."** A single PRTFLO wordmark sits centred over that entire zone, `position: sticky`
  (or `fixed` with a calculated release point) for the duration of the scroll through it — image
  panels change underneath as the user scrolls, the wordmark itself doesn't move until the zone ends.
- The zone ends where the product grid begins. At that point the wordmark releases and scrolls away
  normally with the rest of the page — it never overlaps or pins over commerce content.
- Full container width available, centred both axes, bold/heavy weight per the Typography table
  above, sentence case exactly as PRTFLO's own wordmark is written elsewhere (always full caps per
  Brand.md — the point being borrowed from Acne is scale, weight, and the pin/release mechanic, not
  their specific capitalisation).
- `ink`-on-light through the whole zone is enough while the underlying panels stay light; if a future
  dark panel enters the pinned zone, the wordmark should flip to `canvas` for contrast, the same rule
  the small header wordmark already follows.
- This is a **graphic device, not a nav element**: no link, no hover state, nothing clickable. It
  exists purely to punctuate the scroll with the brand's own name at a scale nothing else reaches,
  for exactly as long as there's full-bleed imagery behind it to punctuate.
- Static design tools (including the Pencil mockup for this page) can't show scroll-driven pinning
  directly — the mockup represents it as the wordmark centred once across the combined height of the
  zone it pins through, which is a reasonable stand-in but the pin/release behavior itself only shows
  up once this is actually built in the browser.

---

## Components

**Header / nav** *(corrected — confirmed centered wordmark + inline nav, not a drawer)*
Sparse, minimal-height, sticky. A **flat, fully opaque `canvas` bar** — no backdrop blur. Left: an
**inline nav bar** — MEN / WOMEN / HOME (PRTFLO's three categories, plain caps text links, no
hamburger). Centre: the **PRTFLO wordmark, centred** in the header — not left-aligned as earlier
drafts had it. Right: `SEARCH` + a utility cluster — CurrencySwitcher, Contact/Bag with a count.
Optionally, a thin dismissible promo/announcement bar above the header itself (confirmed present on
the real site: a scrolling shipping/duties notice with a close control) — worth considering for
PRTFLO but not required; it's a real observed pattern, not a load-bearing part of the identity.
Below the header, category pages carry a **secondary link row** — sentence/title-case text links
(not all-caps), e.g. a style/filter shortcut row — confirmed present on the PLP, unverified whether
it belongs on PDP too.

**PLP grid + card** *(confirmed)*
4-column grid, zero gap, zero outer padding — see Layout & grid above. Card is a vertical stack:
full-bleed on-model image (no `panel` background needed once real photography exists — `panel`
remains the placeholder fallback per house convention); then a meta row directly below the image
with **product name as an `accent`-coloured link** on the left and **price in `ink`** on the right,
same row; an optional second line in `muted` for colour-count (`"4 Colours"`) when a piece has
multiple colourways. **No swatches row and no "+" icon on the card** — the real card carries no
swatch preview at all, just name, price, and optionally a colour count. A category H1
(`WOMEN'S JEANS`-style, bold caps) sits above the grid with an item count (`"70 items"`, sentence
case) and a `FILTER` control with icon, right-aligned, on the same row.

**PDP gallery + info rail** *(confirmed)*
Left: single full-bleed image column, zero padding, one large image at a time, taller than the
viewport, continuing on scroll — no frames, no shadows, no paired crops. Right: rail stays in view
while the left column scrolls, in order — **title + price on the same row** → colour name (`muted`,
sentence case) → `Size guide` link (`accent`, right-aligned, small icon) → a 6-up size grid, square
bordered cells, unavailable sizes struck through → an availability/notify line → **ADD TO BASKET**
(square, `accent` fill — not `ink`) beside a small square secondary icon button (wishlist-equivalent,
`accent`-bordered) → three accordion rows (delivery, gift options, pickup-equivalent — PRTFLO's
honest equivalents are Delivery, Gift Note, and Find In Store) with `accent`-coloured headings and a
chevron → full description paragraph → a bulleted spec list (em-dash bullets: fabric, fit, notable
construction) → a `SHOW MORE` expand link (`accent`) → a `Need help?` link (`accent`) at the very
bottom. Accordion titles stay **sentence case** as this document already specified. On mobile the
gallery goes full-width; rail content stacks below or becomes a sticky bottom bar for ADD TO BASKET
(unverified on mobile, carried over as a reasonable assumption).

**Buttons** *(fill colour corrected — see Colour)*
Square — `border-radius: 0`. Primary commerce CTAs (`ADD TO BASKET`, `WORKFLOW`) use an **`accent`
fill** with `canvas` text, confirmed from the real "ADD TO BAG" button — not `ink` fill as earlier
drafts specified. Secondary/outline buttons (`FIND IN STORE`) stay `canvas`/transparent fill with a
1px `ink` border, unchanged. Uppercase 13px/400, ~40–48px tall.

**Size selector**
A row/grid of square cells, thin border, disabled sizes struck through/greyed. The **selected**
state is a literal **ink/canvas invert** (`bg-ink text-canvas`), not a soft tonal fill — a more
binary, honest read that suits the higher inherent contrast of a monochrome palette. `selected` (the
token) is reserved for non-text-bearing surface washes elsewhere, such as image-hover states.

**Colour swatches**
Small square thumbnails in a tight row, thin border, selected one gets a black ring
(`outline outline-1 outline-offset-2 outline-ink`) — not a fill. Tiny muted caps label above
(`COLOUR: [NAME]`).

**Footer** *(unverified — the capture cut off before reaching it)*
A **true-black band** (`ground`, not `canvas`), text and icons inverted to `canvas` — a direct
structural pull from Acne's own flat-black footer convention, not just a recolour. This specific
claim traces back to the earlier text-research pass (a design write-up describing a dark footer
band), not a screenshot — worth confirming once a footer capture exists. Accordion columns
on mobile (Collections / House / Contact), expanded columns on desktop; newsletter signup; region +
currency selector; thin legal row. Keeps the reveal-line → `/intro` link and the © line.

---

## Iconography

Thin, single-weight monoline icons only — hamburger, search, bag, location pin, chevron (accordion).
Functional, never decorative, all the same hairline weight, no fills. Icons inherit `currentColor`,
so the footer's icons automatically invert to `canvas` on the new dark band with no extra rule
needed.

---

## Interaction & motion

Minimal and quick in the store; narrative motion stays separate and is the only place allowed to
carry texture or meaning.

- **Cold-open, scroll-reveal, gate feedback** (`.cold-open`, `.reveal-up`, `.gate-miss`,
  `.gate-error`) — unchanged. Already quick, subtle, non-decorative.
- **Film grain** (`.grain`) — kept, and worth calling out: this is the standout synergy with Acne's
  own art direction, which leans on 35mm-style film-grain texture as part of its "awkward beauty"
  aesthetic. It stays live on all product and campaign imagery.
- **Pixel field** (`.pixel-field`) — scope trimmed to pipeline/generation-narrative surfaces only
  (the Pipeline Dossier, the Generated Reveal). Removed from everyday storefront decoration. This
  turns it into a meaningful "tell" reserved for AI-disclosure moments rather than ambient wallpaper.
- **Plate-in, shot-resolve** (`.plate-in`, `.shot-resolve`) — unchanged, and arguably strengthened: a
  blur-to-sharp resolve reads more dramatically against true white/black than it did against warm
  neutral.
- **Ambient drift** (`.ambient`) — mechanic unchanged, gradient stops re-derived (see Colour).

No parallax, no heavy carousels. Header hides on scroll-down, reveals on scroll-up. Accordions
expand with a short height/opacity transition. Swatch/size selection is an instant fill or invert —
no bounce, no ease-elastic.

---

## Imagery direction

**Normative:** the product is the only colour. Chrome is monochrome; `.grain` stays live on every
product and campaign shot as the one deliberate texture layer PRTFLO carries into the interface.

**Confirmed from screenshot — promoted from aspirational to normative:** real product shots on the
homepage are **candid, styled flat-lays and off-kilter editorial crops**, not sterile ghost-mannequin
renders. A bag is photographed at an angle on a textured linen backdrop with its own keys still
clipped to the zip; a cap sits crumpled and slightly askew on a painted surface; an editorial shot
crops tight to the waist-down, showing only flared denim and boots. Nothing is centred, symmetrical,
or catalogue-clean. This directly validates the "awkward beauty" principle below with real evidence
— it should now guide PDP hero/editorial shots specifically, not sit as a future-only idea:

- *"Awkward beauty" as a prompting lens.* Acne's real art-direction principle — deliberate
  imperfection, a blank or misaligned expression, a garment worn "slightly wrong," faded contrast,
  natural skin texture, candid off-angle product styling — is a genuinely useful target for an
  AI-generation pipeline, because it gives the imagery a distinct, honest aesthetic instead of
  defaulting to slick, symmetrical over-polish. It also sits well with the Reveal: imperfection
  primes the eye for "this was generated" rather than fighting to hide it behind maximum gloss. This
  is still a future prompt-engineering workstream — this document doesn't generate imagery — but it's
  no longer a speculative aspiration; treat it as the confirmed target look once real generation
  work starts.
- *An ASCII-loader idea.* Acne's one well-documented signature motion moment is a first-visit-only
  ASCII-art loading animation. It has a natural home in `/enter` or the Pipeline Dossier's assembling
  sequence — noted here as an optional future idea, not a rule this document commits to.

---

## Principles

1. **The product and the accent are the only colour.** Chrome is otherwise stark monochrome;
   `accent` is reserved strictly for links and commerce CTAs, never a surface — confirmed from
   screenshot, correcting the earlier "chrome is purely monochrome" claim.
2. **Restraint in chrome, one loud exception for the brand.** Utility type and grid stay sparse and
   quiet; the wordmark interstitial is the single deliberate, confirmed exception — bold, huge,
   unapologetic. Not everything is quiet; the name is allowed to be.
3. **Type by weight and case, not size.** A minimal size hierarchy for utility type; weight (300 on
   `ground`, 400 on `canvas`) and case carry the distinction there — the wordmark interstitial is the
   named exception (see above), not a contradiction.
4. **Square, not pill.** Controls and CTAs stay squared with hairline borders.
5. **Hairlines, not boxes.** Cold-grey 1px rules, not borders, shadows, or fills.
6. **Zero-margin where it's confirmed, generous elsewhere.** Full-bleed hero and editorial sections
   run to true zero padding — confirmed from screenshot. Elsewhere (PLP, PDP), generous whitespace
   remains the working assumption until verified.
7. **Stark, not soft.** True black, true white, cold grey — a deliberate reversal of the previous
   system's "warm neutrals, never cold." Warmth now lives entirely in the imagery.
8. **Candid over clean.** Product and campaign photography is styled and off-kilter — confirmed from
   screenshot — not sterile ghost-mannequin catalogue shots. Awkward beauty is the target, not glossy
   perfection.
9. **Quiet interaction, narrative motion kept separate.** Store interactions stay fast and subtle;
   grain, pixel-field, and the pipeline-dossier animations are the only places allowed to carry
   texture or meaning.

---

## Appendix

`zara-ui-spec.md` is retained as a provenance record of the structural research this system was
originally built from, but is no longer an active reference — this document is self-sufficient. A
separate `acne-ui-spec.md` research appendix (capturing per-topic confidence levels from the Acne
research) could be added later if useful for provenance, but wasn't part of this rewrite's scope.
