'use client';

import { useId, useState } from 'react';
import { InlineShowreel } from './InlineShowreel';

export interface JourneyVideo { src: string; poster?: string; title: string }

export function JourneyVideoGallery({ items, title }: { items: readonly JourneyVideo[]; title: string }) {
  const [index, setIndex] = useState(0);
  const caption = useId();
  const item = items[index];
  if (!item) return null;

  return <figure className="journey-video-gallery" aria-label={title} data-interactive-story>
    <div className="journey-video-stage"><InlineShowreel key={item.src} {...item} /></div>
    <figcaption>
      <span id={caption} aria-live="polite">{item.title}<small>{index + 1} / {items.length}</small></span>
      {items.length > 1 && <div>
        <button type="button" aria-label={`Previous video in ${title}`} aria-describedby={caption} onClick={() => setIndex((index - 1 + items.length) % items.length)}>←</button>
        <button type="button" aria-label={`Next video in ${title}`} aria-describedby={caption} onClick={() => setIndex((index + 1) % items.length)}>→</button>
      </div>}
    </figcaption>
  </figure>;
}
