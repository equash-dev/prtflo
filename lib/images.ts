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
