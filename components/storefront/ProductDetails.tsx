'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '@/types/product';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/pricing';
import { colourHex } from '@/lib/colours';
import { Button } from '@/components/ui/Button';

function Accordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-hairline">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[12px] uppercase tracking-[0.04em] text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 text-muted transition-transform duration-200 group-open:rotate-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </summary>
      <div className="pb-5 text-sm leading-relaxed text-muted">{children}</div>
    </details>
  );
}

export function ProductDetails({ product }: { product: Product }) {
  const { code } = useCurrency();
  const [size, setSize] = useState<string | null>(
    product.sizes?.find((s) => s.inStock)?.label ?? null,
  );
  const [colour, setColour] = useState<string | null>(
    product.colours?.[0] ?? null,
  );
  const [disclosed, setDisclosed] = useState(false);

  return (
    <div className="flex flex-col">
      <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
        {product.category}
      </p>
      <h1 className="mt-2 text-[15px] font-normal uppercase tracking-[0.04em] text-ink">
        {product.name}
      </h1>
      <p className="mt-2 text-[13px] tabular-nums text-ink">
        {formatPrice(product.basePriceGBP, code)}
      </p>

      <hr className="mt-6 border-hairline" />

      {product.colours?.length ? (
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
            Colour{colour ? <span className="text-ink"> — {colour}</span> : null}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colours.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColour(c)}
                title={c}
                aria-label={c}
                aria-pressed={colour === c}
                className={[
                  'h-8 w-8 border border-hairline transition-shadow',
                  colour === c
                    ? 'outline outline-1 outline-offset-2 outline-ink'
                    : 'hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-hairline',
                ].join(' ')}
                style={{ backgroundColor: colourHex(c) }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {product.sizes?.length ? (
        <div className="mt-6">
          <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
            Size{size ? <span className="text-ink"> — {size}</span> : null}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                type="button"
                disabled={!s.inStock}
                onClick={() => setSize(s.label)}
                className={[
                  'flex h-11 min-w-[3rem] items-center justify-center border px-3 text-[11px] uppercase tracking-[0.04em] transition-colors',
                  !s.inStock
                    ? 'cursor-not-allowed border-hairline text-muted line-through'
                    : size === s.label
                      ? 'border-ink bg-selected text-ink'
                      : 'border-hairline text-ink hover:border-ink',
                ].join(' ')}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t border-hairline bg-canvas px-4 py-3 lg:static lg:z-auto lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0">
        <div className="flex gap-2">
          <Button
            size="lg"
            type="button"
            className="flex-1"
            onClick={() => setDisclosed(true)}
          >
            Add to basket
          </Button>
          <Button
            size="lg"
            variant="secondary"
            type="button"
            className="flex-1"
            onClick={() => setDisclosed(true)}
          >
            Find in store
          </Button>
        </div>
        <p aria-live="polite" className="text-[11px] uppercase tracking-[0.04em] text-muted">
          {disclosed ? (
            <span className="mt-3 block">
              This house does not sell. Every piece exists only as generated
              images.
            </span>
          ) : null}
        </p>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-ink">
        {product.description}
      </p>

      <div className="mt-8">
        {product.composition || product.care ? (
          <Accordion title="Composition & care">
            {product.composition ? <p>{product.composition}</p> : null}
            {product.care ? (
              <p className={product.composition ? 'mt-2' : undefined}>
                {product.care}
              </p>
            ) : null}
          </Accordion>
        ) : null}
        <Accordion title="Shipping & returns">
          <p>Complimentary delivery and 30-day returns on every order.</p>
        </Accordion>
      </div>
    </div>
  );
}
