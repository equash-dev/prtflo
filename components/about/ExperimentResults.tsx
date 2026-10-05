'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ExperimentResults({ items }: { items: { src: string | null; alt: string; caption: string }[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index];
  if (!item) return null;
  const move = (direction: number) => setIndex((value) => (value + direction + items.length) % items.length);
  return <div className="experiment-results" data-interactive-story>
    <header><strong>50,000</strong><div><span>images in the training corpus</span><p>One computer questioning my life choices.</p></div></header>
    <figure tabIndex={0} aria-label="Machine learning results slideshow" onKeyDown={(event) => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); event.stopPropagation(); move(event.key === 'ArrowLeft' ? -1 : 1); } }}>
      <div className="experiment-slide" key={index}>
        {item.src ? <Image src={item.src} alt={item.alt} fill unoptimized sizes="(max-width: 1000px) 90vw, 48vw" className="object-contain" /> : <div className="experiment-pending"><span>RESULT / {String(index + 1).padStart(2, '0')}</span><span aria-hidden>?</span><p>Original experiment image to follow</p></div>}
      </div>
      <figcaption><p aria-live="polite">{item.caption}</p><div><span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><button type="button" aria-label="Previous machine learning result" onClick={() => move(-1)}>←</button><button type="button" aria-label="Next machine learning result" onClick={() => move(1)}>→</button></div></figcaption>
    </figure>
  </div>;
}
