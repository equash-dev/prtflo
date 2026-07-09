import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';

export function Arrival() {
  // svh keeps the scroll cue inside the visible viewport on mobile;
  // 100vh hides it behind the browser toolbar.
  return (
    <section className="ambient flex min-h-svh flex-col justify-between px-6 py-12 md:px-12 md:py-16">
      <p className="cold-open text-[11px] uppercase tracking-[0.2em] text-canvas/60">
        {SITE.brandSerial}
      </p>

      <div
        className="cold-open max-w-4xl"
        style={{ '--cold-open-delay': '120ms' } as React.CSSProperties}
      >
        <p className="text-[11px] uppercase tracking-[0.04em] text-canvas/50">
          {COPY.intro.arrival.eyebrow}
        </p>
        <h1 className="mt-6 text-5xl font-normal uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {COPY.intro.arrival.heading}
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-canvas/70 md:text-xl">
          {COPY.intro.arrival.sub}
        </p>
      </div>

      <div
        className="cold-open flex items-center gap-3 text-[11px] uppercase tracking-[0.04em] text-canvas/50"
        style={{ '--cold-open-delay': '320ms' } as React.CSSProperties}
      >
        <span>{COPY.intro.arrival.scrollCue}</span>
        <span className="h-px w-12 bg-canvas/30" />
      </div>
    </section>
  );
}
