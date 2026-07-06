import type { CategorySlug, Product } from '@/types/product';

const productImage = (category: CategorySlug, slug: string, n: number) =>
  `/products/${category}/${slug}/${String(n).padStart(2, '0')}.webp`;

export const PRODUCTS: Product[] = [
  // ── Womenswear ────────────────────────────────────────────────────────────
  {
    slug: 'silk-column-blouse',
    name: 'Silk column blouse',
    category: 'women',
    basePriceGBP: 215,
    shortDescription: 'Fluid silk, column-cut, ivory.',
    description:
      'A high-shine silk blouse with a relaxed column cut. Designed to drape from the shoulder with no break at the waist.',
    composition: '100% mulberry silk. Lining: cupro.',
    care: 'Dry clean only.',
    images: [
      { src: productImage('women', 'silk-column-blouse', 1), alt: 'Silk column blouse — front', shotType: 'hero' },
      { src: productImage('women', 'silk-column-blouse', 2), alt: 'Silk column blouse — side', shotType: 'detail' },
      { src: productImage('women', 'silk-column-blouse', 3), alt: 'Silk column blouse — on model', shotType: 'model' },
      { src: productImage('women', 'silk-column-blouse', 4), alt: 'Silk column blouse — flatlay', shotType: 'flatlay' },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: false },
    ],
    colours: ['Ivory', 'Black'],
    isBestSeller: true,
  },
  {
    slug: 'wool-double-coat',
    name: 'Wool double coat',
    category: 'women',
    basePriceGBP: 485,
    shortDescription: 'Double-breasted, mid-length, camel.',
    description:
      'Mid-length double-breasted coat in mid-weight Italian wool. Cleanly tailored with a soft shoulder.',
    composition: '90% wool, 10% cashmere.',
    care: 'Dry clean.',
    images: [
      { src: productImage('women', 'wool-double-coat', 1), alt: 'Wool double coat — front', shotType: 'hero' },
      { src: productImage('women', 'wool-double-coat', 2), alt: 'Wool double coat — back', shotType: 'detail' },
      { src: productImage('women', 'wool-double-coat', 3), alt: 'Wool double coat — styled', shotType: 'lifestyle' },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Camel', 'Navy'],
    isNew: true,
  },
  {
    slug: 'ribbed-merino-knit',
    name: 'Ribbed merino knit',
    category: 'women',
    basePriceGBP: 145,
    shortDescription: 'Fine-gauge merino, slim fit.',
    description:
      'Fine-gauge ribbed merino knit with a high neck and slim fit. A foundational layer.',
    composition: '100% extra-fine merino wool.',
    images: [
      { src: productImage('women', 'ribbed-merino-knit', 1), alt: 'Ribbed merino knit — front', shotType: 'hero' },
      { src: productImage('women', 'ribbed-merino-knit', 2), alt: 'Ribbed merino knit — detail', shotType: 'detail' },
      { src: productImage('women', 'ribbed-merino-knit', 3), alt: 'Ribbed merino knit — styled', shotType: 'lifestyle' },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Bone', 'Charcoal', 'Forest'],
  },

  // ── Menswear ─────────────────────────────────────────────────────────────
  {
    slug: 'cotton-twill-overshirt',
    name: 'Cotton twill overshirt',
    category: 'men',
    basePriceGBP: 185,
    shortDescription: 'Heavy cotton twill, boxy fit.',
    description:
      'Boxy overshirt in heavy cotton twill. Patch chest pockets, horn buttons, garment dyed for depth of colour.',
    composition: '100% organic cotton.',
    images: [
      { src: productImage('men', 'cotton-twill-overshirt', 1), alt: 'Cotton twill overshirt — front', shotType: 'hero' },
      { src: productImage('men', 'cotton-twill-overshirt', 2), alt: 'Cotton twill overshirt — back', shotType: 'detail' },
      { src: productImage('men', 'cotton-twill-overshirt', 3), alt: 'Cotton twill overshirt — on model', shotType: 'model' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: false },
    ],
    colours: ['Stone', 'Olive', 'Black'],
    isBestSeller: true,
  },
  {
    slug: 'pleat-front-trouser',
    name: 'Pleat-front trouser',
    category: 'men',
    basePriceGBP: 225,
    shortDescription: 'Single pleat, tapered, wool.',
    description:
      'Single-pleat wool trouser with a high rise and clean taper through the leg.',
    composition: '95% wool, 5% mohair.',
    images: [
      { src: productImage('men', 'pleat-front-trouser', 1), alt: 'Pleat-front trouser — front', shotType: 'hero' },
      { src: productImage('men', 'pleat-front-trouser', 2), alt: 'Pleat-front trouser — detail', shotType: 'detail' },
      { src: productImage('men', 'pleat-front-trouser', 3), alt: 'Pleat-front trouser — flatlay', shotType: 'flatlay' },
    ],
    sizes: [
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: true },
      { label: '36', inStock: true },
    ],
    colours: ['Charcoal', 'Navy'],
  },
  {
    slug: 'cashmere-crew',
    name: 'Cashmere crew',
    category: 'men',
    basePriceGBP: 295,
    shortDescription: 'Lightweight cashmere, crew neck.',
    description:
      'A weekday cashmere crew, knitted in a lightweight 12-gauge yarn.',
    composition: '100% cashmere.',
    images: [
      { src: productImage('men', 'cashmere-crew', 1), alt: 'Cashmere crew — front', shotType: 'hero' },
      { src: productImage('men', 'cashmere-crew', 2), alt: 'Cashmere crew — detail', shotType: 'detail' },
      { src: productImage('men', 'cashmere-crew', 3), alt: 'Cashmere crew — styled', shotType: 'lifestyle' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Oat', 'Slate', 'Black'],
    isNew: true,
  },

  // ── Footwear ─────────────────────────────────────────────────────────────
  {
    slug: 'leather-derby',
    name: 'Leather derby',
    category: 'men',
    basePriceGBP: 320,
    shortDescription: 'Goodyear-welted, calf leather.',
    description:
      'A clean derby silhouette, Goodyear-welted on a Blake stitch sole. Hand-finished in Northampton.',
    composition: 'Calf leather upper, leather sole.',
    images: [
      { src: productImage('men', 'leather-derby', 1), alt: 'Leather derby — quarter', shotType: 'hero' },
      { src: productImage('men', 'leather-derby', 2), alt: 'Leather derby — sole', shotType: 'detail' },
      { src: productImage('men', 'leather-derby', 3), alt: 'Leather derby — pair', shotType: 'flatlay' },
    ],
    sizes: [
      { label: 'UK 7', inStock: true },
      { label: 'UK 8', inStock: true },
      { label: 'UK 9', inStock: true },
      { label: 'UK 10', inStock: true },
      { label: 'UK 11', inStock: false },
    ],
    colours: ['Black', 'Tan'],
    isBestSeller: true,
  },
  {
    slug: 'low-profile-trainer',
    name: 'Low-profile trainer',
    category: 'archive',
    basePriceGBP: 245,
    shortDescription: 'Italian leather, vulcanised sole.',
    description:
      'A low-profile trainer with a vulcanised gum sole and a butter-soft Italian leather upper.',
    images: [
      { src: productImage('archive', 'low-profile-trainer', 1), alt: 'Low-profile trainer — quarter', shotType: 'hero' },
      { src: productImage('archive', 'low-profile-trainer', 2), alt: 'Low-profile trainer — top', shotType: 'detail' },
      { src: productImage('archive', 'low-profile-trainer', 3), alt: 'Low-profile trainer — pair', shotType: 'flatlay' },
    ],
    sizes: [
      { label: 'UK 7', inStock: true },
      { label: 'UK 8', inStock: true },
      { label: 'UK 9', inStock: true },
      { label: 'UK 10', inStock: true },
    ],
    colours: ['Cream', 'Off-black'],
  },
  {
    slug: 'suede-chelsea',
    name: 'Suede Chelsea',
    category: 'archive',
    basePriceGBP: 290,
    shortDescription: 'Suede upper, leather sole.',
    description:
      'A clean Chelsea boot in soft Italian suede with elasticated side panels.',
    composition: 'Suede upper, leather sole.',
    images: [
      { src: productImage('archive', 'suede-chelsea', 1), alt: 'Suede Chelsea — quarter', shotType: 'hero' },
      { src: productImage('archive', 'suede-chelsea', 2), alt: 'Suede Chelsea — back', shotType: 'detail' },
      { src: productImage('archive', 'suede-chelsea', 3), alt: 'Suede Chelsea — styled', shotType: 'lifestyle' },
    ],
    sizes: [
      { label: 'UK 7', inStock: true },
      { label: 'UK 8', inStock: true },
      { label: 'UK 9', inStock: true },
      { label: 'UK 10', inStock: false },
    ],
    colours: ['Mocha', 'Black'],
    isNew: true,
  },

  // ── Accessories ──────────────────────────────────────────────────────────
  {
    slug: 'structured-leather-tote',
    name: 'Structured leather tote',
    category: 'women',
    basePriceGBP: 425,
    shortDescription: 'Vegetable-tanned, hand-finished.',
    description:
      'A structured tote in vegetable-tanned leather. Brass hardware, suede lining, hand-finished edges.',
    composition: 'Vegetable-tanned leather, suede lining.',
    images: [
      { src: productImage('women', 'structured-leather-tote', 1), alt: 'Structured tote — front', shotType: 'hero' },
      { src: productImage('women', 'structured-leather-tote', 2), alt: 'Structured tote — interior', shotType: 'detail' },
      { src: productImage('women', 'structured-leather-tote', 3), alt: 'Structured tote — carried', shotType: 'lifestyle' },
    ],
    colours: ['Chestnut', 'Black'],
    isBestSeller: true,
  },
  {
    slug: 'woven-leather-belt',
    name: 'Woven leather belt',
    category: 'archive',
    basePriceGBP: 145,
    shortDescription: 'Hand-woven, brass buckle.',
    description:
      'A hand-woven belt in soft Italian leather with a polished brass buckle.',
    composition: 'Italian calf leather.',
    images: [
      { src: productImage('archive', 'woven-leather-belt', 1), alt: 'Woven leather belt — flatlay', shotType: 'hero' },
      { src: productImage('archive', 'woven-leather-belt', 2), alt: 'Woven leather belt — detail', shotType: 'detail' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
    colours: ['Cognac', 'Black'],
  },
  {
    slug: 'silk-blend-scarf',
    name: 'Silk-blend scarf',
    category: 'archive',
    basePriceGBP: 95,
    shortDescription: 'Silk-cashmere, hand-rolled hem.',
    description:
      'A featherweight scarf in a silk-cashmere blend, with a hand-rolled hem.',
    composition: '70% silk, 30% cashmere.',
    images: [
      { src: productImage('archive', 'silk-blend-scarf', 1), alt: 'Silk-blend scarf — flatlay', shotType: 'hero' },
      { src: productImage('archive', 'silk-blend-scarf', 2), alt: 'Silk-blend scarf — detail', shotType: 'detail' },
      { src: productImage('archive', 'silk-blend-scarf', 3), alt: 'Silk-blend scarf — worn', shotType: 'model' },
    ],
    colours: ['Bone', 'Storm', 'Plum'],
    isNew: true,
  },

  // ── Home ─────────────────────────────────────────────────────────────────
  {
    slug: 'boiled-wool-throw',
    name: 'Boiled wool throw',
    category: 'home',
    basePriceGBP: 165,
    shortDescription: 'Dense boiled wool, blanket-stitched.',
    description:
      'A heavyweight throw in dense boiled lambswool with a hand-finished blanket stitch. Sized to fall over the arm of a sofa or the foot of a bed.',
    composition: '100% boiled lambswool.',
    care: 'Dry clean or air flat.',
    images: [
      { src: productImage('home', 'boiled-wool-throw', 1), alt: 'Boiled wool throw — folded', shotType: 'hero' },
      { src: productImage('home', 'boiled-wool-throw', 2), alt: 'Boiled wool throw — stitch detail', shotType: 'detail' },
      { src: productImage('home', 'boiled-wool-throw', 3), alt: 'Boiled wool throw — draped', shotType: 'lifestyle' },
    ],
    colours: ['Bone', 'Charcoal'],
    isNew: true,
  },
  {
    slug: 'stoneware-vessel-set',
    name: 'Stoneware vessel set',
    category: 'home',
    basePriceGBP: 120,
    shortDescription: 'Three vessels, unglazed exterior.',
    description:
      'A set of three stoneware vessels, thrown to graduated heights. Unglazed exterior, glazed interior, no two surfaces alike.',
    composition: 'High-fired stoneware.',
    care: 'Wipe clean.',
    images: [
      { src: productImage('home', 'stoneware-vessel-set', 1), alt: 'Stoneware vessel set — grouped', shotType: 'hero' },
      { src: productImage('home', 'stoneware-vessel-set', 2), alt: 'Stoneware vessel set — surface detail', shotType: 'detail' },
    ],
    colours: ['Bone', 'Stone'],
  },
  {
    slug: 'washed-linen-bed-set',
    name: 'Washed linen bed set',
    category: 'home',
    basePriceGBP: 210,
    shortDescription: 'Stone-washed European flax.',
    description:
      'Duvet cover and two pillowcases in stone-washed European flax. Softens with every wash; pressed by no one.',
    composition: '100% European flax linen.',
    care: 'Machine wash cool. Do not iron.',
    images: [
      { src: productImage('home', 'washed-linen-bed-set', 1), alt: 'Washed linen bed set — made bed', shotType: 'hero' },
      { src: productImage('home', 'washed-linen-bed-set', 2), alt: 'Washed linen bed set — texture detail', shotType: 'detail' },
      { src: productImage('home', 'washed-linen-bed-set', 3), alt: 'Washed linen bed set — flatlay', shotType: 'flatlay' },
    ],
    sizes: [
      { label: 'Double', inStock: true },
      { label: 'King', inStock: true },
      { label: 'Super King', inStock: false },
    ],
    colours: ['Bone', 'Storm'],
    isBestSeller: true,
  },
];

export const PRODUCT_MAP: Record<string, Product> = PRODUCTS.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, Product>,
);

export const productsByCategory = (category: string): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const totalAssetCount = (): number =>
  PRODUCTS.reduce((n, p) => n + p.images.length, 0);
