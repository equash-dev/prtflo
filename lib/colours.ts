const COLOUR_HEX: Record<string, string> = {
  // SS26 linesheet colourways
  'Ink Navy': '#232a38',
  'Forest Green': '#3c4a3a',
  Oxblood: '#5a2a2a',
  'Ochre Yellow': '#c9962e',
  'Off-White': '#f0ece1',
  'Petrol Blue / Ecru': '#2f4a56',
  'Light Stone Wash': '#a8b6c4',
  'Washed Olive': '#77754f',
  'Washed Black': '#2e2c2a',
  Ecru: '#e8e0cd',
  'Mid-Blue Wash': '#5f7a9e',
  'Dark Olive': '#4a4a32',
  'Washed Grey-Green': '#8b9384',
  'Chocolate Brown': '#4b3527',
  Bronze: '#8c6239',
  'Moss Green': '#5d6647',
  'Blue/White Stripe': '#6f8bb0',
  'Charcoal Chalk-Stripe': '#3b3a3e',

  Ivory: '#efe9dc',
  Bone: '#e3dccb',
  Cream: '#ece4d2',
  Oat: '#ddd2bc',
  Stone: '#cabfa9',
  Camel: '#b08a5c',
  Tan: '#b48a60',
  Cognac: '#8a4f2b',
  Chestnut: '#6e4128',
  Mocha: '#5c4636',
  Olive: '#6b6a45',
  Forest: '#384534',
  Slate: '#5d6470',
  Storm: '#4a525a',
  Navy: '#26303f',
  Charcoal: '#363432',
  Plum: '#4a2f3a',
  Black: '#1a1a1a',
  'Off-black': '#222020',
};

const FALLBACK = '#8a857d';

export function colourHex(name: string): string {
  return COLOUR_HEX[name] ?? FALLBACK;
}
