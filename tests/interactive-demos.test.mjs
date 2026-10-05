import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { WORKFLOW_CHALLENGES, checkWorkflow, connectWorkflow, inputKey } from '../lib/node-workflow.ts';
import { DEMO_KIT, updateKit } from '../lib/equipment-demo.ts';

function solve(challenge) {
  return Object.fromEntries(challenge.nodes.flatMap((node) => node.inputs.map((input) => [inputKey(node.id, input.id), input.source])));
}

test('every challenge can be solved through its visible ports and has existing saved imagery', () => {
  for (const challenge of WORKFLOW_CHALLENGES) {
    let connections = {};
    for (const node of challenge.nodes) for (const input of node.inputs) connections = connectWorkflow(challenge, connections, input.source, node.id, input.id);
    assert.equal(checkWorkflow(challenge, connections).complete, true);
    assert.ok(challenge.images.length > 0);
    for (const image of challenge.images) assert.ok(fs.existsSync(path.join(process.cwd(), 'public', image.src)), image.src);
  }
});

test('missing inputs and swapped references cannot unlock a result', () => {
  for (const challenge of WORKFLOW_CHALLENGES) {
    assert.equal(checkWorkflow(challenge, {}).complete, false);
    const missing = solve(challenge);
    delete missing['generate.model'];
    assert.equal(checkWorkflow(challenge, missing).complete, false);
    const swapped = { ...solve(challenge), 'generate.garment': 'model', 'generate.model': 'garment' };
    assert.equal(checkWorkflow(challenge, swapped).complete, false);
    assert.equal(checkWorkflow(challenge, swapped).problems.length, 2);
  }
});

test('delivery cannot bypass human review', () => {
  const challenge = WORKFLOW_CHALLENGES[2];
  const bypassed = { ...solve(challenge), 'delivery.approved': 'generate' };
  assert.equal(checkWorkflow(challenge, bypassed).complete, false);
  assert.equal(checkWorkflow(challenge, bypassed).problems[0].source, 'review');
});

test('invalid, self and output-only connections do not change the graph', () => {
  const challenge = WORKFLOW_CHALLENGES[0];
  const connections = solve(challenge);
  for (const [source, target, input] of [['missing', 'generate', 'model'], ['generate', 'generate', 'model'], ['preview', 'generate', 'model'], ['model', 'generate', 'missing']]) {
    assert.equal(connectWorkflow(challenge, connections, source, target, input), connections);
  }
  const replaced = connectWorkflow(challenge, connections, 'garment', 'generate', 'model');
  assert.equal(checkWorkflow(challenge, replaced).complete, false);
  assert.equal(checkWorkflow(challenge, connections).complete, true);
});

test('kit check-out and return update ownership without changing the starting inventory', () => {
  const checkedOut = updateKit(DEMO_KIT, { type: 'borrow', id: 'CAM-01', team: 'Motion team' });
  assert.equal(checkedOut[0].status, 'on-loan');
  assert.equal(checkedOut[0].team, 'Motion team');
  assert.equal(DEMO_KIT[0].status, 'available');
  const returned = updateKit(checkedOut, { type: 'return', id: 'CAM-01' });
  assert.equal(returned[0].status, 'available');
  assert.equal(returned[0].team, undefined);
});

test('kit on loan or in repair cannot be borrowed, and unknown teams cannot borrow', () => {
  for (const action of [
    { type: 'borrow', id: 'LGT-02', team: 'Motion team' },
    { type: 'borrow', id: 'AUD-04', team: 'Studio team' },
    { type: 'return', id: 'AUD-04' },
    { type: 'borrow', id: 'CAM-01', team: 'Unknown team' },
    { type: 'borrow', id: 'not-a-kit', team: 'Motion team' },
  ]) assert.deepEqual(updateKit(DEMO_KIT, action), DEMO_KIT);
});
