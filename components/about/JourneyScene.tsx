'use client';

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';

interface SceneState {
  active: string | null;
  panelId: (name: string) => string;
  open: (name: string, trigger: HTMLButtonElement) => void;
  close: () => void;
}

const SceneContext = createContext<SceneState | null>(null);
function useScene() {
  const scene = useContext(SceneContext);
  if (!scene) throw new Error('Journey panels must be inside a JourneyScene.');
  return scene;
}

export function JourneyScene({ children }: { children: ReactNode }) {
  const id = useId();
  const [active, setActive] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const previous = useRef<string | null>(null);
  const previousFit = useRef(false);

  useEffect(() => {
    root.current?.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
      if (video.closest('[hidden]')) video.pause();
    });
    const reading = root.current?.closest('.about-timeline')?.getAttribute('data-enhanced') === 'false';
    if (active) {
      const panel = document.getElementById(`${id}-${active}`);
      previousFit.current = panel?.dataset.fit === 'true';
      panel?.querySelector<HTMLElement>('[data-panel-heading]')?.focus({ preventScroll: true });
      if (reading && panel?.dataset.fit === 'true') window.scrollTo({ top: window.scrollY + panel.getBoundingClientRect().top - 76, behavior: 'instant' });
    } else if (previous.current) {
      trigger.current?.focus({ preventScroll: true });
      if (reading && root.current && previousFit.current) window.scrollTo({ top: window.scrollY + root.current.getBoundingClientRect().top - 88, behavior: 'instant' });
    }
    previous.current = active;
  }, [active, id]);

  useEffect(() => {
    const scene = root.current;
    const chapter = scene?.closest('.timeline-chapter');
    if (!active || !scene || !chapter) return;
    // Returning to a chapter should reveal its introduction again. Avoid
    // moving focus back to the old trigger while navigating away.
    const leave = () => { previous.current = null; setActive(null); };
    chapter.addEventListener('journey:overview', leave);
    const navigation = new MutationObserver(() => {
      if (chapter.getAttribute('data-active') === 'false') leave();
    });
    navigation.observe(chapter, { attributes: true, attributeFilter: ['data-active'] });
    const visibility = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) leave();
    });
    visibility.observe(scene);
    return () => { chapter.removeEventListener('journey:overview', leave); navigation.disconnect(); visibility.disconnect(); };
  }, [active]);

  return <SceneContext.Provider value={{ active, panelId: (name) => `${id}-${name}`, open: (name, button) => { trigger.current = button; setActive(active === name ? null : name); }, close: () => setActive(null) }}>
    <div ref={root} className="story-scene" data-panel-open={active !== null} onKeyDown={(event) => {
      if (event.key === 'Escape' && active) { event.preventDefault(); event.stopPropagation(); setActive(null); }
    }}>{children}</div>
  </SceneContext.Provider>;
}

export function JourneyOpen({ panel, children }: { panel: string; children: ReactNode }) {
  const scene = useScene();
  return <button className="story-action" type="button" aria-controls={scene.panelId(panel)} aria-expanded={scene.active === panel} onClick={(event) => scene.open(panel, event.currentTarget)}>{children}<span aria-hidden>{scene.active === panel ? '−' : '→'}</span></button>;
}

export function JourneySurface({ children, panels = [] }: { children: ReactNode; panels?: { id: string; title: string; content: ReactNode; fit?: boolean }[] }) {
  const scene = useScene();
  const panel = panels.find((item) => item.id === scene.active);
  return <div className="journey-surface" data-open={!!panel}>
    <div className="journey-surface-overview" hidden={!!panel}>{children}</div>
    {panel && <section key={`open-${panel.id}`} id={scene.panelId(panel.id)} className="journey-surface-panel" data-fit={panel.fit || undefined} aria-labelledby={`${scene.panelId(panel.id)}-title`} data-interactive-story tabIndex={0}>
      <header className="journey-surface-header"><h3 id={`${scene.panelId(panel.id)}-title`} tabIndex={-1} data-panel-heading>{panel.title}</h3><button type="button" onClick={scene.close}>Back to the story <span aria-hidden>×</span></button></header>
      <div className="journey-surface-content">{panel.content}</div>
    </section>}
  </div>;
}
