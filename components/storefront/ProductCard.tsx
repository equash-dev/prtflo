'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Product } from '@/types/product';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/pricing';
import { PipelineOverlay } from './PipelineOverlay';

export function ProductCard({ product }: { product: Product }) {
  const { code } = useCurrency();
  // The hover-swap frame can never show on touch devices, so don't make
  // them download it — it doubles the grid's image payload otherwise.
  const [hoverCapable, setHoverCapable] = useState(false);
  useEffect(() => {
    setHoverCapable(window.matchMedia('(hover: hover)').matches);
  }, []);
  const colours = product.colours ?? [];
  const href = `/product/${product.slug}`;
  const [primary, secondary] = product.images;
  const assetId =
    primary?.assetCode ??
    `${product.code}_${product.colourCode}_01`;

  return (
    <div className="group">
      <Link href={href} prefetch={false} className="block">
        <div className="grain relative aspect-[2/3] overflow-hidden bg-panel transition-colors duration-500 group-hover:bg-selected">
          {primary ? (
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className={[
                'object-cover',
                secondary && hoverCapable
                  ? 'transition-opacity duration-500 group-hover:opacity-0'
                  : '',
              ].join(' ')}
            />
          ) : null}
          {secondary && hoverCapable ? (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          ) : null}
          {product.isNew ? (
            <span className="absolute right-3 top-3 text-[10px] uppercase tracking-[0.04em] text-muted">
              New
            </span>
          ) : null}
          <PipelineOverlay assetId={assetId} shotType={primary?.shotType} />
        </div>
      </Link>

      <div className="mt-2 flex items-start justify-between gap-2">
        <Link href={href} prefetch={false} className="min-w-0 flex-1">
          <h3 className="truncate text-[12px] text-accent">{product.name}</h3>
        </Link>
        <p className="shrink-0 text-[12px] tabular-nums text-ink">
          {formatPrice(product.basePriceGBP, code)}
        </p>
      </div>

      {colours.length > 1 ? (
        <p className="mt-0.5 text-[11px] text-muted">{colours.length} Colours</p>
      ) : null}
    </div>
  );
}
