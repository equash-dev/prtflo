'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { GalleryShot } from '@/lib/images';
import { GalleryLightbox } from './GalleryLightbox';
import { PipelineOverlay } from './PipelineOverlay';

// One frame per configured shot. Missing files render as warm panels
// labelled by shot type; frames with a generation reference (ref-NN.webp)
// carry a button that swaps between the final shot and the reference.
// Clicking a landed frame opens the zoom lightbox.
function Frame({
  shot,
  priority,
  sizes,
  onZoom,
}: {
  shot: GalleryShot;
  priority?: boolean;
  sizes: string;
  onZoom?: () => void;
}) {
  const [showRef, setShowRef] = useState(false);
  const assetId =
    shot.assetCode ?? shot.src.replace('/products/', '').replace('.webp', '');
  return (
    <div className="grain relative aspect-[2/3] overflow-hidden bg-panel">
      <PipelineOverlay assetId={assetId} shotType={shot.shotType} />
      {shot.exists ? (
        <>
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={priority}
            quality={90}
            sizes={sizes}
            className={[
              'object-cover transition-opacity duration-300',
              showRef ? 'opacity-0' : '',
            ].join(' ')}
          />
          {shot.refSrc ? (
            <Image
              src={shot.refSrc}
              alt={`${shot.alt} — generation reference`}
              fill
              quality={90}
              sizes={sizes}
              className={[
                'object-cover transition-opacity duration-300',
                showRef ? '' : 'opacity-0',
              ].join(' ')}
            />
          ) : null}
          {onZoom ? (
            <button
              type="button"
              aria-label={`Zoom ${shot.alt}`}
              onClick={onZoom}
              className="absolute inset-0 z-20 cursor-zoom-in"
            />
          ) : null}
          {shot.refSrc ? (
            <button
              type="button"
              aria-pressed={showRef}
              onClick={() => setShowRef((v) => !v)}
              className="absolute left-3 top-3 z-30 border border-hairline bg-canvas/85 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.04em] text-ink transition-colors hover:bg-canvas"
            >
              {showRef ? 'View final shot' : 'View reference'}
            </button>
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
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const zoomable = shots.filter((s) => s.exists);

  if (shots.length === 0) {
    return (
      <div className="flex flex-col gap-1 md:gap-2">
        <div className="relative aspect-[2/3] overflow-hidden bg-panel" />
      </div>
    );
  }

  const [first, ...rest] = shots;
  const zoomHandler = (shot: GalleryShot) =>
    shot.exists ? () => setZoomIndex(zoomable.indexOf(shot)) : undefined;

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      <Frame
        shot={first}
        priority
        sizes="(min-width: 1024px) 60vw, 100vw"
        onZoom={zoomHandler(first)}
      />
      {rest.length > 0 ? (
        <div className="grid grid-cols-2 gap-1 md:gap-2">
          {rest.map((shot) => (
            <Frame
              key={shot.src}
              shot={shot}
              sizes="(min-width: 1024px) 30vw, 50vw"
              onZoom={zoomHandler(shot)}
            />
          ))}
        </div>
      ) : null}
      {zoomIndex !== null && zoomable.length > 0 ? (
        <GalleryLightbox
          shots={zoomable}
          index={zoomIndex}
          onClose={() => setZoomIndex(null)}
          onNavigate={setZoomIndex}
        />
      ) : null}
    </div>
  );
}
