// Publish reviewable working files from the same sources that drive the site.
import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS } from '../config/products.ts';

const root = process.cwd();
const destination = path.join(root, 'public/about');
fs.mkdirSync(destination, { recursive: true });
fs.copyFileSync(path.join(root, 'prompts/SYSTEM-INSTRUCTIONS.md'), path.join(destination, 'generation-instructions.md'));
const manifest = {
  project: 'PRTFLO / SS26',
  description: 'Asset manifest exported from the published catalogue configuration.',
  products: PRODUCTS.map((product) => ({
    code: product.code,
    name: product.name,
    category: product.category,
    assets: product.images.map((image) => ({
      code: image.assetCode,
      path: image.src,
      available: fs.existsSync(path.join(root, 'public', image.src)),
    })),
  })),
};
fs.writeFileSync(path.join(destination, 'asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Exported instructions and manifest for ${manifest.products.length} products.`);
