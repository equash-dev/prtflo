'use client';

import { usePipeline } from '@/context/PipelineContext';

// The house disclosure switch. `tone` retunes it for the dark landing page,
// where the storefront's hairline and muted tokens all but disappear.
export function PipelineToggle({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { pipeline, toggle } = usePipeline();

  const surface =
    tone === 'dark'
      ? pipeline
        ? 'border-canvas bg-canvas text-ground'
        : 'border-canvas/30 bg-transparent text-canvas/60 hover:text-canvas'
      : pipeline
        ? 'border-ink bg-ink text-canvas'
        : 'border-hairline bg-transparent text-muted hover:text-ink';

  const dot =
    tone === 'dark'
      ? pipeline
        ? 'bg-ground'
        : 'bg-canvas/30'
      : pipeline
        ? 'bg-canvas'
        : 'bg-hairline';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={pipeline}
      title="Reveal what every image really is"
      className={[
        'inline-flex h-8 items-center gap-2 border px-3 text-[11px] uppercase tracking-[0.04em] transition-colors',
        surface,
      ].join(' ')}
    >
      Workflow
      <span className={['h-1.5 w-1.5 rounded-full', dot].join(' ')} aria-hidden />
    </button>
  );
}
