import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/intro/RevealOnScroll';
import { GeneratedReveal } from '@/components/intro/GeneratedReveal';
import { imageExists } from '@/lib/images';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: 'About the project',
  description:
    'Not a real shop. A portfolio piece: a fashion house that exists entirely as generated imagery.',
};

export default function IntroPage() {
  const studioSrc = imageExists('/reveal/studio.webp')
    ? '/reveal/studio.webp'
    : undefined;
  const generatedSrc = imageExists('/reveal/generated.webp')
    ? '/reveal/generated.webp'
    : undefined;

  return (
    <div className="bg-ground text-canvas">
      {/* Cold-open hero */}
      <section className="flex min-h-screen flex-col justify-between px-6 py-12 md:px-12 md:py-16">
        <p className="cold-open text-[11px] uppercase tracking-[0.2em] text-canvas/60">
          {SITE.brandSerial}
        </p>

        <div className="cold-open max-w-4xl" style={{ '--cold-open-delay': '120ms' } as React.CSSProperties}>
          <h1 className="text-5xl font-normal uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            {SITE.brandName}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-canvas/70 md:text-xl">
            Not a real shop. A working demonstration of a fashion house that runs
            entirely on generated imagery — no studio, no shoot, no camera.
          </p>
        </div>

        <div
          className="cold-open flex items-center gap-3 text-[11px] uppercase tracking-[0.04em] text-canvas/50"
          style={{ '--cold-open-delay': '320ms' } as React.CSSProperties}
        >
          <span>Scroll</span>
          <span className="h-px w-12 bg-canvas/30" />
        </div>
      </section>

      {/* Belief plates */}
      <section className="bg-canvas px-6 py-28 text-ink md:px-12 md:py-40">
        <div className="mx-auto max-w-3xl space-y-24 md:space-y-32">
          <Plate index="01">
            Every garment here is a real product concept — designed, named, priced,
            and merchandised like a label you could buy from tomorrow.
          </Plate>
          <Plate index="02" delay={80}>
            Every image is generated. There was no photographer, no model, no set.
            What looks like a campaign is a prompt and a pipeline.
          </Plate>
          <Plate index="03" delay={160}>
            The storefront behaves like the genuine article — that is the whole
            point. You should believe it before you are told.
          </Plate>
        </div>
      </section>

      {/* Signature reveal */}
      <section className="bg-panel px-6 py-28 text-ink md:px-12 md:py-36">
        <div className="mx-auto max-w-5xl">
          <RevealOnScroll>
            <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
              The reveal
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-normal uppercase tracking-tight md:text-4xl">
              One side cost a studio. The other cost minutes.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Drag across the frame. The same asset, the old way and the
              pipeline way.
            </p>
          </RevealOnScroll>

          <div className="mt-12">
            <GeneratedReveal studioSrc={studioSrc} generatedSrc={generatedSrc} />
          </div>
        </div>
      </section>

      {/* Disclosure line */}
      <section className="bg-ground px-6 py-32 text-canvas md:px-12 md:py-44">
        <div className="mx-auto max-w-4xl">
          <RevealOnScroll>
            <p className="text-3xl font-normal uppercase leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {SITE.revealLine}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTAs into the store */}
      <section className="bg-ground px-6 py-28 text-canvas md:px-12 md:py-36">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-normal uppercase tracking-tight md:text-4xl">
            Now go and look.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-canvas/70">
            Walk the catalogue as a customer would — browse, open a product,
            switch the currency. Then remember none of it was photographed.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/collection" size="lg">
              Enter the collection
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Plate({
  index,
  children,
  delay = 0,
}: {
  index: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <RevealOnScroll delay={delay} className="flex gap-6 md:gap-10">
      <span className="shrink-0 text-[11px] uppercase tracking-[0.04em] text-muted tabular-nums">
        {index}
      </span>
      <p className="text-2xl font-normal leading-snug tracking-tight md:text-4xl md:leading-[1.15]">
        {children}
      </p>
    </RevealOnScroll>
  );
}
