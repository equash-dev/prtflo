import Image from 'next/image';
import Link from 'next/link';
import { COPY } from '@/config/copy';
import { CampaignProcess } from './CampaignProcess';

// The season-campaign slot on the collection front: one full-bleed frame,
// copy overlaid, nothing clever. The expanded editorial treatment lives at
// /campaign behind the CTA. Warm panel until a banner lands.
//
// Over a photo the copy runs light on a bottom scrim — banner content is
// arbitrary, so ink can't be trusted to read; on the panel fallback the
// scrim would be noise and ink is correct, hence the conditional tones.
export function CampaignSlot({ image }: { image?: string }) {
  const onImage = Boolean(image);
  return (
    <section className="relative mt-1">
      <div className="grain pixel-field relative h-[64svh] min-h-[420px] overflow-hidden bg-panel">
        {image ? (
          <>
            <Image
              src={image}
              alt="SS26 campaign"
              fill
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/60 via-ink/25 to-transparent" />
          </>
        ) : null}
        <CampaignProcess id="campaign/ss26-01" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <p
          className={`text-[11px] uppercase tracking-[0.04em] ${onImage ? 'text-canvas/75' : 'text-muted'}`}
        >
          {COPY.campaign.eyebrow}
        </p>
        <h2
          className={`mt-3 max-w-2xl text-3xl font-normal uppercase leading-[1.05] tracking-[0.02em] md:text-4xl ${onImage ? 'text-canvas' : 'text-ink'}`}
        >
          {COPY.campaign.heading}
        </h2>
        <p
          className={`mt-4 max-w-xl text-sm leading-relaxed ${onImage ? 'text-canvas/75' : 'text-muted'}`}
        >
          {COPY.campaign.body}
        </p>
        <div className="mt-6">
          <Link
            href={COPY.campaign.cta.href}
            className={`text-[11px] uppercase tracking-[0.04em] underline underline-offset-4 transition-opacity hover:opacity-60 ${onImage ? 'text-canvas' : 'text-ink'}`}
          >
            {COPY.campaign.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
