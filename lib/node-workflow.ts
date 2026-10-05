export interface WorkflowNode {
  id: string;
  label: string;
  kind: string;
  x: number;
  y: number;
  inputs: { id: string; label: string; source: string }[];
  output: boolean;
}

export interface WorkflowChallenge {
  title: string;
  brief: string;
  nodes: WorkflowNode[];
  images: { src: string; alt: string }[];
}

export const WORKFLOW_BOARD = { width: 900, height: 380, nodeWidth: 174 };
export const COMPACT_WORKFLOW_BOARD = { width: 460, height: 520, nodeWidth: 174 };
export const workflowNodeHeight = (node: WorkflowNode) => node.inputs.length ? 52 + node.inputs.length * 28 : 72;
export function clampWorkflowPosition(node: WorkflowNode, x: number, y: number, board = WORKFLOW_BOARD) {
  return {
    x: Math.max(16, Math.min(board.width - board.nodeWidth - 16, Number.isFinite(x) ? x : 16)),
    y: Math.max(16, Math.min(board.height - workflowNodeHeight(node) - 16, Number.isFinite(y) ? y : 16)),
  };
}
export const inputKey = (node: string, input: string) => `${node}.${input}`;

const garment = { id: 'garment', label: 'Garment reference', kind: 'INPUT / 01', x: 24, y: 24, inputs: [], output: true };
const model = { id: 'model', label: 'Model reference', kind: 'INPUT / 02', x: 24, y: 152, inputs: [], output: true };
const pose = { id: 'pose', label: 'Pose reference', kind: 'INPUT / 03', x: 24, y: 280, inputs: [], output: true };
const generate = (withPose: boolean): WorkflowNode => ({
  id: 'generate', label: 'Create the look', kind: 'GENERATION', x: 286, y: 122, output: true,
  inputs: [
    { id: 'garment', label: 'Garment', source: 'garment' },
    { id: 'model', label: 'Model', source: 'model' },
    ...(withPose ? [{ id: 'pose', label: 'Pose', source: 'pose' }] : []),
  ],
});
const preview: WorkflowNode = { id: 'preview', label: 'Preview', kind: 'OUTPUT', x: 642, y: 152, output: false, inputs: [{ id: 'image', label: 'Image', source: 'generate' }] };
const image = (file: string) => ({ src: `/products/men/heavyweight-boxy-tee/${file}.webp`, alt: `Saved PRTFLO tee imagery, view ${file}` });

export const WORKFLOW_CHALLENGES: WorkflowChallenge[] = [
  { title: 'Make the first look.', brief: 'Give the generator a garment and a model, then send the result to Preview.', nodes: [garment, model, generate(false), preview], images: [image('01')] },
  { title: 'A little direction.', brief: 'The outfit is right. Now add a pose reference before you preview it.', nodes: [garment, model, pose, generate(true), preview], images: [image('02')] },
  { title: 'Someone should check that.', brief: 'Build the look, send it through human review, then deliver the approved result.', nodes: [garment, model, pose, generate(true),
    { id: 'review', label: 'Human review', kind: 'QUALITY CHECK', x: 532, y: 28, output: true, inputs: [{ id: 'image', label: 'Image', source: 'generate' }] },
    { id: 'delivery', label: 'Delivery', kind: 'OUTPUT', x: 694, y: 280, output: false, inputs: [{ id: 'approved', label: 'Approved image', source: 'review' }] },
  ], images: [image('01'), image('03'), image('04')] },
];

export function checkWorkflow(challenge: WorkflowChallenge, connections: Record<string, string>) {
  const ports = challenge.nodes.flatMap((node) => node.inputs.map((input) => ({ ...input, node: node.id, key: inputKey(node.id, input.id) })));
  const problems = ports.filter((port) => connections[port.key] !== port.source);
  return { complete: ports.length > 0 && problems.length === 0, correct: ports.length - problems.length, total: ports.length, problems };
}

export function connectWorkflow(challenge: WorkflowChallenge, connections: Record<string, string>, source: string, target: string, port: string) {
  const from = challenge.nodes.find((node) => node.id === source);
  const to = challenge.nodes.find((node) => node.id === target);
  if (!from?.output || source === target || !to?.inputs.some((input) => input.id === port)) return connections;
  return { ...connections, [inputKey(target, port)]: source };
}
