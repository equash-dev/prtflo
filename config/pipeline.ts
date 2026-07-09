// The pipeline view: what each image slot admits to when the PIPELINE
// toggle is on. Costs are indicative, in GBP, converted by the currency
// switcher like any price on the site.
export const PIPELINE = {
  // Cost of one pipeline attempt (prompt + generation run), kept or discarded.
  generationCostGBP: 0.12,
  // What the same frame would cost from a studio day (crew, set, model).
  studioShotCostGBP: 450,
  // House averages from the SS26 run — used by the find-in-store dossier
  // wherever a piece has no `generation` log of its own (types/product.ts).
  attemptsPerFrame: 6,
  minutesPerAttempt: 2,
  line: 'Generated — no studio, no shoot, no camera',
} as const;
