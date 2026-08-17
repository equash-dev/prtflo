import Image from 'next/image';
import { CampaignProcess } from './CampaignProcess';

// The season-campaign slot on the collection front: one full-bleed frame,
// no copy overlaid — a pure image spot, matching the hero/tile rows above
// it. The expanded editorial treatment (with copy) lives at /campaign.
// Warm panel until a banner lands.
export function CampaignSlot({ image }: { image?: string }) {
  return (
    <section className="relative mt-1">
      <div className="grain relative h-svh min-h-[560px] overflow-hidden bg-panel">
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
    </section>
  );
}
