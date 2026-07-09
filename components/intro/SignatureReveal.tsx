import { RevealOnScroll } from '@/components/intro/RevealOnScroll';
import { GeneratedReveal } from '@/components/intro/GeneratedReveal';
import { imageExists } from '@/lib/images';
import { COPY } from '@/config/copy';

export function SignatureReveal() {
  const studioSrc = imageExists('/reveal/studio.webp')
    ? '/reveal/studio.webp'
    : undefined;
  const generatedSrc = imageExists('/reveal/generated.webp')
    ? '/reveal/generated.webp'
    : undefined;

  return (
    <section className="flex min-h-screen flex-col justify-center bg-panel px-6 py-28 text-ink md:px-12 md:py-36">
      <div className="mx-auto w-full max-w-5xl">
        <RevealOnScroll>
          <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
            {COPY.intro.reveal.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-normal uppercase tracking-tight md:text-4xl">
            {COPY.intro.reveal.heading}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {COPY.intro.reveal.sub}
          </p>
        </RevealOnScroll>

        <div className="mt-12">
          <GeneratedReveal studioSrc={studioSrc} generatedSrc={generatedSrc} />
        </div>
      </div>
    </section>
  );
}
