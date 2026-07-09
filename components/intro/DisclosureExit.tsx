import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/intro/RevealOnScroll';
import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';

export function DisclosureExit() {
  return (
    <section className="ambient flex min-h-svh flex-col justify-between bg-ground px-6 py-24 text-canvas md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-4xl pt-16 md:pt-24">
        <RevealOnScroll>
          <p className="text-3xl font-normal uppercase leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {SITE.revealLine}
          </p>
        </RevealOnScroll>
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <RevealOnScroll>
          <h2 className="text-3xl font-normal uppercase tracking-tight md:text-4xl">
            {COPY.intro.exit.heading}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-canvas/70">
            {COPY.intro.exit.sub}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/collection" size="lg">
              {COPY.intro.exit.ctaLabel}
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
