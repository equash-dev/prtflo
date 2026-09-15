'use client';

import { useEffect, useRef } from 'react';
import type { CampaignVideo } from '@/lib/images';

// The campaign loop, held back until it is actually on screen.
//
// autoPlay would start the download the moment /collection parses, and this
// slot sits below a full hero and the department tiles: on a phone the file
// (1.7MB webm, 3.0MB mp4 on Safari) lands before anyone has scrolled far
// enough to see a frame of it. preload="none" plus an observer moves that
// cost off the critical path without giving up the motion.
//
// muted + playsInline are what make programmatic play() legal on iOS; the
// poster carries the slot until the first frame decodes.
export function CampaignLoop({ video }: { video: CampaignVideo }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced-motion users get the poster and nothing else. The CSS block in
    // globals.css can't reach a <video>, so the check has to live here.
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (still.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if the tab is backgrounded or the decode fails.
          // The poster is already the fallback, so there is nothing to do.
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      // Start fetching just before it arrives so the first frame is ready.
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      poster={video.poster}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}
