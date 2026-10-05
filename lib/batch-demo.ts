// Pure demo state: actual generation and production delivery are never invoked.
export type DemoDecision = 'pending' | 'approved' | 'held';
export interface BatchState { step: number; furthest: number; decisions: Record<string, DemoDecision>; ready: Record<string, boolean> }
export type BatchAction =
  | { type: 'advance' }
  | { type: 'visit'; step: number }
  | { type: 'decide'; id: string; decision: DemoDecision }
  | { type: 'configure'; id: string; ready: boolean }
  | { type: 'reset' };

export function createBatchState(ids: string[]): BatchState {
  return { step: 0, furthest: 0, decisions: Object.fromEntries(ids.map((id) => [id, 'pending'])), ready: Object.fromEntries(ids.map((id) => [id, true])) };
}

export function canProduce(state: BatchState): boolean {
  const ids = Object.keys(state.decisions);
  return ids.length > 0 && ids.every((id) => state.ready[id] === true);
}

export function canDeliver(state: BatchState): boolean {
  const decisions = Object.values(state.decisions);
  return canProduce(state) && decisions.every((item) => item !== 'pending') && decisions.includes('approved');
}

export function batchReducer(state: BatchState, action: BatchAction): BatchState {
  if (action.type === 'reset') return createBatchState(Object.keys(state.decisions));
  if (action.type === 'configure') {
    if (!Object.hasOwn(state.decisions, action.id)) return state;
    return { ...createBatchState(Object.keys(state.decisions)), ready: { ...state.ready, [action.id]: action.ready } };
  }
  if (action.type === 'visit') {
    return Number.isInteger(action.step) && action.step >= 0 && action.step <= state.furthest ? { ...state, step: action.step } : state;
  }
  if (action.type === 'decide') {
    if (state.step !== 4 || !Object.hasOwn(state.decisions, action.id)) return state;
    return { ...state, furthest: 4, decisions: { ...state.decisions, [action.id]: action.decision } };
  }
  if (state.step >= 5 || !canProduce(state) || (state.step === 4 && !canDeliver(state))) return state;
  return { ...state, step: state.step + 1, furthest: Math.max(state.furthest, state.step + 1) };
}

export function approvedIds(state: BatchState): string[] {
  return state.step === 5 && canDeliver(state) ? Object.keys(state.decisions).filter((id) => state.decisions[id] === 'approved') : [];
}
