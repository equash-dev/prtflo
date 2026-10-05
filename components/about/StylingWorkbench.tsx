'use client';

import Image from 'next/image';
import { STYLING_COPY as copy, STYLING_GROUPS, type DemoLook } from '@/config/batch-demo';
import type { StyledOutput, StylingSelection } from '@/lib/styling-demo';

export function StylingWorkbench({ selection, output, presets, onChange }: {
  selection: StylingSelection; output?: StyledOutput; presets: DemoLook[];
  onChange: (selection: StylingSelection) => void;
}) {
  const look = presets.find((item) => item.id === selection.top);
  if (!look) return null;
  const views = STYLING_GROUPS.find((group) => group.id === 'pose')!.options;
  return <div className="indicative-outfit">
    <figure className="indicative-outfit-photo">
      <div><Image src={look.stylingReference} alt={`${look.name}, styled with ${look.wornWith.map((item) => item.label.toLowerCase()).join(', ')}`} fill sizes="(max-width: 767px) 45vw, 40vw" className="object-contain" /></div>
      <figcaption>{copy.reference}</figcaption>
    </figure>
    <div className="indicative-outfit-details">
      <div><p className="indicative-outfit-kicker">Existing ecommerce look / {look.id}</p><h5>{look.name}</h5></div>
      <div><h6>{copy.classification}</h6><dl>{look.wornWith.map((item) => <div key={item.category}><dt>{item.category}</dt><dd>{item.label}</dd></div>)}</dl></div>
      {look.stylingNote && <p className="indicative-outfit-note">{look.stylingNote}</p>}
      <fieldset className="indicative-outfit-views"><legend>{copy.selection}</legend><div>{views.map((view) => <button type="button" key={view.id} aria-pressed={selection.pose === view.id} onClick={() => onChange({ ...selection, pose: view.id })}>{view.label}</button>)}</div></fieldset>
      {output && <div className="indicative-primary-preview"><Image src={output.primary} width={48} height={64} alt="Selected primary image for the example pipeline" /><p>This saved view will lead the shot set.</p></div>}
      <p className="indicative-outfit-note">{copy.note}</p>
    </div>
  </div>;
}
