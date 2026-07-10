import type { CampaignSpot } from '@/types/campaign';

// The campaign surfaces and what each one took to make. The PIPELINE
// toggle discloses these over the slot itself — the creative record
// first, the arithmetic last. Costs derive from config/pipeline.ts.
export const CAMPAIGN_SPOTS: Record<string, CampaignSpot> = {
  'campaign/ss26-01': {
    id: 'campaign/ss26-01',
    kind: 'banner',
    title: 'SS26 campaign hero',
    placement: 'Collection front — full bleed',
    concept:
      'One frame to carry the season: the range worn in a place that was never scouted.',
    process: [
      {
        stage: 'Brief',
        detail: 'No set dressing, no props. Quiet light; the garments talk.',
      },
      {
        stage: 'Ingredients',
        detail:
          'Ghost heroes, the calibrated pose set, one supplied backdrop plate. The PDP equation at location scale.',
      },
      {
        stage: 'Passes',
        detail:
          'Twenty-four attempts over four stagings. Light held constant; crop and distance explored.',
      },
      {
        stage: 'Grade',
        detail:
          'A single warm grade matched to the storefront panels. Grain kept, retouch refused.',
      },
    ],
    attempts: 24,
    selects: 1,
    minutes: 70,
    // A location day: crew, permits, catering — the frame this replaces.
    studioEquivalentGBP: 3200,
  },
  'spot/men': {
    id: 'spot/men',
    kind: 'spot',
    title: 'Men — department tile',
    placement: 'Collection front — department rail',
    concept: 'The range at its most utilitarian: twill, denim, heavy jersey.',
    process: [
      {
        stage: 'Passes',
        detail: 'Ten attempts from the men’s ghost set; one kept.',
      },
      {
        stage: 'Grade',
        detail: 'Matched to the warm panel; type sits on the frame, not in it.',
      },
    ],
    attempts: 10,
    selects: 1,
    minutes: 25,
  },
  'spot/women': {
    id: 'spot/women',
    kind: 'spot',
    title: 'Women — department tile',
    placement: 'Collection front — department rail',
    concept: 'Sculpted trousers and sequins that glint, not glitter.',
    process: [
      {
        stage: 'Passes',
        detail: 'Twelve attempts from the women’s editorial set; one kept.',
      },
      {
        stage: 'Grade',
        detail: 'Same warm grade as the men’s tile, so the rail reads as one.',
      },
    ],
    attempts: 12,
    selects: 1,
    minutes: 30,
  },
  'spot/home': {
    id: 'spot/home',
    kind: 'spot',
    title: 'Home — department tile',
    placement: 'Collection front — department rail',
    concept: 'Objects for the rooms the clothes live in.',
    process: [
      {
        stage: 'Passes',
        detail: 'Twelve packs staged as gallery still lifes; one prompt system.',
      },
      {
        stage: 'Grade',
        detail: 'Warm film grade, blank book spines, nothing branded but the house.',
      },
    ],
    attempts: 14,
    selects: 1,
    minutes: 30,
  },
};
