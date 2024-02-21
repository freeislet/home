import { SelectionMode, NodeTypes, Node, Edge, Position } from 'reactflow'

import TextUpdaterNode from './nodes/text-updater'

export const styleOptions = {
  style: {
    backgroundColor: '#B8CEFF',
  },
  defaultEdgeOptions: {
    animated: true,
    style: {
      stroke: 'white',
    },
  },
  connectionLineStyle: {
    stroke: 'white',
  },
}

export const viewportControlOptions = {
  selectionMode: SelectionMode.Partial,
  // figma-like viewport controls
  // selectionOnDrag: true,
  // panOnDrag: [1, 2],
  // panOnScroll: true,
}

export const getNodeColor = (node: Node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87'
    case 'output':
      return '#6865A5'
    default:
      return '#ff0072'
  }
}

export const nodeTypes: NodeTypes = {
  textUpdater: TextUpdaterNode,
}

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#6ede87', color: 'white' },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 350, y: 125 },
    style: { backgroundColor: '#ff0072', color: 'white' },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
    style: { backgroundColor: '#6865A5', color: 'white' },
  },
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 25 },
    data: { value: 123 },
  },
  {
    id: 'node-2',
    type: 'output',
    targetPosition: Position.Top,
    position: { x: -100, y: 150 },
    data: { label: 'node 2' },
  },
  {
    id: 'node-3',
    type: 'output',
    targetPosition: Position.Top,
    position: { x: 60, y: 150 },
    data: { label: 'node 3' },
  },
]

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
  { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
]
