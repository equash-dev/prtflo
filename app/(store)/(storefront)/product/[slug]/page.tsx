import { notFound } from 'next/navigation';
import { PRODUCTS, PRODUCT_MAP, productsByCategory } from '@/config/products';
import { CATEGORY_MAP } from '@/config/categories';
import { CategoryNav } from '@/components/storefront/CategoryNav';
import { ProductGallery } from '@/components/storefront/ProductGallery';
import { ProductDetails } from '@/components/storefront/ProductDetails';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import { galleryShots, modelPortrait, withExistingImages } from '@/lib/images';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_MAP[slug];
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const found = PRODUCT_MAP[slug];
  if (!found) notFound();
  const product = withExistingImages(found);
  const shots = galleryShots(found);
  const modelPortraitSrc = product.modelName ? modelPortrait(product.modelName) : undefined;
  const category = CATEGORY_MAP[product.category];
  const related = productsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4)
    .map(withExistingImages);

  return (
    <>
      <CategoryNav activeSlug={product.category} />
      <section className="py-8 md:py-10">
        <nav className="mb-6 px-4 text-[11px] uppercase tracking-[0.04em] text-muted md:px-10">
          <a href={`/${product.category}`} className="transition-colors hover:text-ink">
            {category.name}
          </a>
          <span className="mx-2 text-hairline">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
        {/* The gallery runs flush to the viewport edge (confirmed from
            screenshot); only the info rail keeps the page's usual side
            padding, via lg:pl-0 relying on the grid gap for separation once
            the two-column layout kicks in. */}
        <div className="grid gap-8 lg:grid-cols-[1.7fr_minmax(320px,1fr)] lg:gap-12">
          <ProductGallery shots={shots} />
          <div className="px-4 md:px-10 lg:sticky lg:top-20 lg:self-start lg:pl-0">
            <ProductDetails product={product} shots={shots} modelPortraitSrc={modelPortraitSrc} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-hairline py-14">
          <h2 className="mb-8 px-4 text-[12px] uppercase tracking-[0.04em] text-ink md:px-10">
            You may also like
          </h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </>
  );
}
