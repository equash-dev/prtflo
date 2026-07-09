export type CategorySlug = 'men' | 'women' | 'archive';

export type ShotType = 'ghost hero' | 'editorial' | 'mid-crop' | 'detail macro';

export interface ProductImage {
  src: string;
  alt: string;
  shotType: ShotType;
  /** Linesheet asset code, e.g. PRTM01_INK_01. */
  assetCode?: string;
}

export interface ProductSize {
  label: string;
  inStock: boolean;
}

/** Per-piece generation log. When present it replaces the house averages
 * in `config/pipeline.ts` inside the find-in-store dossier. */
export interface GenerationLog {
  /** Total pipeline attempts across the piece's shot set — kept + discarded. */
  attempts: number;
  /** Total minutes in the pipeline, prompt to accepted frame. Defaults to
   * attempts × the house minutes-per-attempt when omitted. */
  minutes?: number;
}

export interface Product {
  slug: string;
  name: string;
  /** Linesheet product code, e.g. PRTM01. */
  code: string;
  /** Three-letter colourway code, e.g. INK. */
  colourCode: string;
  category: CategorySlug;
  basePriceGBP: number;
  shortDescription: string;
  description: string;
  signatureDetail?: string;
  composition?: string;
  care?: string;
  images: ProductImage[];
  generation?: GenerationLog;
  sizes?: ProductSize[];
  colours?: string[];
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}
