'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Product } from '@/types/product';
import type { GalleryShot } from '@/lib/images';
import { COPY } from '@/config/copy';
import { PIPELINE } from '@/config/pipeline';
import { generationFigures } from '@/lib/generation';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/pricing';

// The PIPELINE button on the PDP opens this: the shoot that never
// happened, staged as an equation — model + mannequin + backdrop
// assembling into the final shot — beside the honest ledger of what
// the piece's imagery took to make.

function Plate({
  src,
  alt,
  label,
  delayMs,
}: {
  src?: string;
  alt?: string;
  label: string;
  delayMs: number;
}) {
  return (
    <div
      className="plate-in flex min-w-0 flex-col gap-1.5"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="relative aspect-[2/3] w-16 overflow-hidden border border-hairline bg-panel md:w-20">
        {src ? (
          <Image src={src} alt={alt ?? label} fill sizes="5rem" className="object-cover" />
        ) : null}
      </div>
      <span className="text-[9px] uppercase tracking-[0.04em] text-muted">
        {label}
      </span>
    </div>
  );
}

function Operator({ delayMs }: { delayMs: number }) {
  return (
    <span
      aria-hidden
      className="plate-in pb-5 text-sm font-light text-muted"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      +
    </span>
  );
}

export function PipelineDossier({
  product,
  shots,
  onClose,
}: {
  product: Product;
  shots: GalleryShot[];
  onClose: () => void;
}) {
  const { code } = useCurrency();
  const copy = COPY.pipeline;
  const figures = generationFigures(product);
  const hero = shots.find((s) => s.exists);
  // Equation ingredients: an on-model frame, the ghost-garment reference,
  // and the seamless warm paper (the panel token — that IS the backdrop).
  const modelShot =
    shots.find(
      (s) => s.exists && (s.shotType === 'editorial' || s.shotType === 'mid-crop'),
    ) ?? hero;
  const mannequinSrc = hero?.refSrc;
  const assetId =
    hero?.assetCode ?? `${product.code}_${product.colourCode}_01`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const rows: Array<{ label: string; value: string; note?: string }> = [
    {
      label: copy.labels.frames,
      value: String(figures.frames).padStart(2, '0'),
    },
    {
      label: copy.labels.attempts,
      value: String(figures.attempts).padStart(2, '0'),
      note: `${figures.discarded} discarded, ${figures.frames} kept`,
    },
    {
      label: copy.labels.time,
      value: `~${figures.minutes} min`,
    },
    {
      label: copy.labels.costPerAttempt,
      value: formatPrice(PIPELINE.generationCostGBP, code, { decimals: 2 }),
    },
    {
      label: copy.labels.total,
      value: formatPrice(figures.costGBP, code, { decimals: 2 }),
    },
    {
      label: copy.labels.studio,
      value: formatPrice(figures.studioGBP, code),
      note: `${figures.frames} frames at a studio day rate`,
    },
  ];

  // Portalled to <body>: the PDP info rail is position:sticky, which forms
  // a stacking context that would trap this dialog under the z-40 header.
  return createPortal(
    <div
      role="dialog"
      aria-modal
      aria-label={`${copy.eyebrow} — ${product.name}`}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <span className="text-[10px] uppercase tracking-[0.04em] text-muted">
          {copy.eyebrow}
        </span>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>

      <div className="grid flex-1 gap-8 px-4 pb-10 md:px-6 lg:grid-cols-2 lg:gap-12">
        {/* The shoot that never happened, assembling. */}
        <div className="mx-auto w-full max-w-[340px] self-start md:max-w-[380px] lg:ml-auto lg:mr-0">
          <div className="flex items-center gap-2 md:gap-3">
            <Plate
              src={modelShot?.src}
              alt={modelShot?.alt}
              label={copy.equation.model}
              delayMs={0}
            />
            <Operator delayMs={250} />
            <Plate
              src={mannequinSrc}
              alt={`${product.name} — ghost garment reference`}
              label={copy.equation.mannequin}
              delayMs={450}
            />
            <Operator delayMs={700} />
            <Plate label={copy.equation.backdrop} delayMs={900} />
          </div>

          <p
            className="plate-in mt-5 text-[10px] uppercase tracking-[0.04em] text-muted"
            style={{ animationDelay: '1200ms' }}
          >
            = {copy.equation.final}
          </p>

          <div className="relative mt-2 aspect-[2/3] w-full overflow-hidden bg-panel">
            {hero ? (
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                quality={90}
                sizes="(min-width: 768px) 380px, 100vw"
                className="shot-resolve object-cover"
                style={{ animationDelay: '1500ms' }}
              />
            ) : null}
            <div className="pixel-field absolute inset-0 flex flex-col justify-between bg-canvas/60 p-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.04em] text-ink">
                  {PIPELINE.line}
                </p>
                <p className="mt-1 font-mono text-[10px] leading-relaxed text-muted">
                  {assetId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The ledger. */}
        <div className="flex max-w-md flex-col lg:justify-center">
          <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
            {product.name}
          </p>
          <h2 className="mt-3 text-xl font-light uppercase tracking-[0.02em] text-ink md:text-2xl">
            {copy.heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.sub}</p>

          <dl className="mt-8">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-t border-hairline py-3"
              >
                <dt className="text-[11px] uppercase tracking-[0.04em] text-muted">
                  {row.label}
                </dt>
                <dd className="text-right">
                  <span className="text-[13px] tabular-nums text-ink">
                    {row.value}
                  </span>
                  {row.note ? (
                    <span className="mt-0.5 block text-[10px] uppercase tracking-[0.04em] text-muted">
                      {row.note}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <p className="border-t border-hairline pt-4 text-[11px] uppercase tracking-[0.04em] text-muted">
            {copy.closingLine}
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.04em] text-muted">
            {figures.logged ? copy.footnoteLogged : copy.footnoteAverage}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
