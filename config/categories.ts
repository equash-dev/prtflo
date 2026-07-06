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
      'Quiet utility, precise cuts. Tailoring, knitwear and considered footwear.',
    heroImage: '/hero/menswear.webp',
  },
  {
    slug: 'women',
    name: 'Women',
    heroHeading: 'Women',
    heroSubcopy:
      'Fluid tailoring, fine-gauge knits and structured leather. Cut to sit close.',
    heroImage: '/hero/womenswear.webp',
  },
  {
    slug: 'home',
    name: 'Home',
    heroHeading: 'Home',
    heroSubcopy:
      'Objects for the rooms the clothes live in. Boiled wool, stoneware, washed linen.',
    heroImage: '/hero/home.webp',
  },
  {
    slug: 'archive',
    name: 'Archive',
    heroHeading: 'Archive',
    heroSubcopy:
      'Season-less pieces. Unisex footwear and small leather goods, held in catalogue.',
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
