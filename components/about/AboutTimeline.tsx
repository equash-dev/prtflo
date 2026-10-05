'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Link from 'next/link';
import { JOURNEY } from '@/config/journey';
import { SITE } from '@/config/site';
import { journeyFrame } from '@/lib/journey-frames';

interface Chapter { id: string; number: string; label: string; color: readonly [number, number, number] }

export function AboutTimeline({ chapters, children, label }: {
  chapters: readonly Chapter[];
  children: ReactNode;
  label: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const navigate = useRef<(index: number, focus?: boolean) => void>(() => {});
  const currentIndex = useRef(0);
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<'story' | 'read'>('story');
  const copy = JOURNEY.controls;

  useEffect(() => {
    const container = root.current;
    const viewport = stage.current;
    if (!container || !viewport) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Full chapter copy stays in normal flow on small screens and at high zoom.
    const compact = window.matchMedia('(max-width: 1000px), (max-height: 740px)');
    const sections = chapters.map((chapter) => container.querySelector<HTMLElement>(`#${chapter.id}`)!);
    let frame = 0;
    let pendingFocus: number | null = null;
    let initialized = false;
    let geometry = { top: 0, stride: 1 };
    let animations: Animation[] = [];
    let drag: { id: number; x: number; y: number; scroll: number; started: boolean } | null = null;

    const isStory = () => mode === 'story' && !compact.matches;
    const top = () => geometry.top;
    const stride = () => geometry.stride;
    const clearScene = (section: HTMLElement) => {
      section.inert = false;
      section.removeAttribute('aria-hidden');
      section.removeAttribute('data-active');
      section.removeAttribute('data-near');
      section.removeAttribute('data-rest');
      section.style.removeProperty('--scene-opacity');
      section.style.removeProperty('--scene-offset');
      section.style.removeProperty('--scene-distance');
      section.style.removeProperty('--frame-inset');
      section.style.removeProperty('--panel-edge');
    };

    const update = () => {
      frame = 0;
      const story = isStory();
      const position = story ? Math.max(0, Math.min(chapters.length - 1, (window.scrollY - top()) / stride())) : 0;
      let index = Math.round(position);
      if (!story) sections.forEach((section, item) => { if (section.getBoundingClientRect().top <= 160) index = item; });
      const changed = index !== currentIndex.current;
      const focusedScene = sections.find((section) => section.contains(document.activeElement));
      sections.forEach((section, item) => {
        if (!story) { clearScene(section); return; }
        const delta = item - position;
        const geometry = journeyFrame(delta, reducedMotion.matches);
        section.style.setProperty('--frame-inset', `${geometry.foregroundInset}%`);
        section.style.setProperty('--panel-edge', `${geometry.panelEdge}%`);
        section.style.setProperty('--scene-opacity', String(reducedMotion.matches ? Number(item === index) : Math.max(0, Math.min(1, (1.5 - Math.abs(delta)) * 2))));
        section.style.setProperty('--scene-distance', reducedMotion.matches ? '0' : String(Math.max(-2, Math.min(2, delta))));
        section.dataset.active = String(item === index);
        section.dataset.near = String(reducedMotion.matches ? item === index : Math.abs(delta) < 1.5);
        section.dataset.rest = String(item === index && (reducedMotion.matches || Math.abs(delta) < .001));
        section.inert = item !== index;
        section.setAttribute('aria-hidden', String(item !== index));
        if (changed && item !== index) section.querySelectorAll('video').forEach((video) => video.pause());
      });
      currentIndex.current = index;
      if (changed) setActive(index);
      if ((pendingFocus === index && (!story || Math.abs(position - index) < .05)) || (story && changed && focusedScene)) {
        sections[index].querySelector<HTMLElement>('h1, h2')?.focus({ preventScroll: true });
        pendingFocus = null;
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };

    const go = (index: number, focus = false) => {
      if (index < 0 || index >= chapters.length) return;
      if (menu.current) menu.current.open = false;
      pendingFocus = focus ? index : null;
      const adjacent = Math.abs(index - currentIndex.current) === 1;
      window.scrollTo({ top: isStory() ? top() + index * stride() : sections[index].getBoundingClientRect().top + window.scrollY - 88, behavior: focus && adjacent && isStory() && !reducedMotion.matches ? 'smooth' : 'instant' });
      animations.forEach((animation) => animation.cancel());
      animations = [];
      if (focus && !adjacent && isStory() && !reducedMotion.matches) {
        sections[index].querySelectorAll<HTMLElement>('.story-copy, .story-visual').forEach((element) => {
          animations.push(element.animate([
            { opacity: .6, translate: `${element.classList.contains('story-visual') ? 8 : 4}px 0` },
            { opacity: 1, translate: '0 0' },
          ], { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' }));
        });
      }
      schedule();
    };
    navigate.current = (index, focus) => {
      if (chapters[index]) window.history.pushState(null, '', `#${chapters[index].id}`);
      sections[index]?.dispatchEvent(new Event('journey:overview'));
      go(index, focus);
    };
    const followHash = () => {
      const index = chapters.findIndex((chapter) => `#${chapter.id}` === window.location.hash);
      if (index >= 0) go(index);
    };
    const layout = () => {
      const index = currentIndex.current;
      const wasStory = container.dataset.enhanced === 'true';
      const story = isStory();
      const position = Math.max(0, Math.min(chapters.length - 1, (window.scrollY - top()) / stride()));
      container.dataset.enhanced = String(story);
      geometry = {
        top: container.getBoundingClientRect().top + window.scrollY,
        stride: Math.max(1, (container.offsetHeight - viewport.offsetHeight) / Math.max(1, chapters.length - 1)),
      };
      if (!initialized) { initialized = true; followHash(); }
      else if (wasStory !== story) go(index);
      // Preserve progress on resize; mobile browser chrome must not reset reading position.
      else if (story) window.scrollTo({ top: top() + position * stride(), behavior: 'instant' });
      schedule();
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const index = chapters.findIndex((chapter) => `#${chapter.id}` === anchor?.getAttribute('href'));
      if (index < 0) return;
      event.preventDefault();
      navigate.current(index, true);
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.open) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); return; }
      if (!isStory() || document.querySelector('dialog[open]') || menu.current?.open || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement;
      if (target.closest('button, a, summary, input, textarea, select, video, [data-interactive-story], [contenteditable="true"]')) return;
      const index = currentIndex.current;
      const next = event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'PageDown' || (event.key === ' ' && !event.shiftKey);
      const previous = event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp' || (event.key === ' ' && event.shiftKey);
      const destination = next ? Math.min(chapters.length - 1, index + 1) : previous ? Math.max(0, index - 1) : event.key === 'Home' ? 0 : event.key === 'End' ? chapters.length - 1 : null;
      if (destination === null) return;
      event.preventDefault();
      navigate.current(destination, true);
    };
    const canDrag = (target: EventTarget | null) => target instanceof Element && target.closest('.timeline-scenes') && !target.closest('a, button, input, textarea, select, summary, dialog, video, [data-interactive-story], [contenteditable="true"]');
    const pointerdown = (event: PointerEvent) => {
      if (!isStory() || event.button !== 0 || !canDrag(event.target)) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, scroll: window.scrollY, started: false };
    };
    const pointermove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!drag.started) {
        if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
        if (Math.abs(dx) < 8) return;
        drag.started = true;
        container.setPointerCapture(event.pointerId);
        container.dataset.dragging = 'true';
      }
      if (event.cancelable) event.preventDefault();
      const width = container.querySelector('.timeline-scenes')!.getBoundingClientRect().width;
      window.scrollTo({ top: drag.scroll - dx * stride() / Math.max(1, width), behavior: 'instant' });
      schedule();
    };
    const pointerup = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
      drag = null;
      delete container.dataset.dragging;
    };
    const wheel = (event: WheelEvent) => {
      if (!isStory() || event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      // Links and chapter buttons should not become dead spots for a trackpad.
      // Embedded tools and the open chapter menu retain their own scrolling.
      if (!(event.target instanceof Element) || event.target.closest('.timeline-menu-links, input, textarea, select, video, [data-interactive-story], [contenteditable="true"]')) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      window.scrollBy({ top: event.deltaX * unit, behavior: 'instant' });
    };
    const preventImageDrag = (event: DragEvent) => { if (canDrag(event.target)) event.preventDefault(); };

    layout();
    container.addEventListener('click', click);
    container.addEventListener('pointerdown', pointerdown);
    container.addEventListener('pointermove', pointermove);
    container.addEventListener('pointerup', pointerup);
    container.addEventListener('pointercancel', pointerup);
    container.addEventListener('wheel', wheel, { passive: false });
    container.addEventListener('dragstart', preventImageDrag);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', layout);
    window.addEventListener('hashchange', followHash);
    window.addEventListener('keydown', keydown);
    reducedMotion.addEventListener('change', schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      animations.forEach((animation) => animation.cancel());
      container.removeEventListener('click', click);
      container.removeEventListener('pointerdown', pointerdown);
      container.removeEventListener('pointermove', pointermove);
      container.removeEventListener('pointerup', pointerup);
      container.removeEventListener('pointercancel', pointerup);
      container.removeEventListener('wheel', wheel);
      container.removeEventListener('dragstart', preventImageDrag);
      if (drag && container.hasPointerCapture(drag.id)) container.releasePointerCapture(drag.id);
      delete container.dataset.dragging;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', layout);
      window.removeEventListener('hashchange', followHash);
      window.removeEventListener('keydown', keydown);
      reducedMotion.removeEventListener('change', schedule);
      sections.forEach(clearScene);
      delete container.dataset.enhanced;
    };
  }, [chapters, mode]);

  return (
    <div ref={root} className="about-timeline" data-mode={mode} style={{ '--scene-count': chapters.length } as CSSProperties}>
      <div ref={stage} className="timeline-stage">
        <nav aria-label={label} className="timeline-navigation">
          <Link className="timeline-brand" href="/" aria-label={copy.portfolio}>{SITE.brandName}<span aria-hidden>↖</span></Link>
          <span className="timeline-nav-title">About / {label.replace(/\.$/, '')}</span>
          <details ref={menu} className="timeline-menu">
            <summary>{copy.chapters}<span aria-hidden>+</span></summary>
            <div className="timeline-menu-links">
              {chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === index ? 'step' : undefined}><span className="timeline-nav-number">{chapter.number}</span>{chapter.label}</a>)}
              <button type="button" className="timeline-mode" onClick={() => { if (menu.current) menu.current.open = false; window.history.replaceState(null, '', `#${chapters[active].id}`); setMode(mode === 'story' ? 'read' : 'story'); }}>{mode === 'story' ? copy.read : copy.story}</button>
            </div>
          </details>
          <a className="timeline-cv-shortcut" href="#cv">View {JOURNEY.cvLabel}<span aria-hidden>↗</span></a>
        </nav>
        <div className="timeline-scenes">{children}</div>
        <div className="timeline-controls">
          <div className="timeline-position"><span className="timeline-current" aria-live="polite" aria-atomic="true"><span>{chapters[active].number}</span>{chapters[active].label}</span><span className="timeline-hint">{copy.hint}</span></div>
          <nav className="timeline-progress" aria-label={copy.progress}>{chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-label={chapter.label} aria-current={active === index ? 'step' : undefined}><span>{chapter.number}</span></a>)}</nav>
          <div className="timeline-arrows"><button type="button" aria-label={copy.previous} disabled={active === 0} onClick={() => navigate.current(active - 1, true)}>←</button><button type="button" aria-label={copy.next} disabled={active === chapters.length - 1} onClick={() => navigate.current(active + 1, true)}>→</button></div>
        </div>
      </div>
    </div>
  );
}
