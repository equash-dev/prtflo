import { notFound } from 'next/navigation';
import { CATEGORIES, CATEGORY_MAP } from '@/config/categories';
import { productsByCategory } from '@/config/products';
import { CategoryNav } from '@/components/storefront/CategoryNav';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import { withExistingImages } from '@/lib/images';
import type { CategorySlug } from '@/types/product';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

const VALID = new Set(CATEGORIES.map((c) => c.slug as string));

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!VALID.has(category)) return {};
  const cat = CATEGORY_MAP[category as CategorySlug];
  return {
    title: cat.name,
    description: cat.heroSubcopy,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!VALID.has(category)) notFound();
  const cat = CATEGORY_MAP[category as CategorySlug];
  const products = productsByCategory(category).map(withExistingImages);

  return (
    <>
      <CategoryNav activeSlug={category} />
      <section className="px-4 pb-6 pt-10 md:px-10 md:pt-12">
        <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
          Collection
        </p>
        <h1 className="mt-2 text-2xl font-normal uppercase tracking-[0.02em] text-ink md:text-3xl">
          {cat.heroHeading}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {cat.heroSubcopy}
        </p>
      </section>
      <section className="px-4 pb-16 md:px-10">
        <div className="mb-8 border-y border-hairline py-3">
          <span className="text-[11px] uppercase tracking-[0.04em] text-muted">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="py-16 text-center text-[11px] uppercase tracking-[0.04em] text-muted">
            Nothing is held in the archive yet.
          </p>
        )}
      </section>
    </>
  );
}
