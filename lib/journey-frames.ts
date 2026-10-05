// Subtle movement of the chapter's media frame and editorial edge.
export function journeyFrame(distance: number, reducedMotion = false) {
  const delta = reducedMotion ? 0 : Math.max(-1, Math.min(1, Number.isFinite(distance) ? distance : 0));
  const amount = Math.abs(delta);
  const ease = amount * amount * (3 - 2 * amount);
  return {
    foregroundInset: ease * 1.25,
    panelEdge: 42 + delta * 1.5,
  };
}
