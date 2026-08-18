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

// The equation redrawn as a node graph: ingredient nodes converge through
// a bus and trunk line into the final shot, instead of sitting in a flat
// "+ + =" row. Node/Connectors/Trunk are generic over ingredient count so
// the same graph serves the two-node (home) and three-node (apparel) case.
function Node({
  src,
  alt,
  tag,
  label,
  delayMs,
}: {
  src?: string;
  alt?: string;
  tag: string;
  label: string;
  delayMs: number;
}) {
  return (
    <div
      className="plate-in flex min-w-0 flex-1 flex-col items-center gap-1.5"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="relative aspect-[2/3] w-16 overflow-hidden border border-hairline bg-panel md:w-20">
        {src ? (
          <Image src={src} alt={alt ?? label} fill sizes="5rem" className="object-cover" />
        ) : null}
        <span className="absolute left-1 top-1 bg-canvas/80 px-1 font-mono text-[8px] text-ink">
          {tag}
        </span>
      </div>
      <span className="text-center text-[9px] uppercase tracking-[0.04em] text-muted">
        {label}
      </span>
    </div>
  );
}

// Each ingredient drops a stub to a shared bus, which necks into a single
// trunk — the graph reading of "these combine," in place of a plus sign.
function Connectors({ count, delayMs }: { count: number; delayMs: number }) {
  const inset = 50 / count;
  return (
    <div aria-hidden className="plate-in relative h-5" style={{ animationDelay: `${delayMs}ms` }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 h-1/2 w-px bg-hairline"
          style={{ left: `${((i + 0.5) / count) * 100}%` }}
        />
      ))}
      <span
        className="absolute top-1/2 h-px bg-hairline"
        style={{ left: `${inset}%`, right: `${inset}%` }}
      />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-accent" />
    </div>
  );
}

function Trunk({ delayMs }: { delayMs: number }) {
  return (
    <div aria-hidden className="plate-in relative h-4" style={{ animationDelay: `${delayMs}ms` }}>
      <span className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-accent" />
    </div>
  );
}

export function PipelineDossier({
  product,
  shots,
  modelPortraitSrc,
  onClose,
}: {
  product: Product;
  shots: GalleryShot[];
  modelPortraitSrc?: string;
  onClose: () => void;
}) {
  const { code } = useCurrency();
  const copy = COPY.pipeline;
  const isHome = product.category === 'home';
  const sub = isHome ? copy.subHome : copy.subApparel;
  const figures = generationFigures(product);
  const hero = shots.find((s) => s.exists);
  // Equation ingredients: an on-model frame, the ghost-garment reference,
  // and the seamless warm paper (the panel token — that IS the backdrop).
  // Home has no model or mannequin shot — the packshot stands in as the
  // object reference instead.
  const modelShot =
    shots.find(
      (s) => s.exists && (s.shotType === 'editorial' || s.shotType === 'mid-crop'),
    ) ?? hero;
  const mannequinSrc = hero?.refSrc;
  const assetId =
    hero?.assetCode ?? `${product.code}_${product.colourCode}_01`;

  const nodes: Array<{ tag: string; src?: string; alt?: string; label: string }> = isHome
    ? [
        { tag: '01', src: hero?.src, alt: hero?.alt, label: copy.equation.object },
        { tag: '02', label: copy.equation.backdrop },
      ]
    : [
        {
          tag: '01',
          src: modelPortraitSrc ?? modelShot?.src,
          alt: product.modelName ? `${product.modelName} — reference portrait` : modelShot?.alt,
          label: product.modelName
            ? `${copy.equation.model} — ${product.modelName}`
            : copy.equation.model,
        },
        {
          tag: '02',
          src: mannequinSrc,
          alt: `${product.name} — ghost garment reference`,
          label: copy.equation.mannequin,
        },
        { tag: '03', label: copy.equation.backdrop },
      ];
  const outputTag = String(nodes.length + 1).padStart(2, '0');

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
          <div className="flex gap-2 md:gap-3">
            {nodes.map((n, i) => (
              <Node key={n.tag} {...n} delayMs={i * 300} />
            ))}
          </div>

          <Connectors count={nodes.length} delayMs={nodes.length * 300} />
          <Trunk delayMs={nodes.length * 300 + 200} />

          <p
            className="plate-in text-center text-[9px] uppercase tracking-[0.04em] text-muted"
            style={{ animationDelay: `${nodes.length * 300 + 350}ms` }}
          >
            {outputTag} — {copy.equation.final}
          </p>

          <div className="relative mt-1.5 aspect-[2/3] w-full overflow-hidden bg-panel">
            {hero ? (
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                quality={90}
                sizes="(min-width: 768px) 380px, 100vw"
                className="shot-resolve object-cover"
                style={{ animationDelay: `${nodes.length * 300 + 500}ms` }}
              />
            ) : null}
            <div className="pixel-field absolute inset-0 flex flex-col justify-between bg-canvas/60 p-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.04em] text-ink">
                  <span className="font-mono text-muted">{outputTag} · </span>
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
          <p className="mt-3 text-sm leading-relaxed text-muted">{sub}</p>

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
