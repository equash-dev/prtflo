import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-muted">
        Nothing held in this collection yet.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-10 md:grid-cols-3 md:gap-x-4 md:gap-y-14 xl:grid-cols-4 xl:gap-x-10">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
