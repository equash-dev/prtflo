'use client';

import { PIPELINE } from '@/config/pipeline';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/pricing';

// The pipeline-view cost line: what this frame cost to generate against
// its studio equivalent, restyled by the currency switcher like any price.
export function AssetCostBadge() {
  const { code } = useCurrency();
  return (
    <p className="text-[10px] uppercase tracking-[0.04em] text-ink">
      <span className="tabular-nums">
        {formatPrice(PIPELINE.generationCostGBP, code, { decimals: 2 })}
      </span>{' '}
      to generate
      <span className="mx-2 text-muted">·</span>
      <span className="text-muted">
        studio equivalent{' '}
        <span className="tabular-nums">
          {formatPrice(PIPELINE.studioShotCostGBP, code)}
        </span>
      </span>
    </p>
  );
}
