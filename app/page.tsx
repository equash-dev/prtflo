import type { Metadata } from 'next';
import Link from 'next/link';
import { AtmosphereLayer } from '@/components/landing/AtmosphereLayer';
import { PipelineToggle } from '@/components/storefront/PipelineToggle';
import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: `${SITE.brandName} — portfolio` },
  description:
    'A portfolio piece: a fictional fashion house where every image is AI-generated. Not a real shop.',
};

export default function LandingPage() {
  return (
    <main className="atmos flex min-h-svh flex-col justify-between gap-12 bg-ground px-6 py-12 text-canvas md:px-12 md:py-16">
      <AtmosphereLayer />

      <p className="cold-open text-[11px] uppercase tracking-[0.2em] text-canvas/60">
        {SITE.brandSerial}
      </p>

      <div
        className="cold-open max-w-4xl"
        style={{ '--cold-open-delay': '120ms' } as React.CSSProperties}
      >
        <p className="text-[11px] uppercase tracking-[0.04em] text-canvas/50">
          {COPY.landing.eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-normal uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {COPY.landing.heading}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-canvas/70 md:text-xl">
          {COPY.landing.framing}
        </p>
      </div>

      <div>
        <nav
          aria-label="Explore the portfolio"
          className="cold-open grid max-w-4xl gap-6 md:grid-cols-2 md:gap-12"
          style={{ '--cold-open-delay': '320ms' } as React.CSSProperties}
        >
          <Link
            href="/collection"
            className="group border-t border-canvas/30 py-6 transition-colors hover:border-canvas focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-canvas"
          >
            <span className="flex items-center justify-between gap-4 text-2xl font-normal">
              {COPY.landing.enterLabel}
              <span aria-hidden="true" className="text-canvas/50 group-hover:text-canvas">↗</span>
            </span>
            <span className="mt-3 block max-w-sm text-sm leading-relaxed text-canvas/60">
              {COPY.landing.storeDescription}
            </span>
          </Link>
          <Link
            href="/about"
            className="group border-t border-canvas/30 py-6 transition-colors hover:border-canvas focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-canvas"
          >
            <span className="flex items-center justify-between gap-4 text-2xl font-normal">
              {COPY.landing.aboutLabel}
              <span aria-hidden="true" className="text-canvas/50 group-hover:text-canvas">↗</span>
            </span>
            <span className="mt-3 block max-w-sm text-sm leading-relaxed text-canvas/60">
              {COPY.landing.aboutDescription}
            </span>
          </Link>
        </nav>

        {/* The disclosure switch, offered before the store rather than left to
            be found in the header. Pipeline state persists, so flipping it
            here means the catalogue opens already annotated. */}
        <div
          className="cold-open mt-8 flex max-w-md items-start gap-4 border-t border-canvas/15 pt-6"
          style={{ '--cold-open-delay': '480ms' } as React.CSSProperties}
        >
          <PipelineToggle tone="dark" />
          <p className="text-[11px] leading-relaxed text-canvas/50">
            {COPY.landing.workflowHint}
          </p>
        </div>
      </div>
    </main>
  );
}
