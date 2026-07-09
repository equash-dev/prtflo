import type { CategorySlug } from '@/types/product';

export interface CategoryConfig {
  slug: CategorySlug;
  name: string;
  heroHeading: string;
  heroSubcopy: string;
  heroImage: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: 'men',
    name: 'Men',
    heroHeading: 'Men',
    heroSubcopy:
      'Heavy jerseys, worked denim, garment-dyed twill. Cut loose, finished precisely.',
    heroImage: '/hero/menswear.webp',
  },
  {
    slug: 'women',
    name: 'Women',
    heroHeading: 'Women',
    heroSubcopy:
      'Sculpted trousers, washed denim, fine knits and sequins that glint, not glitter.',
    heroImage: '/hero/womenswear.webp',
  },
  {
    slug: 'archive',
    name: 'Archive',
    heroHeading: 'Archive',
    heroSubcopy:
      'Pieces retired from the range are held here, not discounted. The archive opens when the first season closes.',
    heroImage: '/hero/accessories.webp',
  },
];

export const CATEGORY_MAP: Record<CategorySlug, CategoryConfig> =
  CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.slug] = cat;
      return acc;
    },
    {} as Record<CategorySlug, CategoryConfig>,
  );
