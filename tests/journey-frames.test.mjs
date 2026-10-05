import test from 'node:test';
import assert from 'node:assert/strict';
import { journeyFrame } from '../lib/journey-frames.ts';

test('chapter framing remains subtle and bounded in either scroll direction', () => {
  for (let tick = -120; tick <= 120; tick++) {
    const frame = journeyFrame(tick / 100);
    assert.ok(Number.isFinite(frame.foregroundInset));
    assert.ok(frame.foregroundInset >= 0 && frame.foregroundInset <= 1.25);
    assert.ok(frame.panelEdge >= 40.5 && frame.panelEdge <= 43.5);
  }
});

test('media opens fully at rest and uses the same crop in both directions', () => {
  assert.equal(journeyFrame(0).foregroundInset, 0);
  for (let tick = 0; tick <= 100; tick++) {
    assert.equal(journeyFrame(tick / 100).foregroundInset, journeyFrame(-tick / 100).foregroundInset);
  }
});

test('reduced motion uses one stable shape and bad input cannot corrupt CSS', () => {
  assert.deepEqual(journeyFrame(-1, true), journeyFrame(1, true));
  assert.deepEqual(journeyFrame(1, true), journeyFrame(0));
  for (const invalid of [Number.NaN, Infinity, -Infinity]) {
    assert.deepEqual(journeyFrame(invalid), journeyFrame(0));
  }
});
