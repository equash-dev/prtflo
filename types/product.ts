export type CategorySlug = 'men' | 'women' | 'home' | 'archive';

export type ShotType = 'hero' | 'detail' | 'lifestyle' | 'flatlay' | 'model';

export interface ProductImage {
  src: string;
  alt: string;
  shotType: ShotType;
}

export interface ProductSize {
  label: string;
  inStock: boolean;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  basePriceGBP: number;
  shortDescription: string;
  description: string;
  composition?: string;
  care?: string;
  images: ProductImage[];
  sizes?: ProductSize[];
  colours?: string[];
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}
