'use client';

import { usePipeline } from '@/context/PipelineContext';

// The ground under the landing page: a slow colour drift while the house is
// playing it straight, draining to greyscale when WORKFLOW goes on. The
// whole state change is one CSS filter, so there is no second layer to
// crossfade and nothing to keep in sync.
//
// Client-only for usePipeline. Pipeline state arrives from localStorage
// after first paint, so a returning visitor sees the colour drain once on
// arrival rather than the page rendering mono from the start.
export function AtmosphereLayer() {
  const { pipeline } = usePipeline();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 select-none"
    >
      <div
        className="atmos-glow absolute inset-[-30%]"
        data-on={pipeline ? 'true' : 'false'}
      />
    </div>
  );
}
