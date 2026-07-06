'use client';

import { usePipeline } from '@/context/PipelineContext';

export function PipelineToggle() {
  const { pipeline, toggle } = usePipeline();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={pipeline}
      title="Reveal what every image really is"
      className={[
        'inline-flex h-8 items-center gap-2 border px-3 text-[11px] uppercase tracking-[0.04em] transition-colors',
        pipeline
          ? 'border-ink bg-ink text-canvas'
          : 'border-hairline bg-transparent text-muted hover:text-ink',
      ].join(' ')}
    >
      Pipeline
      <span
        className={[
          'h-1.5 w-1.5 rounded-full',
          pipeline ? 'bg-canvas' : 'bg-hairline',
        ].join(' ')}
        aria-hidden
      />
    </button>
  );
}
