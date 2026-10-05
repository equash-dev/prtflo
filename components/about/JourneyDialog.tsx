'use client';

import { useId, useRef, type ReactNode } from 'react';
import { JOURNEY } from '@/config/journey';

export function JourneyDialog({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button className="story-action" type="button" onClick={() => dialog.current?.showModal()}>{label}<span aria-hidden>↗</span></button>
      <dialog ref={dialog} className="journey-dialog" aria-labelledby={titleId} onClose={() => dialog.current?.querySelectorAll('video').forEach((video) => video.pause())} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
      }}>
        <div className="journey-dialog-header"><h2 id={titleId}>{title}</h2><button type="button" onClick={() => dialog.current?.close()}>{JOURNEY.controls.close}<span aria-hidden>×</span></button></div>
        <div className="journey-dialog-content">{children}</div>
      </dialog>
    </>
  );
}
