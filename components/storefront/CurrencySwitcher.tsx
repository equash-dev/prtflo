'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCY_ORDER, CURRENCIES } from '@/config/currencies';
import type { CurrencyCode } from '@/types/currency';

export function CurrencySwitcher() {
  const { code, setCode } = useCurrency();
  return (
    <div className="inline-flex items-center divide-x divide-hairline border border-hairline">
      {CURRENCY_ORDER.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCode(c)}
          aria-pressed={code === c}
          className={[
            'h-8 px-3 text-[11px] uppercase tracking-[0.04em] transition-colors',
            code === c
              ? 'bg-ink text-canvas'
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
