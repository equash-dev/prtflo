export type KitStatus = 'available' | 'on-loan' | 'maintenance';
export interface DemoKit { id: string; name: string; location: string; status: KitStatus; team?: string }
export const DEMO_TEAMS = ['Motion team', 'Studio team', 'Video team'];
export const DEMO_KIT: DemoKit[] = [
  { id: 'CAM-01', name: 'Camera kit', location: 'Equipment store / A1', status: 'available' },
  { id: 'LGT-02', name: 'LED lighting kit', location: 'Equipment store / B2', status: 'on-loan', team: 'Video team' },
  { id: 'SUP-03', name: 'Tripod & head', location: 'Equipment store / A3', status: 'available' },
  { id: 'AUD-04', name: 'Wireless mic kit', location: 'Service desk', status: 'maintenance' },
];

export function updateKit(items: DemoKit[], action: { type: 'borrow' | 'return'; id: string; team?: string }): DemoKit[] {
  return items.map((item) => {
    if (item.id !== action.id) return item;
    if (action.type === 'borrow' && item.status === 'available' && action.team && DEMO_TEAMS.includes(action.team)) return { ...item, status: 'on-loan', team: action.team };
    if (action.type === 'return' && item.status === 'on-loan') { const returned = { ...item, status: 'available' as const }; delete returned.team; return returned; }
    return item;
  });
}
