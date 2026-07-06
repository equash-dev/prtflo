import Image from 'next/image';
import type { GalleryShot } from '@/lib/images';
import { PipelineOverlay } from './PipelineOverlay';

// One frame per configured shot. Missing files render as warm panels
// labelled by shot type; frames with a generation reference (ref-NN.webp)
// swap to it on hover.
function Frame({ shot, priority, sizes }: { shot: GalleryShot; priority?: boolean; sizes: string }) {
  const assetId = shot.src.replace('/products/', '').replace('.webp', '');
  return (
    <div className="group/frame relative aspect-[2/3] overflow-hidden bg-panel">
      <PipelineOverlay assetId={assetId} shotType={shot.shotType} />
      {shot.exists ? (
        <>
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={priority}
            sizes={sizes}
            className={
              shot.refSrc
                ? 'object-cover transition-opacity duration-300 group-hover/frame:opacity-0'
                : 'object-cover'
            }
          />
          {shot.refSrc ? (
            <>
              <Image
                src={shot.refSrc}
                alt={`${shot.alt} — generation reference`}
                fill
                sizes={sizes}
                className="object-cover opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100"
              />
              <span className="absolute left-3 top-3 text-[10px] uppercase tracking-[0.04em] text-muted opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100">
                Generation reference
              </span>
            </>
          ) : null}
        </>
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.04em] text-muted">
          {shot.shotType}
        </span>
      )}
    </div>
  );
}

export function ProductGallery({ shots }: { shots: GalleryShot[] }) {
  if (shots.length === 0) {
    return (
      <div className="flex flex-col gap-1 md:gap-2">
        <div className="relative aspect-[2/3] overflow-hidden bg-panel" />
      </div>
    );
  }

  const [first, ...rest] = shots;
  const hasReferences = shots.some((s) => s.refSrc);

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <Frame shot={first} priority sizes="(min-width: 1024px) 60vw, 100vw" />
      {rest.length > 0 ? (
        <div className="grid grid-cols-2 gap-1 md:gap-2">
          {rest.map((shot) => (
            <Frame
              key={shot.src}
              shot={shot}
              sizes="(min-width: 1024px) 30vw, 50vw"
            />
          ))}
        </div>
      ) : null}
      {hasReferences ? (
        <p className="mt-2 text-[10px] uppercase tracking-[0.04em] text-muted">
          Hover a frame to see the reference that guided its generation.
        </p>
      ) : null}
    </div>
  );
}
