import Image from 'next/image';
import { CampaignProcess } from './CampaignProcess';
import type { CampaignVideo } from '@/lib/images';

// The season-campaign slot on the collection front: one full-bleed frame,
// no copy overlaid — a pure image (or video) spot, matching the hero/tile
// rows above it. The expanded editorial treatment (with copy) lives at
// /campaign. Warm panel until a banner lands. `video` takes priority over
// `image` when both are supplied — the still then serves only as the
// video's poster frame.
export function CampaignSlot({
  image,
  video,
}: {
  image?: string;
  video?: CampaignVideo;
}) {
  return (
    <section className="relative mt-1">
      <div className="grain relative h-svh min-h-[560px] overflow-hidden bg-panel">
        {video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={video.poster}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={video.webm} type="video/webm" />
            <source src={video.mp4} type="video/mp4" />
          </video>
        ) : image ? (
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
