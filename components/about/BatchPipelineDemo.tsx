'use client';

import Image from 'next/image';
import { useReducer, useState } from 'react';
import { BATCH_DEMO, STYLING_COPY, STYLING_GROUPS, type DemoLook } from '@/config/batch-demo';
import { approvedIds, batchReducer, canDeliver, canProduce, createBatchState } from '@/lib/batch-demo';
import { matchingOutput, outputAssets, type StyledOutput, type StylingSelection } from '@/lib/styling-demo';
import { StylingWorkbench } from './StylingWorkbench';

export function BatchPipelineDemo({ looks, outputs }: { looks: DemoLook[]; outputs: StyledOutput[] }) {
  const [state, dispatch] = useReducer(batchReducer, looks.map((look) => look.id), createBatchState);
  const [selectedId, setSelectedId] = useState(looks[0]?.id);
  const [selections, setSelections] = useState<Record<string, StylingSelection>>(() => Object.fromEntries(looks.map((look) => [look.id, { ...look.styling }])));
  const [notice, setNotice] = useState('');
  const selected = looks.find((look) => look.id === selectedId) ?? looks[0];
  const copy = BATCH_DEMO;
  if (!selected) return null;
  const step = copy.steps[state.step];
  const approved = looks.filter((look) => approvedIds(state).includes(look.id));
  const selection = selections[selected.id];
  const output = matchingOutput(selection, outputs);
  const describe = (value: StylingSelection) => STYLING_GROUPS.map((group) => group.options.find((item) => item.id === value[group.id])?.label).filter(Boolean).join(' / ');
  const configure = (value: StylingSelection) => {
    if (Object.keys(value).every((key) => value[key as keyof StylingSelection] === selection[key as keyof StylingSelection])) return;
    setSelections((current) => ({ ...current, [selected.id]: value }));
    dispatch({ type: 'configure', id: selected.id, ready: !!matchingOutput(value, outputs) });
    setNotice(STYLING_COPY.changed);
  };
  const reset = () => {
    setSelections(Object.fromEntries(looks.map((look) => [look.id, { ...look.styling }])));
    dispatch({ type: 'reset' }); setSelectedId(looks[0]?.id); setNotice('');
  };
  const decision = state.decisions[selected.id];
  const decisionLabels = { pending: copy.labels.pending, approved: copy.labels.approved, held: copy.labels.held };

  const download = (brief = false) => {
    if (!brief && !approved.length) return;
    const contents = JSON.stringify({ demo: true, illustrative: true, description: copy.disclosure, looks: (brief ? looks : approved).map((look) => {
      const saved = matchingOutput(selections[look.id], outputs);
      return { id: look.id, styling: selections[look.id], styledWith: look.wornWith, stylingNote: look.stylingNote, stylingReference: look.stylingReference, description: describe(selections[look.id]), status: brief ? 'brief' : 'approved', assets: !brief && saved ? outputAssets(saved) : undefined };
    }) }, null, 2);
    const url = URL.createObjectURL(new Blob([contents], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = brief ? 'prtflo-outfit-brief.json' : 'prtflo-demo-delivery.json';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const frames = !output ? [] : state.step === 1 ? [{ src: output.primary, label: copy.labels.primary }]
    : state.step === 2 ? [{ src: output.back, label: copy.labels.back }]
    : state.step === 3 ? output.derivatives.map((src, index) => ({ src, label: `${copy.labels.derivative} ${index + 1}` }))
    : [{ src: output.primary, label: copy.labels.primary }, { src: output.back, label: copy.labels.back }, ...output.derivatives.map((src, index) => ({ src, label: `${copy.labels.derivative} ${index + 1}` }))];

  return (
    <div className="batch-demo">
      <div className="batch-demo-heading"><p>{copy.disclosure}</p><button type="button" onClick={reset}>{copy.labels.reset}</button></div>
      <ol className="batch-steps" aria-label={copy.title}>
        {copy.steps.map((item, index) => <li key={item.label}><button type="button" aria-current={state.step === index ? 'step' : undefined} disabled={index > state.furthest} onClick={() => dispatch({ type: 'visit', step: index })}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button></li>)}
      </ol>
      <div className="batch-workspace">
        <div className="batch-queue" role="group" aria-label={copy.labels.queue}>
          {looks.map((look, index) => <button type="button" key={look.id} aria-pressed={look.id === selected.id} onClick={() => setSelectedId(look.id)}><strong>{STYLING_COPY.look} {String(index + 1).padStart(2, '0')}</strong><span>{look.name}</span><Image className="batch-queue-image" src={look.stylingReference} alt="" width={66} height={88} /><span data-status={state.decisions[look.id]}>{!state.ready[look.id] ? STYLING_COPY.needsOutput : state.furthest >= 4 ? decisionLabels[state.decisions[look.id]] : copy.labels.queue}</span></button>)}
        </div>
        <div className="batch-preview">
          <div aria-live="polite" aria-atomic="true" className="batch-stage-label"><h4>{step.label}</h4><p>{step.detail}</p></div>
          <div className="batch-stage-body" data-step={state.step}>
          {state.step === 0 ? <><StylingWorkbench selection={selection} output={output} presets={looks} onChange={configure} /><p className="sr-only" role="status">{notice}</p></> : state.step === 5 ? (
            <div className="batch-delivery">
              {approved.map((look) => <div key={look.id}><Image src={matchingOutput(selections[look.id], outputs)!.primary} alt={describe(selections[look.id])} width={90} height={120} /><span>{look.id}<br />{describe(selections[look.id])}</span><span>{copy.labels.approved}</span></div>)}
              <button type="button" className="batch-primary" onClick={() => download()}>{copy.labels.manifest} <span aria-hidden>↓</span></button>
            </div>
          ) : (
            <>
              <div className={`batch-frames ${frames.length === 1 ? 'batch-frames-single' : ''}`}>
                {frames.map((frame) => <figure key={frame.src}><div><Image src={frame.src} alt={`${selected.name}: ${frame.label}`} fill sizes="(max-width: 767px) 80vw, 30vw" className="object-contain" /></div><figcaption>{frame.label}</figcaption></figure>)}
              </div>
              {state.step === 4 && <div className="batch-review" role="group" aria-label={`${step.label}: ${selected.name}`}>
                <button type="button" aria-pressed={decision === 'approved'} onClick={() => dispatch({ type: 'decide', id: selected.id, decision: 'approved' })}>{copy.labels.approve}</button>
                <button type="button" aria-pressed={decision === 'held'} onClick={() => dispatch({ type: 'decide', id: selected.id, decision: 'held' })}>{copy.labels.hold}</button>
                {decision === 'held' && <button type="button" onClick={() => dispatch({ type: 'decide', id: selected.id, decision: 'pending' })}>{copy.labels.reviewAgain}</button>}
                <span role="status">{decisionLabels[decision]}</span>
              </div>}
            </>
          )}
          </div>
          <div className="batch-actions">
            {state.step < 5 && <button type="button" className="batch-primary" disabled={!canProduce(state) || (state.step === 4 && !canDeliver(state))} onClick={() => dispatch({ type: 'advance' })}>{state.step === 4 ? copy.labels.ready : `${copy.labels.next}: ${copy.steps[state.step + 1].label}`} <span aria-hidden>→</span></button>}
            {state.step === 0 && <button type="button" onClick={() => download(true)}>{STYLING_COPY.brief} <span aria-hidden>↓</span></button>}
            {state.step > 0 && state.step < 5 && <button type="button" onClick={() => dispatch({ type: 'visit', step: 0 })}>{STYLING_COPY.edit}</button>}
            {!canProduce(state) && <p>{STYLING_COPY.blocked}</p>}
            {state.step === 4 && <p>{copy.labels.reviewHint}</p>}
            {state.step === 5 && <p role="status">{copy.labels.complete}</p>}
          </div>
        </div>
      </div>
      <p className="batch-provenance">{copy.provenance}</p>
    </div>
  );
}
