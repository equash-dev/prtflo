'use client';

import { usePipeline } from '@/context/PipelineContext';

// Bottom label for the department tiles on the collection front. Client
// because the tone flips with what's behind it: light on a scrim over a
// spot photo (spot content is arbitrary — ink can't be trusted to read),
// ink on the bare panel fallback, and ink again above the dossier's
// canvas wash when pipeline mode covers the tile — there the scrim
// stands down and the label sits at z-20 so the wash doesn't ghost it.
export function SpotLabel({
  name,
  hasImage,
}: {
  name: string;
  hasImage: boolean;
}) {
  const { pipeline } = usePipeline();
  const light = hasImage && !pipeline;
  return (
    <>
      {light ? (
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/55 to-transparent" />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-5">
        <span
          className={`text-[12px] uppercase tracking-[0.04em] ${light ? 'text-canvas' : 'text-ink'}`}
        >
          {name}
        </span>
        <span
          className={`text-[11px] uppercase tracking-[0.04em] transition-colors ${light ? 'text-canvas/70 group-hover:text-canvas' : 'text-muted group-hover:text-ink'}`}
        >
          View
        </span>
      </div>
    </>
  );
}
