import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: `${SITE.brandName} — portfolio` },
  description:
    'A portfolio piece: a fictional fashion house where every image is AI-generated. Not a real shop.',
};

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-ground px-6 py-12 text-canvas md:px-12 md:py-16">
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
        <h1 className="mt-6 text-5xl font-normal uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {SITE.brandName}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-canvas/70 md:text-xl">
          {COPY.landing.framing}
        </p>
      </div>

      <div
        className="cold-open flex flex-wrap items-center gap-x-8 gap-y-4"
        style={{ '--cold-open-delay': '320ms' } as React.CSSProperties}
      >
        <Button href="/collection" size="lg">
          {COPY.landing.enterLabel} →
        </Button>
        <Link
          href="/intro"
          className="text-[11px] uppercase tracking-[0.04em] text-canvas/60 transition-colors hover:text-canvas"
        >
          {COPY.landing.aboutLabel}
        </Link>
      </div>
    </main>
  );
}
