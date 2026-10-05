# PRTFLO — fashion portfolio

A portfolio piece: a fictional fashion house where every product image is
AI-generated. It is **not a real shop** — the site exists to show the work, and
says so up front.

What's here:

1. **Front door** (`/enter` → `/`) — a password gate with a brief portfolio
   introduction, followed by equal choices for About Me and Storefront.
2. **Storefront** (`/collection`) — a browse-only multi-category catalogue
   (men, women, archive) with category, listing, and
   product pages. Every product, image, and price is driven from `config/*.ts`.
   A GBP/USD/EUR currency switcher restyles every price as editorial dressing.
3. **About the project** (`/intro`, `/about`) — project context and a personal
   career story with chapter navigation, showreels, galleries and interactive demos.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Set `SITE_PASSWORD` in `.env.local` for local development and in the hosting
environment for deployment. Without it, the gate stays locked. Successful entry
sets an HTTP-only access cookie for 30 days and opens the choice screen at `/`.
Changing the password invalidates existing access cookies. Direct page links,
including `/about` and `/collection`, also require the password; storefront image
directories remain public. Gate and choice-screen text lives in `config/copy.ts`.

Vercel Web Analytics tracks page views through the root layout. Enable Analytics
in the Vercel project dashboard and deploy to start collecting visits. The
`/_vercel/insights/` endpoints bypass the password gate so visits to the entry
page are counted too. Local development does not send production analytics.

## Editing content (no code required)

All non-code edits live in `config/`:

| File | What lives here |
| --- | --- |
| `config/site.ts` | Brand name, nav, contact email |
| `config/categories.ts` | The category cards + hero copy |
| `config/products.ts` | Full product catalogue (typed) |
| `config/currencies.ts` | GBP/USD/EUR definitions + FX rates |
| `config/copy.ts` | Landing, home, and about strings |
| `config/about.ts` | About Me introduction, PRTFLO case study and production approach |
| `config/cv.json` | CV preview and downloadable PDF content |
| `config/journey.ts` | How I Got Here chapters, captions and example slots |
| `config/batch-demo.ts` | Wardrobe choices, matching saved outputs and pipeline demo copy |

### About timeline and CV

`/about` starts with a personal introduction, then eight How I Got Here chapters,
followed by the CV. A sticky chapter menu and next-step links let visitors skip
ahead. A single pinned stage moves through a Canals-inspired editorial strip of
upright imagery and large type, with a narrow navigation rail. Scroll, drag or
use chapter shortcuts. A reading view remains available. Demos, showreels and the
CV preview open inside each slide's media area. Media extends beneath a continuous
editorial sheet, with small crop changes and gentle movement. Chapters have solid
colour backgrounds; imagery stays in the chapter media areas. Reduced-motion preferences
disable animated movement.

See [the journey content guide](docs/about-journey.md) for the single intro portrait,
showreels, example galleries and America speaking photos. Chapter 04 has an equipment
tracker; chapter 05 has a three-round node connection game. The pipeline demo uses local
sample images. Chapter 07 uses three existing ecommerce looks, with descriptive
labels for the trousers, shoes and any layers shown. Visitors choose a saved primary
view, then explore the existing shot set, approve or hold looks, and download an
illustrative manifest. A view change clears previous approvals. Both the UI and
exports identify this as an indicative demo with no live generation or delivery.

Run `npm run export:workflow` after changing the catalogue or prompt instructions
to refresh the downloadable manifest and instructions in `public/about/`.

Add a portrait at `public/about/portrait.webp` to replace the reserved portrait
space. Adjust its description in `config/about.ts`.

Edit `config/cv.json`, then run `npm run export:cv` (Python with `reportlab`
installed) to regenerate `public/about/elliott-quashie-cv.pdf` and its copy in
`output/pdf/`. The on-page preview retains the full career detail; the `print`
section in the same JSON supplies concise copy for the single-page PDF.
The PDF follows the supplied editorial reference: black type on white, a bold
name with contact details at the top right, and section labels beside one aligned
content column. Skills split into two columns. There is no certifications section.
It uses the contact email in `config/site.ts` and stays behind the password gate.
The generator checks that text fits the single page with a clear bottom margin.
Employment dates use the confirmed months and years in `config/cv.json`.

To add a product: append an object to `PRODUCTS` in `config/products.ts` and
drop image files at `public/products/{category}/{slug}/01.webp`,
`02.webp`, … matching the `images[]` array.

## Project layout

```
app/                        Next.js 16 App Router pages
components/                 Storefront, intro, and shared UI components
config/                     Editable content (products, copy, etc.)
context/                    Currency provider
lib/                        Pricing + colour helpers
public/products/...         Pre-rendered AI imagery (you supply these)
types/                      Type definitions consumed by config and lib
```

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19.2
- TypeScript
- Tailwind CSS 4

## Imagery

The storefront expects images at:

```
public/products/{category}/{slug}/01.webp
public/products/{category}/{slug}/02.webp
...
```

`{category}` is the category slug (`men`, `women`, `home`, `archive`). Image
files are detected on the server at render time — drop a file in and it
appears on the next build / dev refresh. Until then, the layout still renders
(image slots fall back to a warm panel labelled with the shot type).

Each product shot can carry an optional **generation reference** alongside it:

```
public/products/{category}/{slug}/ref-01.webp   (pairs with 01.webp)
```

When present, hovering that frame on the product page swaps to the reference
image with a "Generation reference" label.

Other slots detected the same way:

```
public/hero/{menswear,womenswear,home,accessories}.webp   category heroes
public/campaign/ss26-01.webp                              /collection campaign
```

The `/intro` drag slider will use a real studio-vs-generated pair when these
exist:

```
public/reveal/studio.webp
public/reveal/generated.webp
```

## Scripts

```bash
npm run dev      # next dev (Turbopack)
npm run build    # next build
npm run start    # next start
```
