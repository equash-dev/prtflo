'use client';

import Image from 'next/image';
import { useCallback, useRef, useState, type PointerEvent } from 'react';

interface GeneratedRevealProps {
  // Real before/after pair; when absent the frame falls back to the
  // in-brand gradient treatment so the slider still demonstrates itself.
  studioSrc?: string;
  generatedSrc?: string;
}

export function GeneratedReveal({ studioSrc, generatedSrc }: GeneratedRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(56);

  const update = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  // Reduced motion never disables the slider: the reveal only moves when
  // the user moves it, which is exactly the motion that setting permits.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) update(e.clientX);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const reveal = pos;

  return (
    <div>
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-[4/5] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-canvas sm:aspect-[16/10]"
      >
        {/* Studio capture — the base layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-panel to-canvas">
          {studioSrc ? (
            <Image
              src={studioSrc}
              alt="Studio capture of the garment"
              fill
              sizes="(min-width: 1024px) 60rem, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute right-5 top-5 text-right">
            <p className="text-[10px] uppercase tracking-[0.04em] text-muted">
              Studio capture
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.04em] text-muted">
              A shoot · days
            </p>
          </div>
          {!studioSrc ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] uppercase tracking-[0.04em] text-hairline">
                The way it used to cost
              </span>
            </div>
          ) : null}
        </div>

        {/* Generated truth — clipped from the right to the handle position */}
        <div
          className="pixel-field absolute inset-0 bg-gradient-to-tr from-ground/15 via-canvas to-selected"
          style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
        >
          {generatedSrc ? (
            <Image
              src={generatedSrc}
              alt="Generated image of the same garment"
              fill
              sizes="(min-width: 1024px) 60rem, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute left-5 top-5">
            <p className="text-[10px] uppercase tracking-[0.04em] text-ink">
              Generated
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.04em] text-ink">
              A prompt · minutes
            </p>
          </div>
          <div className="absolute bottom-5 left-5 max-w-[60%]">
            <p className="font-mono text-[10px] leading-relaxed tracking-tight text-muted">
              PRTFLO—001 / SS26 · technical wool, close cut, bone field, soft key light
            </p>
          </div>
        </div>

        {/* Divider handle */}
        <div
          className="pointer-events-none absolute inset-y-0 flex items-center"
          style={{ left: `${reveal}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/30" />
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink/30 bg-canvas text-ink shadow-sm">
            <span className="text-[10px] tracking-[0.1em]">‹ ›</span>
          </div>
        </div>
      </div>

      <label className="mt-4 block">
        <span className="text-[11px] uppercase tracking-[0.04em] text-muted">
          Drag, or use the slider, to reveal what is generated
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal the generated image"
          className="mt-3 w-full accent-ink"
        />
      </label>
    </div>
  );
}
