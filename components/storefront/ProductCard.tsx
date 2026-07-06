'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/pricing';
import { colourHex } from '@/lib/colours';

export function ProductCard({ product }: { product: Product }) {
  const { code } = useCurrency();
  const colours = product.colours ?? [];
  const href = `/product/${product.slug}`;
  const [primary, secondary] = product.images;

  return (
    <div className="group">
      <Link href={href} prefetch={false} className="block">
        <div className="relative aspect-[2/3] overflow-hidden bg-panel transition-colors duration-500 group-hover:bg-selected">
          {primary ? (
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className={[
                'object-cover',
                secondary
                  ? 'transition-opacity duration-500 group-hover:opacity-0'
                  : '',
              ].join(' ')}
            />
          ) : null}
          {secondary ? (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
          {product.isNew ? (
            <span className="absolute right-3 top-3 text-[10px] uppercase tracking-[0.04em] text-muted">
              New
            </span>
          ) : null}
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-2">
        <Link href={href} prefetch={false} className="min-w-0 flex-1">
          <h3 className="truncate text-[11px] uppercase tracking-[0.04em] text-ink">
            {product.name}
          </h3>
        </Link>
        <Link
          href={href}
          prefetch={false}
          aria-label={`View ${product.name}`}
          className="-mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-ink transition-opacity hover:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Link>
      </div>

      <p className="mt-1 text-[11px] tabular-nums text-ink">
        {formatPrice(product.basePriceGBP, code)}
      </p>

      {colours.length > 0 ? (
        <div className="mt-2 flex items-center gap-1.5">
          {colours.map((c) => (
            <span
              key={c}
              title={c}
              aria-label={c}
              className="h-2.5 w-2.5 border border-hairline"
              style={{ backgroundColor: colourHex(c) }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
