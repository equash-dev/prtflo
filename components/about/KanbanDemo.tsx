'use client';

import { useEffect, useRef, useState } from 'react';

const totalJobs = 468;

function JobCount() {
  const [count, setCount] = useState(totalJobs);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const chapter = element.closest('.timeline-chapter');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let started = false;
    let current = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    const stop = () => { if (timer !== null) clearInterval(timer); timer = null; };
    const sync = () => {
      if (!visible || chapter?.getAttribute('data-active') === 'false') { stop(); started = false; current = 0; return; }
      if (reducedMotion.matches) { stop(); current = totalJobs; setCount(totalJobs); return; }
      if (document.hidden) { stop(); return; }
      if (current === totalJobs || timer !== null) return;
      if (!started) { started = true; setCount(0); }
      timer = setInterval(() => {
        current = Math.min(totalJobs, current + 2);
        setCount(current);
        if (current === totalJobs) stop();
      }, 20);
    };
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && entry.intersectionRatio >= .5; sync(); }, { threshold: [0, .5] });
    visibility.observe(element);
    const activity = new MutationObserver(sync);
    if (chapter) activity.observe(chapter, { attributes: true, attributeFilter: ['data-active'] });
    document.addEventListener('visibilitychange', sync);
    const motionChanged = () => { stop(); started = false; current = 0; sync(); };
    reducedMotion.addEventListener('change', motionChanged);
    return () => { stop(); visibility.disconnect(); activity.disconnect(); document.removeEventListener('visibilitychange', sync); reducedMotion.removeEventListener('change', motionChanged); };
  }, []);
  return <strong ref={root}><span aria-hidden>{count}</span><span className="sr-only">{totalJobs}</span></strong>;
}

const columns = ['Brief in', 'Making it', 'Client review', 'Signed off'] as const;
interface DemoJob { id: string; title: string; tag: string; column: number; amendment?: string }
const clientAmends = [
  'Love it. Can we try a completely different direction?',
  'Tiny tweak: can we see the first version again?',
  'Could it pop a bit more, but quietly?',
  'All approved. Just waiting on six more people.',
];
const initialJobs: DemoJob[] = [
  { id: 'job-1', title: 'A quick tweak. New concept attached.', tag: 'Small ask', column: 0 },
  { id: 'job-2', title: 'Can we have it yesterday?', tag: 'Timing: optimistic', column: 0 },
  { id: 'job-3', title: 'Make the logo bigger. Subtly.', tag: 'In progress', column: 1 },
  { id: 'job-4', title: 'FINAL_final_v7_this_one', tag: 'Awaiting one more person', column: 2 },
  { id: 'job-5', title: 'Approved. Screenshot the email.', tag: 'A small victory', column: 3 },
];

export function KanbanDemo() {
  const [jobs, setJobs] = useState(initialJobs);
  const [selected, setSelected] = useState<string | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [message, setMessage] = useState('Drag a brief, or select one and choose a column.');
  const amendmentTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const amendmentIndex = useRef(0);

  useEffect(() => {
    const timers = amendmentTimers.current;
    return () => { timers.forEach(clearTimeout); timers.clear(); };
  }, []);

  function reset() {
    amendmentTimers.current.forEach(clearTimeout);
    amendmentTimers.current.clear();
    amendmentIndex.current = 0;
    setJobs(initialJobs); setSelected(null); setOver(null);
    setMessage('Back to Monday. The briefs have returned.');
  }

  function move(id: string, column: number) {
    const job = jobs.find((item) => item.id === id);
    if (!job) return;
    setSelected(null); setOver(null);
    if (column === job.column) return;
    const pending = amendmentTimers.current.get(id);
    if (pending !== undefined) clearTimeout(pending);
    amendmentTimers.current.delete(id);
    setJobs((items) => items.map((item) => item.id === id ? { ...item, column, amendment: undefined } : item));
    setMessage(`${job.title} → ${columns[column]}.${column === 3 ? ' Enjoy this moment.' : column === 2 ? ' Time to refresh your inbox.' : ''}`);
    if (column > job.column) {
      const amendment = clientAmends[amendmentIndex.current++ % clientAmends.length];
      amendmentTimers.current.set(id, setTimeout(() => {
        amendmentTimers.current.delete(id);
        setJobs((items) => items.map((item) => item.id === id && item.column === column ? { ...item, column: column - 1, amendment } : item));
        setMessage(`Client amend: “${amendment}” Back to ${columns[column - 1]}.`);
      }, 1200));
    }
  }

  return <div className="kanban-demo" data-interactive-story>
    <header className="kanban-impact"><JobCount /><div><span>jobs through the tool I built<br /><b>over 18 months</b></span><p>A useful step up from “it works on my machine”.</p></div></header>
    <div className="kanban-heading"><h3>A perfectly normal agency week.</h3><button type="button" onClick={reset}>Reset</button></div>
    <div className="kanban-board">{columns.map((column, index) => <section key={column} aria-label={column} data-over={over === index} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; setOver(index); }} onDragLeave={(event) => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setOver(null); }} onDrop={(event) => { event.preventDefault(); move(event.dataTransfer.getData('text/plain'), index); }}>
      <h4>{column}<span>{jobs.filter((job) => job.column === index).length}</span></h4>
      <div className="kanban-cards">{jobs.filter((job) => job.column === index).map((job) => <button key={job.id} type="button" className="kanban-card" draggable data-amended={!!job.amendment} title={job.amendment} aria-pressed={selected === job.id} onClick={() => { setSelected(selected === job.id ? null : job.id); setMessage(selected === job.id ? 'Selection cleared.' : `Selected: ${job.title} Choose a destination column.`); }} onDragStart={(event) => { event.dataTransfer.setData('text/plain', job.id); event.dataTransfer.effectAllowed = 'move'; setSelected(job.id); }} onDragEnd={() => { setOver(null); setSelected(null); }}><span>{job.amendment ? 'Client amend' : job.tag}</span><strong>{job.title}</strong><span className="kanban-card-id">{job.id.replace('job-', 'BRF / 00')}</span></button>)}</div>
      <button type="button" className="kanban-destination" disabled={!selected} aria-label={`Move selected brief to ${column}`} onClick={() => selected && move(selected, index)}>{selected ? 'Move here ↓' : '＋'}</button>
    </section>)}</div>
    <p className="kanban-feedback" role="status">{message}</p><p className="experiment-disclosure">Fictional briefs to play with. The {totalJobs} jobs over 18 months are from the real tool.</p>
  </div>;
}
