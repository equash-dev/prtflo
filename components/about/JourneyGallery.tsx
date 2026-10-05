'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';

export interface JourneyGalleryItem { src: string; alt: string; caption: string; crop?: 'portrait' }

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function JourneyGallery({ items, title, expanded = false, autoPlay = false }: { items: readonly JourneyGalleryItem[]; title: string; expanded?: boolean; autoPlay?: boolean }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => false);
  const id = useId();
  const item = items[index];

  useEffect(() => {
    const gallery = root.current;
    if (!gallery || !autoPlay || !playing || reducedMotion || items.length < 2) return;
    const chapter = gallery.closest('.timeline-chapter');
    let visible = false;
    let timer = 0;
    let frame = 0;
    const sync = () => {
      window.clearInterval(timer);
      if (!visible || document.hidden || chapter?.getAttribute('data-active') === 'false' || gallery.matches(':hover') || gallery.contains(document.activeElement)) return;
      timer = window.setInterval(() => setIndex((current) => (current + 1) % items.length), 5000);
    };
    const afterFocus = () => { window.cancelAnimationFrame(frame); frame = window.requestAnimationFrame(sync); };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .35; sync(); }, { threshold: [0, .35] });
    visibility.observe(gallery);
    const activity = new MutationObserver(sync);
    if (chapter) activity.observe(chapter, { attributes: true, attributeFilter: ['data-active'] });
    document.addEventListener('visibilitychange', sync);
    gallery.addEventListener('mouseenter', sync);
    gallery.addEventListener('mouseleave', sync);
    gallery.addEventListener('focusin', sync);
    gallery.addEventListener('focusout', afterFocus);
    return () => {
      window.clearInterval(timer); window.cancelAnimationFrame(frame);
      visibility.disconnect(); activity.disconnect();
      document.removeEventListener('visibilitychange', sync);
      gallery.removeEventListener('mouseenter', sync);
      gallery.removeEventListener('mouseleave', sync);
      gallery.removeEventListener('focusin', sync);
      gallery.removeEventListener('focusout', afterFocus);
    };
  }, [autoPlay, playing, reducedMotion, items.length]);

  useEffect(() => {
    if (!autoPlay || items.length < 2) return;
    // Have the next still ready before the slideshow advances.
    const next = new window.Image();
    next.src = items[(index + 1) % items.length].src;
  }, [autoPlay, index, items]);

  const move = (direction: number) => { setPlaying(false); setIndex((current) => (current + direction + items.length) % items.length); };
  if (!item) return null;
  const picture = <Image key={item.src} src={item.src} alt={item.alt} fill unoptimized={item.src.startsWith('/about/')} sizes={expanded ? '90vw' : '(max-width: 767px) 85vw, 45vw'} className="object-contain" style={item.crop === 'portrait' ? { objectFit: 'cover', objectPosition: '50% 50%' } : undefined} />;
  return <figure ref={root} className={`journey-gallery${expanded ? ' journey-gallery-expanded' : ''}`} aria-label={title} data-interactive-story data-slideshow={autoPlay || undefined}>
    <div className="journey-gallery-image">{item.crop === 'portrait' ? <div className="journey-gallery-crop">{picture}</div> : picture}</div>
    <figcaption><span id={id} aria-live={autoPlay && playing && !reducedMotion ? 'off' : 'polite'}>{item.caption}{items.length > 1 && <small>{index + 1} / {items.length}</small>}</span>{items.length > 1 && <div>
      {autoPlay && !reducedMotion && <button type="button" aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying(!playing)}><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>{playing ? <path d="M3 2h3v12H3zm7 0h3v12h-3z" /> : <path d="m4 2 10 6-10 6z" />}</svg></button>}
      <button type="button" aria-label={`Previous image in ${title}`} aria-describedby={id} onClick={() => move(-1)}>←</button><button type="button" aria-label={`Next image in ${title}`} aria-describedby={id} onClick={() => move(1)}>→</button>
    </div>}</figcaption>
  </figure>;
}
