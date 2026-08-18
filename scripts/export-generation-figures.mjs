// Exports the WORKFLOW/generation-dossier figures for every product to CSV.
//
// Usage: npm run export:generation
//
// Plain .mjs (not .ts) so it stays outside tsc's checked project — the same
// convention scripts/ingest-assets.mjs uses, and it sidesteps the fact that
// tsc rejects explicit .ts import extensions by default. Node's built-in
// type stripping still lets this .mjs entry import PRODUCTS/PIPELINE
// directly from their .ts source (import type is erased at strip time, so
// no `@/` alias resolution is needed for those two files). `lib/
// generation.ts` itself imports PIPELINE via the `@/` alias, which plain
// Node can't resolve — so the figures formula is mirrored here instead of
// imported. Keep in sync with lib/generation.ts.

import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS } from '../config/products.ts';
import { PIPELINE } from '../config/pipeline.ts';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'exports');
const OUT_FILE = path.join(OUT_DIR, 'generation-figures.csv');

function generationFigures(product) {
  const frames = product.images.length;
  const logged = Boolean(product.generation);
  const attempts =
    product.generation?.attempts ?? frames * PIPELINE.attemptsPerFrame;
  const minutes =
    product.generation?.minutes ??
    Math.round(attempts * PIPELINE.minutesPerAttempt);
  return {
    frames,
    attempts,
    discarded: Math.max(0, attempts - frames),
    minutes,
    costGBP: attempts * PIPELINE.generationCostGBP,
    studioGBP: product.generation?.studioGBP ?? frames * PIPELINE.studioShotCostGBP,
    logged,
  };
}

function csvField(value) {
  const str = String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

const HEADER = [
  'category',
  'slug',
  'name',
  'code',
  'colourCode',
  'model',
  'frames',
  'attempts',
  'discarded',
  'minutes',
  'costGBP',
  'studioGBP',
  'logged',
];

const rows = PRODUCTS.map((product) => {
  const figures = generationFigures(product);
  return [
    product.category,
    product.slug,
    product.name,
    product.code,
    product.colourCode,
    product.modelName ?? '',
    figures.frames,
    figures.attempts,
    figures.discarded,
    figures.minutes,
    figures.costGBP.toFixed(2),
    figures.studioGBP.toFixed(2),
    figures.logged,
  ].map(csvField);
});

const csv = [HEADER, ...rows].map((row) => row.join(',')).join('\n') + '\n';

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, csv);

console.log(`Wrote ${rows.length} rows to ${path.relative(ROOT, OUT_FILE)}`);
