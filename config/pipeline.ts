// The pipeline view: what each image slot admits to when the PIPELINE
// toggle is on. Costs are indicative, in GBP, converted by the currency
// switcher like any price on the site.
export const PIPELINE = {
  // Cost to produce one generated asset (prompt + pipeline run).
  generationCostGBP: 0.12,
  // What the same frame would cost from a studio day (crew, set, model).
  studioShotCostGBP: 450,
  line: 'Generated — no studio, no shoot, no camera',
} as const;
