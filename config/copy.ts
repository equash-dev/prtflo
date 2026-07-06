export const COPY = {
  landing: {
    eyebrow: 'Portfolio · not a real shop',
    framing:
      'A fictional fashion house. Every image is AI-generated — no studio, no shoot, no camera. Look around as if it were real.',
    enterLabel: 'Enter the collection',
    aboutLabel: 'About the project',
  },
  home: {
    heroEyebrow: 'Spring / Summer 2026',
    heroHeading: 'A designer label of one.',
    heroSubcopy:
      'Season-less drops, a tight palette, an obsession with how the work is seen. Crafted in technical fabric. Cut to sit close.',
    primaryCta: { label: 'View the catalogue', href: '/women' },
    secondaryCta: { label: 'About the project', href: '/intro' },
  },
  campaign: {
    eyebrow: 'Campaign · SS26',
    heading: 'Shot nowhere. Worn anywhere.',
    body: 'The season campaign, staged entirely in the pipeline. No location, no crew, no call sheet — the same garments, placed wherever the house decides they live.',
    cta: { label: 'How this is made', href: '/intro' },
    image: '/campaign/ss26-01.webp',
  },
  about: {
    heading: 'About this project',
    body: 'Elliott Quashie is a fictional fashion house — a portfolio piece. The garments are original product concepts: designed, named, priced, and merchandised like a label you could buy from tomorrow. Every image you see was generated; there was no studio, no shoot, no camera. The site exists to show the work.',
  },
} as const;
