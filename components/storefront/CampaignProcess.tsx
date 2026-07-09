'use client';

import { CAMPAIGN_SPOTS } from '@/config/campaign';
import { PIPELINE } from '@/config/pipeline';
import { useCurrency } from '@/context/CurrencyContext';
import { usePipeline } from '@/context/PipelineContext';
import { formatPrice } from '@/lib/pricing';

// The campaign counterpart to PipelineOverlay. Where product slots admit
// an asset id and a cost, a campaign banner or spot discloses its creative
// record: concept, the making of it in order, then the arithmetic last.
// pointer-events-none so the surface underneath keeps working.
export function CampaignProcess({ id }: { id: string }) {
  const { pipeline } = usePipeline();
  const { code } = useCurrency();
  const spot = CAMPAIGN_SPOTS[id];
  if (!pipeline || !spot) return null;

  const compact = spot.kind === 'spot';
  const costGBP = spot.attempts * PIPELINE.generationCostGBP;
  const studioGBP =
    spot.studioEquivalentGBP ?? spot.selects * PIPELINE.studioShotCostGBP;
  const figures = [
    `${String(spot.attempts).padStart(2, '0')} passes`,
    `${String(spot.selects).padStart(2, '0')} kept`,
    `~${spot.minutes} min`,
  ].join(' · ');

  return (
    <div
      aria-hidden
      className={[
        'pixel-field pointer-events-none absolute inset-0 z-10 flex flex-col bg-canvas/70',
        compact ? 'p-3' : 'p-4 md:p-6',
      ].join(' ')}
    >
      <p className="text-[10px] uppercase tracking-[0.04em] text-ink">
        {PIPELINE.line}
      </p>
      <p className="mt-1 font-mono text-[10px] leading-relaxed text-muted">
        {spot.id} · {spot.placement}
      </p>

      <p
        className={[
          'mt-3 text-[11px] leading-relaxed text-ink',
          compact ? 'max-w-[36ch]' : 'max-w-[44ch]',
        ].join(' ')}
      >
        {spot.concept}
      </p>

      <ol className={compact ? 'mt-3' : 'mt-4 max-w-[52ch]'}>
        {spot.process.map((step, i) => (
          <li
            key={step.stage}
            className="flex items-baseline gap-3 border-t border-hairline py-2"
          >
            <span className="font-mono text-[10px] tabular-nums text-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-[0.04em] text-ink">
              {step.stage}
            </span>
            <span
              className={[
                'min-w-0 text-[10px] leading-relaxed text-muted',
                compact ? '' : 'text-[11px]',
              ].join(' ')}
            >
              {step.detail}
            </span>
          </li>
        ))}
      </ol>

      {/* Flows under the steps rather than pinning to the slot's bottom —
          banners keep their own copy block down there, tiles their label. */}
      <div className="pt-3">
        <p className="text-[10px] uppercase tracking-[0.04em] text-muted">
          {figures}
        </p>
        {spot.attempts > 0 ? (
          <p className="mt-1 text-[10px] uppercase tracking-[0.04em] text-ink">
            <span className="tabular-nums">
              {formatPrice(costGBP, code, { decimals: 2 })}
            </span>{' '}
            to generate
            <span className="mx-2 text-muted">·</span>
            <span className="text-muted">
              studio equivalent{' '}
              <span className="tabular-nums">
                {formatPrice(studioGBP, code)}
              </span>
            </span>
          </p>
        ) : (
          <p className="mt-1 text-[10px] uppercase tracking-[0.04em] text-muted">
            {formatPrice(0, code, { decimals: 2 })} to generate · nothing replaced
          </p>
        )}
      </div>
    </div>
  );
}
