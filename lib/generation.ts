import { PIPELINE } from '@/config/pipeline';
import type { Product } from '@/types/product';

// The honest arithmetic behind the find-in-store dossier and the checkout
// disclosure: what a piece's imagery actually took to make, from its
// per-piece generation log when one exists, house averages otherwise.

export interface GenerationFigures {
  /** Frames in the piece's shot manifest. */
  frames: number;
  /** Pipeline attempts across the set — kept + discarded. */
  attempts: number;
  discarded: number;
  /** Minutes in the pipeline, prompt to accepted frame. */
  minutes: number;
  costGBP: number;
  studioGBP: number;
  /** True when the figures come from the piece's own log, not house averages. */
  logged: boolean;
}

export function generationFigures(product: Product): GenerationFigures {
  const frames = product.images.length;
  const logged = Boolean(product.generation);
  const attempts =
    product.generation?.attempts ?? frames * PIPELINE.attemptsPerFrame;
  const minutes =
    product.generation?.minutes ??
    Math.round(attempts * PIPELINE.minutesPerAttempt);
  return {
    frames,
    attempts,
    discarded: Math.max(0, attempts - frames),
    minutes,
    costGBP: attempts * PIPELINE.generationCostGBP,
    studioGBP: frames * PIPELINE.studioShotCostGBP,
    logged,
  };
}
