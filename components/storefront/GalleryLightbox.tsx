'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { GalleryShot } from '@/lib/images';

// Fullscreen viewer for the PDP gallery, patterned on Zara's zoomed view:
// every shot stacked in one free vertical scroll at ~80vw, a fixed thumbnail
// rail on the left tracking the scroll position, and a click-anchored deeper
// zoom that hides the chrome. The stack serves optimized frames; the raw
// ingested webp (up to 3840px) is only mounted over a frame once it has been
// zoomed, so zoom still resolves to the master's actual pixels without the
// open paying for every master up front. Esc exits the zoom, then closes;
// arrows step between shots.
const ZOOM = 2;

export function GalleryLightbox({
  shots,
  index,
  onClose,
  onNavigate,
}: {
  shots: GalleryShot[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initialIndex = useRef(index);
  const [active, setActive] = useState(index);
  const [zoom, setZoom] = useState<{ index: number; x: number; y: number } | null>(null);
  // Frames that have been zoomed at least once; stays populated after
  // un-zooming so a fetched master is never thrown away and re-fetched.
  const [masters, setMasters] = useState<Set<number>>(() => new Set());
  const chromeVisible = zoom === null;

  const scrollTo = useCallback((i: number, behavior: ScrollBehavior = 'smooth') => {
    frameRefs.current[i]?.scrollIntoView({ behavior, block: 'start' });
  }, []);

  const step = useCallback(
    (delta: number) => {
      setZoom(null);
      scrollTo((active + delta + shots.length) % shots.length);
    },
    [active, shots.length, scrollTo],
  );

  useEffect(() => {
    scrollTo(initialIndex.current, 'auto');
  }, [scrollTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoom) setZoom(null);
        else onClose();
      }
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && shots.length > 1) {
        e.preventDefault();
        step(-1);
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && shots.length > 1) {
        e.preventDefault();
        step(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, step, shots.length, zoom]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // The frame whose span covers the viewport midline is the active shot.
  const onScroll = () => {
    const mid = window.innerHeight / 2;
    let best = 0;
    let bestDist = Infinity;
    frameRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist =
        mid < rect.top ? rect.top - mid : mid > rect.bottom ? mid - rect.bottom : 0;
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    if (best !== active) {
      setActive(best);
      onNavigate(best);
    }
  };

  const pointFrom = (e: { clientX: number; clientY: number }, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={shots[active].alt}
      className="fixed inset-0 z-50 bg-canvas"
    >
      <div className="h-full overflow-y-auto overscroll-contain" onScroll={onScroll}>
        <div className="flex flex-col items-center gap-[18vh] pb-[18vh]">
          {shots.map((shot, i) => {
            const zoomedHere = zoom?.index === i;
            const imageStyle = {
              transform: zoomedHere ? `scale(${ZOOM})` : undefined,
              transformOrigin:
                zoomedHere && zoom ? `${zoom.x}% ${zoom.y}%` : undefined,
              transition: 'transform 300ms ease',
            };
            return (
              <div
                key={shot.src}
                ref={(el) => {
                  frameRefs.current[i] = el;
                }}
                className="grain relative aspect-[2/3] w-full overflow-hidden md:w-[80vw]"
                onMouseMove={(e) => {
                  if (zoomedHere) setZoom({ index: i, ...pointFrom(e, e.currentTarget) });
                }}
                onTouchMove={(e) => {
                  if (!zoomedHere) return;
                  setZoom({ index: i, ...pointFrom(e.touches[0], e.currentTarget) });
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 768px) 80vw, 100vw"
                  className="object-cover"
                  style={imageStyle}
                />
                {masters.has(i) ? (
                  <Image
                    src={shot.src}
                    alt=""
                    aria-hidden
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-cover"
                    style={imageStyle}
                  />
                ) : null}
                {/* A real button, not a click handler on the frame div —
                    iOS Safari doesn't dispatch click on non-interactive
                    elements. touch-none lives here too: touch-action only
                    applies on the touch's target. */}
                <button
                  type="button"
                  aria-label={zoomedHere ? 'Exit zoom' : `Zoom into ${shot.alt}`}
                  onClick={(e) => {
                    const point = pointFrom(e, e.currentTarget);
                    if (zoom?.index !== i) {
                      setMasters((m) => (m.has(i) ? m : new Set(m).add(i)));
                    }
                    setZoom((z) => (z?.index === i ? null : { index: i, ...point }));
                  }}
                  className={[
                    'absolute inset-0 z-10',
                    zoomedHere ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in',
                  ].join(' ')}
                />
              </div>
            );
          })}
        </div>
      </div>

      {chromeVisible ? (
        <>
          {/* Rail is desktop-only: on a phone it would sit over the
              full-bleed frame; the counter + scroll cover navigation. */}
          {shots.length > 1 ? (
            <div className="fixed left-3 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 md:left-6 md:flex">
              {shots.map((shot, i) => (
                <button
                  key={shot.src}
                  type="button"
                  aria-label={`Go to ${shot.shotType}`}
                  aria-current={i === active}
                  onClick={() => scrollTo(i)}
                  className={[
                    'relative aspect-[2/3] overflow-hidden transition-all duration-200',
                    i === active ? 'w-12' : 'w-9 opacity-50 hover:opacity-100',
                  ].join(' ')}
                >
                  <Image src={shot.src} alt="" fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-ink transition-opacity hover:opacity-60 md:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          <span className="fixed bottom-4 left-4 z-10 text-[10px] uppercase tracking-[0.04em] tabular-nums text-muted md:left-6">
            {shots[active].shotType} · {String(active + 1).padStart(2, '0')} /{' '}
            {String(shots.length).padStart(2, '0')}
          </span>
        </>
      ) : null}
    </div>
  );
}
