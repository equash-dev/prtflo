'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/config/site';

// The tile strip's photos are busy enough that mix-blend-difference turns
// the wordmark into visual noise instead of a clean invert, so it drops
// to flat ink there. Crossfaded via opacity (mix-blend-mode itself can't
// tween) once the sticky wordmark's own measured center enters the strip's
// rect — driven by real layout, not viewport-width guesses, so it holds
// up across breakpoints.
export const MID_SPOT_ID = 'collection-mid-spot';

export function PinnedWordmark() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [overMidSpot, setOverMidSpot] = useState(false);

  useEffect(() => {
    const midSpot = document.getElementById(MID_SPOT_ID);
    if (!midSpot) return;

    let queued = false;
    const measure = () => {
      queued = false;
      const wordmarkEl = wordmarkRef.current;
      if (!wordmarkEl) return;
      const wordmarkRect = wordmarkEl.getBoundingClientRect();
      const midRect = midSpot.getBoundingClientRect();
      const wordmarkCenter = wordmarkRect.top + wordmarkRect.height / 2;
      setOverMidSpot(wordmarkCenter >= midRect.top && wordmarkCenter <= midRect.bottom);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={wordmarkRef}
      aria-hidden
      className="pointer-events-none sticky bottom-8 z-10 col-start-1 row-start-1 self-end select-none md:bottom-12"
    >
      <span
        className="block whitespace-nowrap text-center text-[22vw] font-light uppercase leading-none tracking-tight text-canvas mix-blend-difference transition-opacity duration-300 md:text-[18vw]"
        style={{ opacity: overMidSpot ? 0 : 1 }}
      >
        {SITE.brandName}
      </span>
      <span
        className="absolute inset-0 block whitespace-nowrap text-center text-[22vw] font-light uppercase leading-none tracking-tight text-ink transition-opacity duration-300 md:text-[18vw]"
        style={{ opacity: overMidSpot ? 1 : 0 }}
      >
        {SITE.brandName}
      </span>
    </div>
  );
}
