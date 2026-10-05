'use client';

import { useEffect, useState } from 'react';

const messages = ['Loading the model…', 'Finding the garment. Mostly.', 'Negotiating with the sleeves…', 'Saving something resembling clothing.', 'Done. Technically.'];
const verdicts = ['A bold interpretation of where shoulders go.', 'The fabric appears to be leaving the conversation.', 'Excellent. The sleeves have become one.'];

export function TerminalExperiment() {
  const [garment, setGarment] = useState('tee');
  const [phase, setPhase] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const running = phase > 0 && phase < messages.length;
  const finished = phase === messages.length;
  const variant = Math.max(0, attempt - 1) % verdicts.length;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setPhase((value) => value + 1), 420);
    return () => window.clearTimeout(timer);
  }, [phase, running]);

  return <div className="terminal-experiment" data-interactive-story>
    <header><span>LOCAL / TRY_ON.PY</span><span>Early days</span></header>
    <div className="terminal-stage">
      <div className="terminal-output" data-result={finished ? variant : 'idle'} data-garment={garment}>
        <svg viewBox="0 0 260 300" role="img" aria-label={finished ? `Illustrated failed try-on: ${verdicts[variant]}` : 'Illustrated mannequin ready for a virtual try-on'}>
          <ellipse cx="130" cy="282" rx="74" ry="6" fill="#c8c7bd" />
          <g fill="#d0cec2" stroke="#aaa89b" strokeWidth="1.5"><circle cx="130" cy="42" r="21" /><path d="M109 65L151 65 179 106 169 179 155 173 159 113 151 105 150 192 144 274 130 274 127 202 123 274 109 274 106 191 109 105 101 113 105 173 91 179 81 106Z" /></g>
          {finished && <g className="vton-garment"><path d="M106 73L119 69Q130 82 141 69L154 73 182 102 166 122 153 110 159 178Q130 186 101 178L107 110 94 122 78 102Z" fill={garment === 'tee' ? '#4f5c8e' : '#d0a370'} stroke="#313b62" strokeWidth="2" />{garment === 'shirt' && <path d="M130 80V178M114 94H152M108 116H153M104 140H156M102 163H158" stroke="#655134" strokeWidth="3" />}</g>}
        </svg>
        <p>{running ? 'This is going to be brilliant.' : finished ? verdicts[variant] : 'One garment. One person. What could go wrong?'}</p>
      </div>
      <div className="terminal-console" aria-label="Simulated terminal output">
        <p><span aria-hidden>~ $ </span>python try_on.py --garment {garment}.png</p>
        <ol>{messages.slice(0, phase).map((message, index) => <li key={message}><span>{String(index + 1).padStart(2, '0')}</span>{message}</li>)}</ol>
        {!phase && <p className="terminal-idle">Ready when you are.<span aria-hidden> ▍</span></p>}
      </div>
    </div>
    <footer><label>Garment<select value={garment} disabled={running} onChange={(event) => { setGarment(event.target.value); setPhase(0); }}><option value="tee">Classic tee</option><option value="shirt">Striped shirt</option></select></label><button type="button" disabled={running} onClick={() => { setAttempt((value) => value + 1); setPhase(1); }}>{running ? 'Trying its best…' : finished ? 'Try again' : 'Run experiment'} <span aria-hidden>↗</span></button></footer>
    <p className="experiment-disclosure" role="status">{finished ? 'Simulation complete. ' : ''}An illustrated recreation, not an original result or a live model.</p>
  </div>;
}
