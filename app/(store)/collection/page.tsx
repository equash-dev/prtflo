import Link from 'next/link';
import { COPY } from '@/config/copy';
import { SITE } from '@/config/site';
import { CATEGORIES } from '@/config/categories';
import { PRODUCTS } from '@/config/products';
import { CampaignSlot } from '@/components/storefront/CampaignSlot';
import { CampaignProcess } from '@/components/storefront/CampaignProcess';
import { PinnedWordmark, MID_SPOT_ID } from '@/components/storefront/PinnedWordmark';
import { ProductGrid } from '@/components/storefront/ProductGrid';
import Image from 'next/image';
import { campaignBanners, campaignVideo, withExistingImages } from '@/lib/images';

// Ecommerce product shots for the homepage tiles, not the styled/campaign
// spot images — a plain-background ghost-hero shot per department reads as
// "shop the product," which is what these tiles are for.
const TILE_IMAGES: Record<string, string> = {
  men: '/products/men/pleated-wide-shorts/01.webp',
  women: '/products/women/oversized-double-breasted-blazer/01.webp',
};

export default function CollectionPage() {
  const banners = campaignBanners();
  // Alternate men/women so the rail never reads as one department —
  // PRODUCTS is in linesheet order (men first), so a straight slice would.
  const flagged = PRODUCTS.filter((p) => p.isBestSeller || p.isNew);
  const flaggedMen = flagged.filter((p) => p.category === 'men');
  const flaggedWomen = flagged.filter((p) => p.category === 'women');
  const featured = Array.from(
    { length: Math.max(flaggedMen.length, flaggedWomen.length) },
    (_, i) => [flaggedMen[i], flaggedWomen[i]],
  )
    .flat()
    .filter((p): p is (typeof flagged)[number] => Boolean(p))
    .slice(0, 4)
    .map(withExistingImages);

  return (
    <>
      {/* Pinned wordmark zone: hero + category strip + campaign banner run as
          one continuous, zero-margin block of imagery. PRTFLO's wordmark
          stays anchored near the bottom of the viewport for the full scroll
          through this zone via `sticky bottom-*`, so it rides along through
          all three sections and lands flush with the bottom edge of the
          campaign banner — the zone's last section — as it releases into
          normal flow right where the product grid begins. Grid-stack (both
          children in the same cell) overlays the sticky wordmark in front of
          the in-flow imagery without it taking its own layout space. */}
      <div className="grid grid-cols-1">
        <div className="col-start-1 row-start-1">
          {/* svh, not vh: mobile browser chrome makes 100vh taller than the
              visible viewport and the hero jumps as the toolbar collapses. */}
          <section className="grid h-svh min-h-[560px] grid-cols-1 md:grid-cols-2">
            {/* Visual placeholders: real Home-department shots standing in
                for whatever the eventual hero imagery is. Both act as
                buttons through to /home — plain black text, no chip. */}
            <Link href="/home" className="grain group relative block overflow-hidden bg-panel">
              <Image
                src="/products/home/sculptural-stoneware-vase/01.webp"
                alt=""
                fill
                priority
                quality={90}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <p className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.04em] text-ink">
                {COPY.home.heroEyebrow}
              </p>
              <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.04em] text-ink transition-opacity group-hover:opacity-60">
                Shop Home
              </span>
            </Link>
            <Link href="/home" className="grain group relative hidden overflow-hidden bg-selected md:block">
              <Image
                src="/products/home/washed-linen-bedding-stack/01.webp"
                alt=""
                fill
                priority
                quality={90}
                sizes="50vw"
                className="object-cover"
              />
              <p className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.04em] text-ink">
                {SITE.brandSerial}
              </p>
              <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.04em] text-ink transition-opacity group-hover:opacity-60">
                Shop Home
              </span>
            </Link>
          </section>

          {/* Tiles act as buttons: plain black text, no chip — no more bare
              white text scrimmed over the photo either. Men/Women only —
              Home has no range yet, so it's not featured here (it gets the
              hero row instead). */}
          <section id={MID_SPOT_ID} className="grid grid-cols-1 md:grid-cols-2">
            {CATEGORIES.filter((c) => c.slug !== 'home').map((c) => {
              const spot = TILE_IMAGES[c.slug];
              return (
                <Link key={c.slug} href={`/${c.slug}`} className="group relative block">
                  {/* 275:410 — the confirmed Acne spot ratio, not viewport
                      height: a fixed portrait shape reads consistently across
                      window sizes where h-svh didn't. */}
                  <div className="grain relative aspect-[275/410] overflow-hidden bg-panel transition-colors duration-500 group-hover:bg-selected">
                    {spot ? (
                      <Image
                        src={spot}
                        alt={c.name}
                        fill
                        quality={90}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <CampaignProcess id={`spot/${c.slug}`} />
                  <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.04em] text-ink transition-opacity group-hover:opacity-60">
                    Shop {c.name}
                  </span>
                </Link>
              );
            })}
          </section>

          {/* Campaign — one straightforward frame; the editorial expansion
              is /campaign. Part of the pinned-wordmark zone, not a separate
              section after it. */}
          <CampaignSlot image={banners[0]} video={campaignVideo()} />
        </div>

        <PinnedWordmark />
      </div>

      <section className="py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-6 border-b border-hairline px-4 pb-4 md:px-10">
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
        <ProductGrid products={featured} cols="fixed-4" />
      </section>
    </>
  );
}
