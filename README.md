# Elliott Quashie — fashion portfolio

A portfolio piece: a fictional fashion house where every product image is
AI-generated. It is **not a real shop** — the site exists to show the work, and
says so up front.

What's here:

1. **Front door** (`/`) — a chromeless landing that sets context (a portfolio,
   not a real shop; every image is generated) and leads into the collection.
2. **Storefront** (`/collection`) — a browse-only multi-category catalogue
   (men, women, archive) with category, listing, and
   product pages. Every product, image, and price is driven from `config/*.ts`.
   A GBP/USD/EUR currency switcher restyles every price as editorial dressing.
3. **About the project** (`/intro`, `/about`) — an experiential page with
   scroll-reveal motion and a studio-vs-generated drag slider, plus a plain
   about page. Both make the "every image was generated" point explicit.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Editing content (no code required)

All non-code edits live in `config/`:

| File | What lives here |
| --- | --- |
| `config/site.ts` | Brand name, nav, contact email |
| `config/categories.ts` | The category cards + hero copy |
| `config/products.ts` | Full product catalogue (typed) |
| `config/currencies.ts` | GBP/USD/EUR definitions + FX rates |
| `config/copy.ts` | Landing, home, and about strings |

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
