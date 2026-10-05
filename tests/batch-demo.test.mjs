import test from 'node:test';
import assert from 'node:assert/strict';
import { createBatchState, batchReducer, canDeliver, canProduce, approvedIds } from '../lib/batch-demo.ts';

const review = () => {
  let state = createBatchState(['a', 'b']);
  for (let index = 0; index < 4; index++) state = batchReducer(state, { type: 'advance' });
  return state;
};

test('future stages and early approval cannot skip the workflow', () => {
  const state = createBatchState(['a', 'b']);
  assert.deepEqual(batchReducer(state, { type: 'visit', step: 5 }), state);
  assert.deepEqual(batchReducer(state, { type: 'visit', step: -1 }), state);
  assert.deepEqual(batchReducer(state, { type: 'decide', id: 'a', decision: 'approved' }), state);
});

test('review blocks delivery until every look has a decision', () => {
  let state = review();
  state = batchReducer(state, { type: 'decide', id: 'a', decision: 'approved' });
  assert.equal(canDeliver(state), false);
  assert.equal(batchReducer(state, { type: 'advance' }).step, 4);
  state = batchReducer(state, { type: 'decide', id: 'b', decision: 'held' });
  state = batchReducer(state, { type: 'advance' });
  assert.equal(state.step, 5);
  assert.deepEqual(approvedIds(state), ['a']);
});

test('all-held and empty batches cannot be delivered', () => {
  let state = review();
  for (const id of ['a', 'b']) state = batchReducer(state, { type: 'decide', id, decision: 'held' });
  assert.equal(canDeliver(state), false);
  assert.equal(canDeliver(createBatchState([])), false);
  assert.deepEqual(approvedIds(batchReducer(state, { type: 'advance' })), []);
});

test('changing a decision invalidates the prior delivery preview', () => {
  let state = review();
  for (const id of ['a', 'b']) state = batchReducer(state, { type: 'decide', id, decision: 'approved' });
  state = batchReducer(state, { type: 'advance' });
  state = batchReducer(state, { type: 'visit', step: 4 });
  state = batchReducer(state, { type: 'decide', id: 'a', decision: 'pending' });
  assert.equal(state.furthest, 4);
  assert.equal(batchReducer(state, { type: 'visit', step: 5 }).step, 4);
  assert.deepEqual(approvedIds(state), []);
  assert.deepEqual(batchReducer(state, { type: 'reset' }), createBatchState(['a', 'b']));
});

test('restyling invalidates approvals and prevents delivery of an old outfit', () => {
  let state = review();
  for (const id of ['a', 'b']) state = batchReducer(state, { type: 'decide', id, decision: 'approved' });
  state = batchReducer(state, { type: 'advance' });
  state = batchReducer(state, { type: 'configure', id: 'a', ready: false });
  assert.equal(state.step, 0);
  assert.equal(state.furthest, 0);
  assert.deepEqual(state.decisions, { a: 'pending', b: 'pending' });
  assert.equal(canProduce(state), false);
  assert.deepEqual(approvedIds(state), []);
  assert.equal(batchReducer(state, { type: 'advance' }).step, 0);
  assert.equal(batchReducer(state, { type: 'visit', step: 5 }).step, 0);
  state = batchReducer(state, { type: 'configure', id: 'b', ready: true });
  assert.equal(canProduce(state), false);
  state = batchReducer(state, { type: 'configure', id: 'a', ready: true });
  assert.equal(batchReducer(state, { type: 'advance' }).step, 1);
});

test('empty batches cannot start and unknown jobs cannot change the batch', () => {
  const empty = createBatchState([]);
  assert.equal(canProduce(empty), false);
  assert.deepEqual(batchReducer(empty, { type: 'advance' }), empty);
  const state = createBatchState(['a']);
  assert.deepEqual(batchReducer(state, { type: 'configure', id: 'unknown', ready: false }), state);
});
