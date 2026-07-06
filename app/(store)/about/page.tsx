import type { Metadata } from 'next';
import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';
import { PRODUCTS, totalAssetCount } from '@/config/products';

export const metadata: Metadata = {
  title: 'About',
  description: COPY.about.body,
};

export default function AboutPage() {
  const pieces = PRODUCTS.length;
  const images = totalAssetCount();
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
      <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
        About the project
      </p>
      <h1 className="mt-3 text-4xl font-normal uppercase tracking-tight text-ink lg:text-5xl">
        {COPY.about.heading}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted">
        {COPY.about.body}
      </p>
      <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-hairline pt-8">
        <Stat label="Pieces in this collection" value={String(pieces)} />
        <Stat label="Images, all generated" value={String(images)} />
      </dl>
      <p className="mt-12 text-sm text-muted">
        Questions? Reach out at{' '}
        <a
          href={`mailto:${SITE.contactEmail}`}
          className="underline transition-colors hover:text-ink"
        >
          {SITE.contactEmail}
        </a>
        .
      </p>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.04em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-2xl font-normal tabular-nums text-ink">{value}</dd>
    </div>
  );
}
