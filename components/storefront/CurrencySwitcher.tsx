'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCY_ORDER, CURRENCIES } from '@/config/currencies';
import type { CurrencyCode } from '@/types/currency';

// `variant="dark"` is for use on the black footer band; the default styling
// assumes the light `canvas` chrome it was originally built for (the header).
export function CurrencySwitcher({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { code, setCode } = useCurrency();
  const border = variant === 'dark' ? 'divide-canvas/20 border-canvas/20' : 'divide-hairline border-hairline';
  return (
    <div className={['inline-flex items-center divide-x border', border].join(' ')}>
      {CURRENCY_ORDER.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCode(c)}
          aria-pressed={code === c}
          className={[
            'h-8 px-3 text-[11px] uppercase tracking-[0.04em] transition-colors',
            code === c
              ? variant === 'dark'
                ? 'bg-canvas text-ground'
                : 'bg-ink text-canvas'
              : variant === 'dark'
                ? 'bg-transparent text-canvas/60 hover:text-canvas'
                : 'bg-transparent text-muted hover:text-ink',
          ].join(' ')}
          title={CURRENCIES[c].label}
        >
          {CURRENCIES[c].symbol} {(c as CurrencyCode)}
        </button>
      ))}
    </div>
  );
}
