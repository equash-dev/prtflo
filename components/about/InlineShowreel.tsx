'use client';

import { useEffect, useRef } from 'react';

export function InlineShowreel({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    const chapter = video.closest('.timeline-chapter');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let wasActive = false;
    const sync = () => {
      const active = visible && chapter?.getAttribute('data-active') !== 'false' && !document.hidden;
      if (!active || (reducedMotion.matches && !wasActive)) video.pause();
      else if (!wasActive && !reducedMotion.matches) void video.play().catch(() => { /* Native controls remain available when autoplay is blocked. */ });
      wasActive = active;
    };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .35; sync(); }, { threshold: [0, .35] });
    visibility.observe(video);
    const activity = new MutationObserver(sync);
    if (chapter) activity.observe(chapter, { attributes: true, attributeFilter: ['data-active'] });
    const motionChanged = () => { wasActive = false; sync(); };
    document.addEventListener('visibilitychange', sync);
    reducedMotion.addEventListener('change', motionChanged);
    return () => {
      visibility.disconnect(); activity.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reducedMotion.removeEventListener('change', motionChanged);
      video.pause();
    };
  }, [src]);

  return <div className="journey-reel-slot"><video ref={player} className="journey-inline-reel" src={src} poster={poster} controls autoPlay muted loop playsInline preload="metadata" aria-label={title} data-interactive-story /></div>;
}
