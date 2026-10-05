export type StylingCategory = 'top' | 'bottom' | 'footwear' | 'pose' | 'model';
export type StylingSelection = Record<StylingCategory, string>;
export interface StyledOutput {
  selection: StylingSelection;
  primary: string;
  back: string;
  derivatives: string[];
}

export const stylingCategories: StylingCategory[] = ['top', 'bottom', 'footwear', 'pose', 'model'];

// A partial or approximate match must never show an unrelated generated image.
export function matchingOutput(selection: StylingSelection, outputs: StyledOutput[]): StyledOutput | undefined {
  return outputs.find((output) => stylingCategories.every((key) => output.selection[key] === selection[key]));
}

export function outputAssets(output: StyledOutput): string[] {
  return [...new Set([output.primary, output.back, ...output.derivatives])];
}
