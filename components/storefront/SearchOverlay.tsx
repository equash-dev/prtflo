'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/config/products';
import { CATEGORY_MAP } from '@/config/categories';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/pricing';

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const { code } = useCurrency();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const q = query.trim().toLowerCase();
  const results = q
    ? PRODUCTS.filter((p) =>
        [p.name, p.shortDescription, p.category]
          .join(' ')
          .toLowerCase()
          .includes(q),
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-canvas" role="dialog" aria-label="Search">
      <div className="flex items-center gap-4 border-b border-hairline px-4 py-4 md:px-10">
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the collection"
          aria-label="Search the collection"
          className="h-10 w-full min-w-0 border-0 bg-transparent text-base uppercase tracking-[0.04em] text-ink placeholder:normal-case placeholder:text-muted focus:outline-none"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-10">
        {q && results.length === 0 ? (
          <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
            Nothing in the house matches that.
          </p>
        ) : null}
        <ul className="divide-y divide-hairline">
          {results.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/product/${p.slug}`}
                onClick={onClose}
                className="flex items-baseline justify-between gap-4 py-4 transition-opacity hover:opacity-60"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[12px] uppercase tracking-[0.04em] text-ink">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.04em] text-muted">
                    {CATEGORY_MAP[p.category].name}
                  </span>
                </span>
                <span className="shrink-0 text-[12px] tabular-nums text-ink">
                  {formatPrice(p.basePriceGBP, code)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
