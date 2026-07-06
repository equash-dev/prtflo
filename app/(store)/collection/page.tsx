import Image from 'next/image';
import Link from 'next/link';
import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';
import { CATEGORIES } from '@/config/categories';
import { PRODUCTS } from '@/config/products';
import { PipelineOverlay } from '@/components/storefront/PipelineOverlay';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import { Button } from '@/components/ui/Button';
import { imageExists, withExistingImages } from '@/lib/images';

export default function CollectionPage() {
  const campaignImage = imageExists(COPY.campaign.image)
    ? COPY.campaign.image
    : undefined;
  const featured = PRODUCTS.filter((p) => p.isBestSeller || p.isNew)
    .slice(0, 4)
    .map(withExistingImages);

  return (
    <>
      <section className="relative">
        <div className="grid h-[72vh] min-h-[480px] grid-cols-1 md:grid-cols-2">
          <div className="pixel-field bg-panel" />
          <div className="pixel-field hidden bg-selected md:block" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
            {COPY.home.heroEyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-normal uppercase leading-[0.95] tracking-[0.04em] text-ink md:text-7xl lg:text-8xl">
            {SITE.brandName}
          </h1>
          <span className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted">
            {SITE.brandSerial}
          </span>
        </div>
      </section>

      <section className="border-b border-hairline px-4 py-16 md:px-10 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h2 className="text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] text-ink md:text-4xl">
            {COPY.home.heroHeading}
          </h2>
          <div>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              {COPY.home.heroSubcopy}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Button href={COPY.home.primaryCta.href} size="lg">
                {COPY.home.primaryCta.label}
              </Button>
              <Button
                href={COPY.home.secondaryCta.href}
                size="lg"
                variant="secondary"
              >
                {COPY.home.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className="group relative block">
            <div className="pixel-field aspect-[4/5] bg-panel transition-colors duration-500 group-hover:bg-selected md:aspect-[3/4]" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
              <span className="text-[12px] uppercase tracking-[0.04em] text-ink">
                {c.name}
              </span>
              <span className="text-[11px] uppercase tracking-[0.04em] text-muted transition-colors group-hover:text-ink">
                View
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Campaign slot — full-bleed imagery when it lands, warm panel until then */}
      <section className="relative mt-1">
        <div className="pixel-field relative h-[64vh] min-h-[420px] bg-panel">
          {campaignImage ? (
            <Image
              src={campaignImage}
              alt="SS26 campaign"
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <PipelineOverlay assetId="campaign/ss26-01" shotType="campaign" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <p className="text-[11px] uppercase tracking-[0.04em] text-muted">
            {COPY.campaign.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] text-ink md:text-4xl">
            {COPY.campaign.heading}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            {COPY.campaign.body}
          </p>
          <div className="mt-6">
            <Link
              href={COPY.campaign.cta.href}
              className="text-[11px] uppercase tracking-[0.04em] text-ink underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              {COPY.campaign.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-10 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-hairline pb-4">
          <h2 className="text-[12px] uppercase tracking-[0.04em] text-ink">
            New &amp; best selling
          </h2>
          <Link
            href="/women"
            className="text-[11px] uppercase tracking-[0.04em] text-muted transition-colors hover:text-ink"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </>
  );
}
