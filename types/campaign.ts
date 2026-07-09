// A campaign surface — a banner or promotional spot — and the creative
// record behind it. The PIPELINE toggle discloses this over the slot:
// process first, cost as the closing line.
export interface CampaignProcessStep {
  stage: string;
  detail: string;
}

export interface CampaignSpot {
  /** Asset id shown in the disclosure, e.g. campaign/ss26-01. */
  id: string;
  /** 'banner' gets the full process breakdown; 'spot' the compact one. */
  kind: 'banner' | 'spot';
  title: string;
  /** Where the surface runs, e.g. "Collection front — full bleed". */
  placement: string;
  /** The creative intent, one line. */
  concept: string;
  /** The making of it, in order: brief → ingredients → passes → grade. */
  process: CampaignProcessStep[];
  /** Pipeline attempts across the surface — kept + discarded. */
  attempts: number;
  /** Frames kept. */
  selects: number;
  /** Minutes in the pipeline, brief to accepted frame. */
  minutes: number;
  /** Indicative studio comparator; defaults to selects × studio shot rate. */
  studioEquivalentGBP?: number;
}
