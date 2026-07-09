// Converts handed-over PNG masters into the optimized WebP the site serves.
//
// Drop PNGs anywhere under product/ (subfolders ignored — the filename
// carries everything), named by linesheet asset code:
//   PRTM01_INK_01.png  → public/products/men/heavyweight-boxy-tee/01.webp
//   PRTM01_INK.png     → …/ref-01.webp  (generation source; powers the
//                        "generation reference" hover on the ghost-hero frame)
//
// Usage: npm run ingest

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const DROP_DIR = path.join(ROOT, 'product');
const OUT_ROOT = path.join(ROOT, 'public', 'products');

// Full native resolution (masters are 3584px wide); the zoom lightbox serves
// these files directly, so keep every pixel. Browsing pages are unaffected —
// next/image caps what it delivers to the viewport.
const MAX_WIDTH = 3840;
const QUALITY = 90;
const SHOTS_PER_PRODUCT = 4;

// Keep in sync with config/products.ts.
const PRODUCT_CODES = {
  PRTM01: { category: 'men', slug: 'heavyweight-boxy-tee' },
  PRTM02: { category: 'men', slug: 'garment-dyed-slogan-tee' },
  PRTM03: { category: 'men', slug: 'heavyweight-crew-tee' },
  PRTM04: { category: 'men', slug: 'printed-knit-tank' },
  PRTM05: { category: 'men', slug: 'camp-collar-graphic-shirt' },
  PRTM06: { category: 'men', slug: 'double-layer-long-sleeve-tee' },
  PRTM07: { category: 'men', slug: 'washed-balloon-jeans' },
  PRTM08: { category: 'men', slug: 'wide-leg-twill-trousers' },
  PRTM09: { category: 'men', slug: 'relaxed-cargo-trousers' },
  PRTM10: { category: 'men', slug: 'pleated-wide-shorts' },
  PRTW01: { category: 'women', slug: 'oversized-double-breasted-blazer' },
  PRTW02: { category: 'women', slug: 'crossover-waist-wide-leg-jeans' },
  PRTW03: { category: 'women', slug: 'barrel-leg-trousers' },
  PRTW04: { category: 'women', slug: 'low-rise-roomy-jeans' },
  PRTW05: { category: 'women', slug: 'linen-blend-wide-leg-trousers' },
  PRTW06: { category: 'women', slug: 'sequinned-wrap-skort' },
  PRTW07: { category: 'women', slug: 'sequinned-mini-skirt' },
  PRTW08: { category: 'women', slug: 'frayed-stripe-midi-shirtdress' },
  PRTW09: { category: 'women', slug: 'buttoned-knit-midi-dress' },
  PRTW10: { category: 'women', slug: 'boat-neck-cropped-knit' },
};

const SHOT_RE = /^(PRT[MW]\d{2})_([A-Z]{3})_(\d{2})\.png$/i;
const REF_RE = /^(PRT[MW]\d{2})_([A-Z]{3})\.png$/i;
// Campaign banners: banner_01.png → public/campaign/banner-01.webp
const BANNER_RE = /^banner[_-](\d{2})\.png$/i;

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

if (!fs.existsSync(DROP_DIR)) {
  console.error(`No drop folder at ${DROP_DIR} — nothing to ingest.`);
  process.exit(1);
}

let converted = 0;
const skipped = [];

for (const file of walk(DROP_DIR)) {
  const base = path.basename(file);
  if (!base.toLowerCase().endsWith('.png')) continue;

  const banner = base.match(BANNER_RE);
  if (banner) {
    const outDir = path.join(ROOT, 'public', 'campaign');
    const outPath = path.join(outDir, `banner-${banner[1]}.webp`);
    fs.mkdirSync(outDir, { recursive: true });
    await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, smartSubsample: true, effort: 5 })
      .toFile(outPath);
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`${base} → ${path.relative(ROOT, outPath)} (${kb} KB)`);
    converted += 1;
    continue;
  }

  const shot = base.match(SHOT_RE);
  const ref = shot ? null : base.match(REF_RE);
  const match = shot ?? ref;
  if (!match) {
    skipped.push(`${base} — filename doesn't match {CODE}_{COLOUR}[_{NN}].png`);
    continue;
  }

  const code = match[1].toUpperCase();
  const product = PRODUCT_CODES[code];
  if (!product) {
    skipped.push(`${base} — unknown product code ${code}`);
    continue;
  }

  const outName = shot ? `${shot[3]}.webp` : 'ref-01.webp';
  const outDir = path.join(OUT_ROOT, product.category, product.slug);
  const outPath = path.join(outDir, outName);
  fs.mkdirSync(outDir, { recursive: true });

  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, smartSubsample: true, effort: 5 })
    .toFile(outPath);

  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`${base} → ${path.relative(ROOT, outPath)} (${kb} KB)`);
  converted += 1;
}

for (const s of skipped) console.warn(`skipped: ${s}`);

const missing = [];
for (const [code, { category, slug }] of Object.entries(PRODUCT_CODES)) {
  for (let n = 1; n <= SHOTS_PER_PRODUCT; n += 1) {
    const nn = String(n).padStart(2, '0');
    if (!fs.existsSync(path.join(OUT_ROOT, category, slug, `${nn}.webp`))) {
      missing.push(`${code}_${nn}`);
    }
  }
}

console.log(
  `\n${converted} converted, ${skipped.length} skipped. ` +
    `${80 - missing.length}/80 manifest shots on disk.`,
);
if (missing.length) console.log(`Still missing: ${missing.join(', ')}`);
