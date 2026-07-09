'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PRODUCT_MAP } from '@/config/products';
import { COPY } from '@/config/copy';
import { useBasket, type BasketLine } from '@/context/BasketContext';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/pricing';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types/product';

// The basket plays it straight — real lines, real quantities, prices
// through the currency system. The disclosure belongs to /checkout,
// not here.

function LineThumb({ product }: { product: Product }) {
  const [broken, setBroken] = useState(false);
  const src = product.images[0]?.src;
  return (
    <div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden bg-panel md:w-24">
      {src && !broken ? (
        <Image
          src={src}
          alt={product.images[0].alt}
          fill
          sizes="6rem"
          className="object-cover"
          onError={() => setBroken(true)}
        />
      ) : null}
    </div>
  );
}

function QtyStepper({
  line,
  onChange,
}: {
  line: BasketLine;
  onChange: (qty: number) => void;
}) {
  const control =
    'flex h-8 w-8 items-center justify-center border border-hairline text-ink transition-colors hover:border-ink';
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(line.qty - 1)}
        className={control}
      >
        −
      </button>
      <span className="min-w-[1.5rem] text-center text-[12px] tabular-nums text-ink">
        {line.qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(line.qty + 1)}
        className={control}
      >
        +
      </button>
    </div>
  );
}

export function BasketView() {
  const { lines, setQty, remove } = useBasket();
  const { code } = useCurrency();
  const copy = COPY.basket;

  const entries = lines
    .map((line) => ({ line, product: PRODUCT_MAP[line.slug] }))
    .filter((e): e is { line: BasketLine; product: Product } =>
      Boolean(e.product),
    );

  const subtotalGBP = entries.reduce(
    (sum, { line, product }) => sum + product.basePriceGBP * line.qty,
    0,
  );

  if (entries.length === 0) {
    return (
      <section className="flex flex-col items-center px-4 py-28 text-center md:px-10">
        <p className="text-[12px] uppercase tracking-[0.04em] text-muted">
          {copy.empty}
        </p>
        <Link
          href="/collection"
          className="mt-4 text-[12px] uppercase tracking-[0.04em] text-ink underline underline-offset-4 transition-opacity hover:opacity-60"
        >
          {copy.emptyCta}
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 md:px-10 md:py-10">
      <h1 className="text-[12px] uppercase tracking-[0.04em] text-ink">
        {copy.title}
      </h1>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.7fr_minmax(320px,1fr)] lg:gap-12">
        <ul className="border-t border-hairline">
          {entries.map(({ line, product }) => (
            <li
              key={[line.slug, line.size, line.colour].join('|')}
              className="flex gap-4 border-b border-hairline py-5 md:gap-6"
            >
              <Link href={`/product/${product.slug}`} className="shrink-0">
                <LineThumb product={product} />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-[12px] uppercase tracking-[0.04em] text-ink transition-opacity hover:opacity-60"
                  >
                    {product.name}
                  </Link>
                  <span className="text-[13px] tabular-nums text-ink">
                    {formatPrice(product.basePriceGBP * line.qty, code)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-[0.04em] text-muted">
                  {[line.colour, line.size].filter(Boolean).join(' — ')}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <QtyStepper line={line} onChange={(qty) => setQty(line, qty)} />
                  <button
                    type="button"
                    onClick={() => remove(line)}
                    className="text-[11px] uppercase tracking-[0.04em] text-muted underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="self-start lg:sticky lg:top-20">
          <dl className="border-t border-hairline">
            <div className="flex items-baseline justify-between border-b border-hairline py-3">
              <dt className="text-[11px] uppercase tracking-[0.04em] text-muted">
                {copy.subtotalLabel}
              </dt>
              <dd className="text-[13px] tabular-nums text-ink">
                {formatPrice(subtotalGBP, code)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-b border-hairline py-3">
              <dt className="text-[11px] uppercase tracking-[0.04em] text-muted">
                {copy.deliveryLabel}
              </dt>
              <dd className="text-[11px] uppercase tracking-[0.04em] text-ink">
                {copy.deliveryValue}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-b border-hairline py-3">
              <dt className="text-[11px] uppercase tracking-[0.04em] text-ink">
                {copy.totalLabel}
              </dt>
              <dd className="text-[13px] tabular-nums text-ink">
                {formatPrice(subtotalGBP, code)}
              </dd>
            </div>
          </dl>
          <Button size="lg" href="/checkout" className="mt-6 w-full">
            {copy.checkoutLabel}
          </Button>
          <p className="mt-4 text-[11px] leading-relaxed text-muted">
            {copy.reassurance}
          </p>
        </div>
      </div>
    </section>
  );
}
