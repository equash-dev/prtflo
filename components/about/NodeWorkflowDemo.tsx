'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { WORKFLOW_BOARD, COMPACT_WORKFLOW_BOARD, clampWorkflowPosition, checkWorkflow, connectWorkflow, inputKey, type WorkflowChallenge, type WorkflowNode } from '@/lib/node-workflow';

export function NodeWorkflowDemo({ challenges }: { challenges: WorkflowChallenge[] }) {
  const [round, setRound] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const advanced = useRef(false);
  useEffect(() => { if (advanced.current) container.current?.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true }); }, [round]);
  if (!challenges.length) return <p>The workflow is being prepared.</p>;
  return <div className="node-demo-root" ref={container}><NodeRound key={round} challenge={challenges[round]} round={round} total={challenges.length} next={() => { advanced.current = true; setRound((round + 1) % challenges.length); }} /></div>;
}

function initialPositions(challenge: WorkflowChallenge, compact: boolean) {
  const mobile: Record<string, [number, number]> = { garment: [16, 16], model: [270, 16], pose: [16, 130], generate: [270, 130], review: [16, 290], delivery: [270, 408], preview: [270, 310] };
  return Object.fromEntries(challenge.nodes.map((node) => [node.id, compact ? { x: mobile[node.id]?.[0] ?? 16, y: mobile[node.id]?.[1] ?? 16 } : { x: node.x, y: node.y }]));
}

function NodeRound({ challenge, round, total, next }: { challenge: WorkflowChallenge; round: number; total: number; next: () => void }) {
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [positions, setPositions] = useState(() => initialPositions(challenge, false));
  const [layout, setLayout] = useState({ compact: false, scale: 1 });
  const [runs, setRuns] = useState(0);
  const [checked, setChecked] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState('Drag an output to an input, or click the two ports. Drag titles to move nodes.');
  const [wire, setWire] = useState<{ source: string; x: number; y: number; target: string | null } | null>(null);
  const wireDrag = useRef<{ source: string; pointer: number; x: number; y: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const canvas = useRef<HTMLDivElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const drag = useRef<{ id: string; pointer: number; x: number; y: number; startX: number; startY: number; scale: number } | null>(null);
  const pending = useRef<{ id: string; x: number; y: number } | null>(null);
  const frame = useRef(0);
  const compactRef = useRef(false);
  const result = checkWorkflow(challenge, connections);
  const board = layout.compact ? COMPACT_WORKFLOW_BOARD : WORKFLOW_BOARD;

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const compact = width < 600;
      const dimensions = compact ? COMPACT_WORKFLOW_BOARD : WORKFLOW_BOARD;
      setLayout({ compact, scale: Math.min(1, width / dimensions.width, height / dimensions.height) });
      if (compact !== compactRef.current) { compactRef.current = compact; setPositions(initialPositions(challenge, compact)); drag.current = null; }
    });
    observer.observe(element);
    return () => { observer.disconnect(); window.cancelAnimationFrame(frame.current); };
  }, [challenge]);
  useEffect(() => { if (showResult) resultHeading.current?.focus({ preventScroll: true }); }, [showResult]);

  function flush() {
    frame.current = 0;
    const point = pending.current;
    if (point) { setPositions((current) => ({ ...current, [point.id]: { x: point.x, y: point.y } })); pending.current = null; }
  }
  function move(node: WorkflowNode, x: number, y: number) {
    pending.current = { id: node.id, ...clampWorkflowPosition(node, x, y, board) };
    if (!frame.current) frame.current = window.requestAnimationFrame(flush);
  }
  function onMove(event: PointerEvent<HTMLButtonElement>, node: WorkflowNode) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== node.id || gesture.pointer !== event.pointerId) return;
    event.preventDefault(); event.stopPropagation();
    move(node, gesture.x + (event.clientX - gesture.startX) / gesture.scale, gesture.y + (event.clientY - gesture.startY) / gesture.scale);
  }
  function release(event: PointerEvent<HTMLButtonElement>) {
    window.cancelAnimationFrame(frame.current); flush(); drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, node: WorkflowNode) {
    const offsets: Record<string, [number, number]> = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
    const offset = offsets[event.key];
    if (!offset) return;
    event.preventDefault(); event.stopPropagation();
    move(node, positions[node.id].x + offset[0], positions[node.id].y + offset[1]);
  }
  function plug(node: WorkflowNode, port: string) {
    const key = inputKey(node.id, port);
    if (!selected) {
      if (!connections[key]) { setMessage('Pick an output first: the square on the right of a node.'); return; }
      setConnections((current) => { const updated = { ...current }; delete updated[key]; return updated; });
      setMessage('Connection removed.');
    } else {
      const updated = connectWorkflow(challenge, connections, selected, node.id, port);
      if (updated === connections) { setMessage('A node cannot connect to itself. Try another input.'); return; }
      setConnections(updated); setSelected(null); setMessage('Connected. Click a connected input to unplug it.');
    }
    setChecked(false); setSolved(false);
  }
  function wireTarget(x: number, y: number, source: string) {
    let closest: { node: string; port: string; distance: number } | null = null;
    canvas.current?.querySelectorAll<HTMLElement>('[data-wire-node]').forEach((element) => {
      if (element.dataset.wireNode === source) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.hypot(Math.max(rect.left - 12 - x, 0, x - rect.right), Math.max(rect.top - y, 0, y - rect.bottom));
      if (distance <= 18 && (!closest || distance < closest.distance)) closest = { node: element.dataset.wireNode!, port: element.dataset.wirePort!, distance };
    });
    return closest as { node: string; port: string; distance: number } | null;
  }
  function dragWire(event: PointerEvent<HTMLButtonElement>) {
    const gesture = wireDrag.current;
    if (!gesture || gesture.pointer !== event.pointerId) return;
    event.preventDefault(); event.stopPropagation();
    if (!gesture.moved && Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) < 4) return;
    gesture.moved = true;
    const rect = canvas.current?.querySelector('.node-board')?.getBoundingClientRect();
    if (!rect) return;
    const target = wireTarget(event.clientX, event.clientY, gesture.source);
    const node = target && challenge.nodes.find((node) => node.id === target.node);
    const point = node && target ? { x: positions[node.id].x, y: positions[node.id].y + 58 + node.inputs.findIndex((input) => input.id === target.port) * 28 } : { x: (event.clientX - rect.left) / layout.scale, y: (event.clientY - rect.top) / layout.scale };
    setWire({ source: gesture.source, ...point, target: target ? inputKey(target.node, target.port) : null });
  }
  function releaseWire(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const gesture = wireDrag.current;
    if (!gesture || gesture.pointer !== event.pointerId) return;
    if (gesture.moved) {
      suppressClick.current = true;
      const target = !cancelled && wireTarget(event.clientX, event.clientY, gesture.source);
      if (target) {
        setConnections((current) => connectWorkflow(challenge, current, gesture.source, target.node, target.port));
        setSelected(null); setChecked(false); setSolved(false); setMessage('Connected. Drag another wire, or run the workflow.');
      } else if (!cancelled) { setSelected(gesture.source); setMessage('Output selected. Drop a wire on an input, or click one to connect.'); }
    }
    wireDrag.current = null; setWire(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function run() {
    setRuns((value) => value + 1); setChecked(true); setSolved(result.complete);
    if (result.complete) { setMessage(round === total - 1 ? 'Reviewed and ready. Your imaginary studio is open.' : 'That works. One less thing to do by hand.'); setShowResult(true); }
    else {
      const problem = result.problems[0];
      const node = challenge.nodes.find((node) => node.id === problem.node)!;
      setMessage(`${node.label}: ${connections[problem.key] ? 'wrong source for' : 'missing'} the ${problem.label.toLowerCase()} input.`);
    }
  }
  function hint() {
    const problem = result.problems[0];
    if (!problem) { setMessage('All connected. Run the workflow to check it.'); return; }
    const source = challenge.nodes.find((node) => node.id === problem.source)!;
    const target = challenge.nodes.find((node) => node.id === problem.node)!;
    setSelected(source.id); setMessage(`${source.label} is selected. Connect it to ${target.label} → ${problem.label}.`);
  }
  function reset() {
    window.cancelAnimationFrame(frame.current); frame.current = 0; pending.current = null; drag.current = null;
    wireDrag.current = null; setWire(null);
    setConnections({}); setSelected(null); setRuns(0); setChecked(false); setSolved(false); setShowResult(false);
    setPositions(initialPositions(challenge, layout.compact)); setMessage('Clean slate. Choose an output, then an input.');
  }

  return <div className="node-game" data-interactive-story>
    <header className="node-game-heading"><div><p className="demo-kicker">Challenge {round + 1} / {total} · {Object.keys(connections).length} / {result.total} connected</p><h3 tabIndex={-1}>{challenge.title}</h3></div><div className="node-game-tools"><button type="button" onClick={hint} disabled={showResult}>Hint</button><button type="button" onClick={reset}>Reset</button></div></header>
    <div className="node-play-area">
      <div ref={canvas} className="node-canvas-viewport" aria-label="Workflow canvas" hidden={showResult}>
        <div className="node-board" style={{ width: board.width, height: board.height, transform: `translate(-50%, -50%) scale(${layout.scale})` }}>
          <svg viewBox={`0 0 ${board.width} ${board.height}`} aria-hidden className="node-wires">{challenge.nodes.flatMap((node) => node.inputs.map((input, index) => {
            const sourceId = connections[inputKey(node.id, input.id)];
            if (!sourceId || !positions[sourceId]) return null;
            const from = positions[sourceId]; const to = positions[node.id];
            const sx = from.x + board.nodeWidth; const sy = from.y + 22;
            const ex = to.x; const ey = to.y + 58 + index * 28;
            return <path key={inputKey(node.id, input.id)} d={`M ${sx} ${sy} C ${sx + 60} ${sy}, ${ex - 60} ${ey}, ${ex} ${ey}`} data-wrong={checked && sourceId !== input.source} />;
          }))}{wire && <path className="node-wire-preview" d={`M ${positions[wire.source].x + board.nodeWidth} ${positions[wire.source].y + 22} C ${positions[wire.source].x + board.nodeWidth + 60} ${positions[wire.source].y + 22}, ${wire.x - 60} ${wire.y}, ${wire.x} ${wire.y}`} />}</svg>
          {challenge.nodes.map((node) => <section key={node.id} className="workflow-node" style={{ transform: `translate3d(${positions[node.id].x}px, ${positions[node.id].y}px, 0)`, width: board.nodeWidth }} aria-label={node.label}>
            <button className="node-drag" type="button" aria-label={`Move ${node.label}. Use arrow keys or drag.`} onKeyDown={(event) => onKey(event, node)} onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.preventDefault(); event.stopPropagation(); event.currentTarget.focus({ preventScroll: true });
              drag.current = { id: node.id, pointer: event.pointerId, ...positions[node.id], startX: event.clientX, startY: event.clientY, scale: layout.scale };
              event.currentTarget.setPointerCapture(event.pointerId);
            }} onPointerMove={(event) => onMove(event, node)} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={() => { drag.current = null; }}>{node.label}</button>
            {node.output && <button type="button" className="node-port node-output" aria-label={`Output from ${node.label}`} aria-pressed={selected === node.id || wire?.source === node.id} onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.stopPropagation(); event.currentTarget.focus({ preventScroll: true }); suppressClick.current = false;
              wireDrag.current = { source: node.id, pointer: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
              event.currentTarget.setPointerCapture(event.pointerId);
            }} onPointerMove={dragWire} onPointerUp={(event) => releaseWire(event)} onPointerCancel={(event) => releaseWire(event, true)} onLostPointerCapture={() => { wireDrag.current = null; setWire(null); }} onClick={() => {
              if (suppressClick.current) { suppressClick.current = false; return; }
              setSelected(selected === node.id ? null : node.id); setMessage(selected === node.id ? 'Output deselected.' : `${node.label} selected. Now choose an input.`);
            }}><span /></button>}
            <div className="node-inputs">{node.inputs.length ? node.inputs.map((input) => <div className="node-input-row" key={input.id} data-wire-node={node.id} data-wire-port={input.id} data-wire-over={wire?.target === inputKey(node.id, input.id)}><button type="button" className="node-port" data-connected={!!connections[inputKey(node.id, input.id)]} aria-label={`${input.label} input on ${node.label}${connections[inputKey(node.id, input.id)] ? ', connected. Select without an output to disconnect.' : ''}`} onClick={() => plug(node, input.id)}><span /></button><span>{input.label}</span></div>) : <p>{node.kind}</p>}</div>
          </section>)}
        </div>
      </div>
      {showResult && <div className="node-result-view"><div><p className="demo-kicker">{round === total - 1 ? 'All three connected' : 'Workflow connected'}</p><h4 ref={resultHeading} tabIndex={-1}>{round === total - 1 ? 'Coffee earned.' : 'There’s your result.'}</h4><p>Saved PRTFLO imagery. No live generation.</p></div><div className="node-result-images">{challenge.images.map((item) => <div key={item.src}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 600px) 45vw, 300px" className="object-contain" /></div>)}</div></div>}
    </div>
    <footer className="node-game-footer"><p role="status">{message}</p><div>{showResult ? <><button type="button" onClick={() => setShowResult(false)}>Back to nodes</button><button type="button" className="demo-primary" onClick={next}>{round === total - 1 ? 'Play again' : 'Next challenge'} →</button></> : <><span className="node-run-count">{runs} {runs === 1 ? 'run' : 'runs'}</span><button type="button" className="demo-primary" onClick={solved ? () => setShowResult(true) : run}>{solved ? 'View result' : 'Run workflow'} ↗</button></>}</div></footer>
  </div>;
}
