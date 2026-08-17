import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

// 'responsive' (default) is the PLP/related-products density: 2/3/4 columns
// as the viewport grows. 'fixed-4' is for homepage rows specced as a flat
// 4-up (mobile stays 2-up rather than cramming 4 columns onto a phone).
export function ProductGrid({
  products,
  cols = 'responsive',
}: {
  products: Product[];
  cols?: 'responsive' | 'fixed-4';
}) {
  if (products.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-muted">
        Nothing held in this collection yet.
      </p>
    );
  }
  return (
    // Zero gap, confirmed from screenshot: real PLP images run edge-to-edge.
    <div
      className={[
        'grid grid-cols-2 gap-0',
        cols === 'fixed-4' ? 'md:grid-cols-4' : 'md:grid-cols-3 xl:grid-cols-4',
      ].join(' ')}
    >
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
