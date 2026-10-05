'use client';

import { useId, useState } from 'react';
import { DEMO_KIT, DEMO_TEAMS, updateKit, type KitStatus } from '@/lib/equipment-demo';

const statusLabels = { available: 'Available', 'on-loan': 'On loan', maintenance: 'In repair' };

export function EquipmentDemo() {
  const [items, setItems] = useState(DEMO_KIT);
  const [team, setTeam] = useState(DEMO_TEAMS[0]);
  const [filter, setFilter] = useState<'all' | KitStatus>('all');
  const [activity, setActivity] = useState<string[]>([]);
  const [message, setMessage] = useState('Try checking out the camera kit, then find it under On loan.');
  const teamId = useId();

  function change(id: string, type: 'borrow' | 'return') {
    const item = items.find((item) => item.id === id)!;
    const updated = updateKit(items, { type, id, team });
    if (updated.find((item) => item.id === id) === item) return;
    const entry = type === 'borrow' ? `${item.name} checked out to ${team}.` : `${item.name} returned to ${item.location.toLowerCase()}.`;
    setItems(updated); setActivity((log) => [entry, ...log].slice(0, 4)); setMessage(entry);
  }

  return <div className="equipment-demo" data-interactive-story>
    <div className="demo-intro"><div><p className="demo-kicker">Production tools / interactive example</p><h3>Who’s got the camera?</h3><p>Check kit out to a team. Find it. Bring it back.</p></div><p className="demo-disclosure">A fictional kit register to try here. Changes stay in this demo.</p></div>
    <div className="equipment-summary">{(['available', 'on-loan', 'maintenance'] as const).map((status) => <div key={status}><strong>{items.filter((item) => item.status === status).length}</strong><span>{statusLabels[status]}</span></div>)}</div>
    <div className="equipment-toolbar"><div className="equipment-filters" role="group" aria-label="Filter equipment">{(['all', 'available', 'on-loan'] as const).map((value) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{value === 'all' ? 'All kit' : statusLabels[value]}</button>)}</div><label htmlFor={teamId}>Borrow for <select id={teamId} value={team} onChange={(event) => setTeam(event.target.value)}>{DEMO_TEAMS.map((name) => <option key={name}>{name}</option>)}</select></label></div>
    <ul className="equipment-list">{items.filter((item) => filter === 'all' || item.status === filter).map((item) => <li key={item.id}>
      <div><span className="demo-kicker">{item.id}</span><h4>{item.name}</h4><p>{item.status === 'on-loan' ? item.team : item.location}</p></div><span className="equipment-status" data-status={item.status}>{statusLabels[item.status]}</span><button type="button" disabled={item.status === 'maintenance'} onClick={() => change(item.id, item.status === 'on-loan' ? 'return' : 'borrow')}>{item.status === 'on-loan' ? 'Return kit' : item.status === 'maintenance' ? 'In repair' : 'Check out'}<span className="sr-only"> {item.name}</span></button>
    </li>)}</ul>
    {!items.some((item) => filter === 'all' || item.status === filter) && <p className="equipment-empty">No kit in this view. Try All kit.</p>}
    <p className="equipment-feedback" role="status">{message}</p>
    <div className="equipment-activity"><div><p className="demo-kicker">Activity</p>{activity.length ? <ol>{activity.map((entry, index) => <li key={`${index}-${entry}`}>{entry}</li>)}</ol> : <p>Your check-outs and returns will appear here.</p>}</div><button type="button" onClick={() => { setItems(DEMO_KIT); setFilter('all'); setTeam(DEMO_TEAMS[0]); setActivity([]); setMessage('Demo reset. The camera is back on the shelf.'); }}>Reset demo</button></div>
  </div>;
}
