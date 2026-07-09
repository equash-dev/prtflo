'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PRODUCT_MAP } from '@/config/products';
import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';
import { useBasket, type BasketLine } from '@/context/BasketContext';
import { useCurrency } from '@/context/CurrencyContext';
import { formatPrice } from '@/lib/pricing';
import { generationFigures } from '@/lib/generation';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types/product';

// The checkout is the funnel. It plays it straight — order summary,
// delivery details — right up to the payment step, where the house
// discloses and the order becomes the pitch. Nothing is submitted
// anywhere; the form exists to be believed.

type Step = 'delivery' | 'processing' | 'reveal';

const label = 'text-[11px] uppercase tracking-[0.04em] text-muted';
// 16px on touch widths — anything smaller makes iOS Safari zoom the page
// when the field takes focus.
const field =
  'h-11 w-full border border-hairline bg-transparent px-3 text-base md:text-[13px] text-ink placeholder:text-muted focus:border-ink focus:outline-none';

function StepRail({ step }: { step: Step }) {
  const copy = COPY.checkout;
  const current = step === 'delivery' ? 1 : 2;
  return (
    <ol className="flex flex-wrap gap-x-6 gap-y-1">
      {copy.steps.map((title, i) => {
        const isPayment = i === 2;
        const disclosed = isPayment && step === 'reveal';
        return (
          <li
            key={title}
            className={[
              'text-[11px] uppercase tracking-[0.04em]',
              i === current ? 'text-ink' : 'text-muted',
            ].join(' ')}
          >
            <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>{' '}
            {disclosed ? (
              <>
                <s>{title}</s> {copy.reveal.stepLabel}
              </>
            ) : (
              title
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function CheckoutFunnel() {
  const { lines } = useBasket();
  const { code } = useCurrency();
  const copy = COPY.checkout;
  const [step, setStep] = useState<Step>('delivery');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (step !== 'processing') return;
    const timer = window.setTimeout(() => setStep('reveal'), 1400);
    return () => window.clearTimeout(timer);
  }, [step]);

  const entries = lines
    .map((line) => ({ line, product: PRODUCT_MAP[line.slug] }))
    .filter((e): e is { line: BasketLine; product: Product } =>
      Boolean(e.product),
    );

  if (entries.length === 0 && step === 'delivery') {
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

  const orderGBP = entries.reduce(
    (sum, { line, product }) => sum + product.basePriceGBP * line.qty,
    0,
  );
  // Imagery is made once per piece, however many units are "ordered".
  const distinct = [...new Map(entries.map((e) => [e.product.slug, e.product])).values()];
  const imageryGBP = distinct.reduce(
    (sum, p) => sum + generationFigures(p).costGBP,
    0,
  );
  const studioGBP = distinct.reduce(
    (sum, p) => sum + generationFigures(p).studioGBP,
    0,
  );

  const firstName = name.trim().split(/\s+/)[0] || null;
  const mailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent('PRTFLO — start a conversation')}`;

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 md:py-12">
      <h1 className="text-[12px] uppercase tracking-[0.04em] text-ink">
        {copy.title}
      </h1>
      <div className="mt-4 border-b border-hairline pb-4">
        <StepRail step={step} />
      </div>

      {step === 'delivery' ? (
        <>
          <ul className="mt-6 border-b border-hairline pb-4">
            {entries.map(({ line, product }) => (
              <li
                key={[line.slug, line.size, line.colour].join('|')}
                className="flex items-baseline justify-between gap-4 py-1.5"
              >
                <span className="text-[11px] uppercase tracking-[0.04em] text-muted">
                  {product.name}
                  {line.qty > 1 ? ` × ${line.qty}` : ''}
                </span>
                <span className="text-[12px] tabular-nums text-ink">
                  {formatPrice(product.basePriceGBP * line.qty, code)}
                </span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-4 pt-3">
              <span className="text-[11px] uppercase tracking-[0.04em] text-ink">
                {COPY.basket.totalLabel}
              </span>
              <span className="text-[13px] tabular-nums text-ink">
                {formatPrice(orderGBP, code)}
              </span>
            </li>
          </ul>

          <form
            className="mt-8 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setStep('processing');
            }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="checkout-name" className={label}>
                {copy.delivery.nameLabel}
              </label>
              <input
                id="checkout-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="checkout-email" className={label}>
                {copy.delivery.emailLabel}
              </label>
              <input
                id="checkout-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
              />
            </div>
            <Button size="lg" type="submit" className="mt-2 w-full">
              {copy.delivery.submitLabel}
            </Button>
          </form>
        </>
      ) : null}

      {step === 'processing' ? (
        <p
          role="status"
          className="cold-open mt-16 text-center text-[12px] uppercase tracking-[0.04em] text-muted"
        >
          {copy.processing}
        </p>
      ) : null}

      {step === 'reveal' ? (
        <div className="cold-open mt-10">
          <h2 className="text-xl font-light uppercase tracking-[0.02em] text-ink md:text-2xl">
            {copy.reveal.heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {firstName
              ? `Nothing is on its way, ${firstName}. `
              : 'Nothing is on its way. '}
            {copy.reveal.body}
          </p>

          <dl className="mt-10">
            {[
              { label: copy.reveal.orderLabel, valueGBP: orderGBP, decimals: 0 },
              { label: copy.reveal.imageryLabel, valueGBP: imageryGBP, decimals: 2 },
              { label: copy.reveal.studioLabel, valueGBP: studioGBP, decimals: 0 },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-t border-hairline py-3"
              >
                <dt className="text-[11px] uppercase tracking-[0.04em] text-muted">
                  {row.label}
                </dt>
                <dd className="text-[13px] tabular-nums text-ink">
                  {formatPrice(row.valueGBP, code, { decimals: row.decimals })}
                </dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-hairline pt-4 text-[10px] uppercase tracking-[0.04em] text-muted">
            {copy.reveal.imageryNote}
          </p>

          <div className="mt-14 border-t border-hairline pt-10">
            <h3 className="text-xl font-light uppercase tracking-[0.02em] text-ink md:text-2xl">
              {copy.reveal.contactHeading}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {copy.reveal.contactBody}
            </p>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <Button size="lg" href={mailto} className="flex-1">
                {copy.reveal.contactCta}
              </Button>
              <Button size="lg" variant="secondary" href="/intro" className="flex-1">
                {copy.reveal.secondaryCta}
              </Button>
            </div>
            <p className="mt-6 text-center sm:text-left">
              <Link
                href="/collection"
                className="text-[11px] uppercase tracking-[0.04em] text-muted underline underline-offset-4 transition-colors hover:text-ink"
              >
                {copy.reveal.keepBrowsing}
              </Link>
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
