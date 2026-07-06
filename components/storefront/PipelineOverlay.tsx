'use client';

import { PIPELINE } from '@/config/pipeline';
import { usePipeline } from '@/context/PipelineContext';
import { AssetCostBadge } from './AssetCostBadge';

// Sits over any image slot. Renders nothing while the store keeps its
// composure; when the PIPELINE toggle is on it discloses what the frame
// really is. pointer-events-none so links and drags underneath still work.
export function PipelineOverlay({
  assetId,
  shotType,
}: {
  assetId: string;
  shotType?: string;
}) {
  const { pipeline } = usePipeline();
  if (!pipeline) return null;

  return (
    <div
      aria-hidden
      className="pixel-field pointer-events-none absolute inset-0 z-10 flex flex-col justify-between bg-canvas/70 p-3"
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.04em] text-ink">
          {PIPELINE.line}
        </p>
        <p className="mt-1 font-mono text-[10px] leading-relaxed text-muted">
          {assetId}
          {shotType ? ` · ${shotType}` : ''}
        </p>
      </div>
      <AssetCostBadge />
    </div>
  );
}
