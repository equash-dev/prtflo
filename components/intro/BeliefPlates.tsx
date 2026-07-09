import { RevealOnScroll } from '@/components/intro/RevealOnScroll';
import { COPY } from '@/config/copy';

export function BeliefPlates() {
  return (
    <section className="flex min-h-screen flex-col justify-center bg-canvas px-6 py-28 text-ink md:px-12 md:py-40">
      <div className="mx-auto w-full max-w-3xl space-y-24 md:space-y-32">
        {COPY.intro.plates.map((body, i) => (
          <RevealOnScroll
            key={body}
            delay={i * 80}
            className="flex gap-6 md:gap-10"
          >
            <span className="shrink-0 text-[11px] uppercase tracking-[0.04em] text-muted tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-2xl font-normal leading-snug tracking-tight md:text-4xl md:leading-[1.15]">
              {body}
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
