import Image from 'next/image';
import Link from 'next/link';
import { COPY } from '@/config/copy';
import { CampaignProcess } from './CampaignProcess';

// The season-campaign slot on the collection front: one full-bleed frame,
// copy overlaid, nothing clever. The expanded editorial treatment lives at
// /campaign behind the CTA. Warm panel until a banner lands.
export function CampaignSlot({ image }: { image?: string }) {
  return (
    <section className="relative mt-1">
      <div className="grain pixel-field relative h-[64svh] min-h-[420px] overflow-hidden bg-panel">
        {image ? (
          <Image
            src={image}
            alt="SS26 campaign"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <CampaignProcess id="campaign/ss26-01" />
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
  );
}
