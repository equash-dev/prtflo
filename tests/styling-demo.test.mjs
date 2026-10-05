import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { DEMO_LOOKS, STYLING_GROUPS, STYLING_OUTPUTS } from '../config/batch-demo.ts';
import { matchingOutput, outputAssets, stylingCategories } from '../lib/styling-demo.ts';

test('changing any part of a brief never returns the previous outfit result', () => {
  const output = STYLING_OUTPUTS[0];
  for (const key of stylingCategories) {
    assert.equal(matchingOutput({ ...output.selection, [key]: 'not-supplied' }, STYLING_OUTPUTS), undefined);
  }
});

test('pose choice selects its own saved primary image', () => {
  for (const look of DEMO_LOOKS) {
    const relaxed = matchingOutput(look.styling, STYLING_OUTPUTS);
    const editorial = matchingOutput({ ...look.styling, pose: 'editorial' }, STYLING_OUTPUTS);
    assert.ok(relaxed && editorial);
    assert.notEqual(relaxed.primary, editorial.primary);
    assert.equal(relaxed.back, editorial.back);
  }
});

test('every preset has valid wardrobe choices and all saved assets exist', () => {
  for (const output of STYLING_OUTPUTS) {
    for (const group of STYLING_GROUPS) assert.ok(group.options.some((option) => option.id === output.selection[group.id]));
    for (const asset of outputAssets(output)) assert.ok(existsSync(new URL('../public' + asset, import.meta.url)), asset);
  }
  for (const group of STYLING_GROUPS) for (const option of group.options) {
    if (option.image) assert.ok(existsSync(new URL('../public' + option.image, import.meta.url)), option.image);
  }
});

test('delivery exports the selected pose and does not duplicate files', () => {
  const output = STYLING_OUTPUTS[1];
  const files = outputAssets({ ...output, derivatives: [...output.derivatives, output.primary] });
  assert.equal(files[0], output.primary);
  assert.equal(files.length, new Set(files).size);
});

test('every offered primary view has an existing complete shot set and styling reference', () => {
  const views = STYLING_GROUPS.find((group) => group.id === 'pose').options;
  for (const look of DEMO_LOOKS) {
    assert.ok(look.wornWith.length > 0);
    assert.ok(existsSync(new URL('../public' + look.stylingReference, import.meta.url)));
    for (const view of views) {
      const output = matchingOutput({ ...look.styling, pose: view.id }, STYLING_OUTPUTS);
      assert.ok(output, `${look.id}: ${view.id} must not strand the indicative pipeline`);
      assert.ok(outputAssets(output).includes(look.stylingReference));
      assert.ok(outputAssets(output).every((asset) => asset.startsWith('/products/')));
    }
  }
});
