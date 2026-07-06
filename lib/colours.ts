const COLOUR_HEX: Record<string, string> = {
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
