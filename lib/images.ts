import fs from 'node:fs';
import path from 'node:path';
import type { Product, ProductImage } from '@/types/product';

// Server-only (uses fs). Generated imagery lands in public/ over time;
// these helpers let server pages prune image lists down to files that
// actually exist so the UI can fall back to warm panels for the rest.

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export function imageExists(src: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, ...src.split('/').filter(Boolean)));
}

export function withExistingImages(product: Product): Product {
  return {
    ...product,
    images: product.images.filter((img) => imageExists(img.src)),
  };
}

// PDP gallery keeps one frame per configured shot even before the file
// lands, and pairs each shot with its generation reference when one exists
// at the ref-NN.webp convention (e.g. 01.webp → ref-01.webp).
export interface GalleryShot extends ProductImage {
  exists: boolean;
  refSrc?: string;
}

// Campaign banners land as public/campaign/banner-NN.webp via the ingest
// script; the collection banner strip shows whatever has arrived, in order.
export function campaignBanners(): string[] {
  const dir = path.join(PUBLIC_DIR, 'campaign');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^banner-\d{2}\.webp$/.test(f))
    .sort()
    .map((f) => `/campaign/${f}`);
}

export function galleryShots(product: Product): GalleryShot[] {
  return product.images.map((img) => {
    const refSrc = img.src.replace(/\/(\d+)\.webp$/, '/ref-$1.webp');
    return {
      ...img,
      exists: imageExists(img.src),
      refSrc:
        refSrc !== img.src && imageExists(refSrc) ? refSrc : undefined,
    };
  });
}
