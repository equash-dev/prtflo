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
// PRTFLO HOME packs: product/home/HNN_PACK.png is the generation reference;
// product/home/HNN_PACK/HNN_PACK[_N].png are the styled packshots, renumbered
// sequentially (suffixes vary between packs) → 01.webp, 02.webp, …
const HOME_RE = /^(H\d{2})_PACK(?:_(\d+))?\.png$/i;
const HOME_SHOTS_PER_PRODUCT = 3;
// Keep in sync with config/products.ts.
const HOME_SLUGS = {
  H01: 'sculptural-stoneware-vase',
  H02: 'hand-painted-plate-set',
  H03: 'ribbed-amber-glass-tumblers',
  H04: 'travertine-candleholder-pair',
  H05: 'kilim-patchwork-cushion',
  H06: 'herringbone-wool-throw',
  H07: 'geometric-wool-runner',
  H08: 'glazed-ceramic-table-lamp',
  H09: 'organic-plaster-mirror',
  H10: 'olive-wood-serving-board',
  H11: 'washed-linen-bedding-stack',
  H12: 'ceramic-arch-bookends',
};
// Campaign banners: banner_01.png → public/campaign/banner-01.webp
const BANNER_RE = /^banner[_-](\d{2})\.png$/i;
// Department tiles: spot_womens.png → public/spots/women.webp
const SPOT_RE = /^spot[_-]([a-z]+)\.png$/i;
const SPOT_SLUGS = { mens: 'men', men: 'men', womens: 'women', women: 'women', home: 'home' };

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
const homeRefs = new Map();
const homeGroups = new Map();

async function toWebp(file, outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, smartSubsample: true, effort: 5 })
    .toFile(outPath);
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`${path.basename(file)} → ${path.relative(ROOT, outPath)} (${kb} KB)`);
  converted += 1;
}

for (const file of walk(DROP_DIR)) {
  const base = path.basename(file);
  if (!base.toLowerCase().endsWith('.png')) continue;

  const home = base.match(HOME_RE);
  if (home) {
    const code = home[1].toUpperCase();
    if (!HOME_SLUGS[code]) {
      skipped.push(`${base} — unknown home code ${code}`);
      continue;
    }
    const inPackFolder = /^h\d{2}_pack$/i.test(path.basename(path.dirname(file)));
    if (inPackFolder) {
      const n = home[2] ? Number(home[2]) : -1;
      if (!homeGroups.has(code)) homeGroups.set(code, []);
      homeGroups.get(code).push({ file, n });
    } else {
      homeRefs.set(code, file);
    }
    continue;
  }

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

  const spotMatch = base.match(SPOT_RE);
  if (spotMatch) {
    const slug = SPOT_SLUGS[spotMatch[1].toLowerCase()];
    if (!slug) {
      skipped.push(`${base} — unknown department '${spotMatch[1]}'`);
      continue;
    }
    const outDir = path.join(ROOT, 'public', 'spots');
    const outPath = path.join(outDir, `${slug}.webp`);
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

// Home packs convert after the walk so each pack's shots can be renumbered
// sequentially regardless of how the drop suffixed them.
for (const [code, group] of homeGroups) {
  const slug = HOME_SLUGS[code];
  group.sort((a, b) => a.n - b.n);
  for (const [i, shot] of group.entries()) {
    await toWebp(
      shot.file,
      path.join(OUT_ROOT, 'home', slug, `${String(i + 1).padStart(2, '0')}.webp`),
    );
  }
}
for (const [code, file] of homeRefs) {
  await toWebp(file, path.join(OUT_ROOT, 'home', HOME_SLUGS[code], 'ref-01.webp'));
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
for (const [code, slug] of Object.entries(HOME_SLUGS)) {
  for (let n = 1; n <= HOME_SHOTS_PER_PRODUCT; n += 1) {
    const nn = String(n).padStart(2, '0');
    if (!fs.existsSync(path.join(OUT_ROOT, 'home', slug, `${nn}.webp`))) {
      missing.push(`${code}_${nn}`);
    }
  }
}

const expected =
  Object.keys(PRODUCT_CODES).length * SHOTS_PER_PRODUCT +
  Object.keys(HOME_SLUGS).length * HOME_SHOTS_PER_PRODUCT;
console.log(
  `\n${converted} converted, ${skipped.length} skipped. ` +
    `${expected - missing.length}/${expected} manifest shots on disk.`,
);
if (missing.length) console.log(`Still missing: ${missing.join(', ')}`);
