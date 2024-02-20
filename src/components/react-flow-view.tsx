'use client'

import { useCallback } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  Panel,
  NodeToolbar,
  NodeResizer,
  Connection,
  SelectionMode,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { initialNodes, initialEdges } from './reactflow/example'

const nodeColor = (node: any) => {
  switch (node.type) {
    case 'input':
      return '#6ede87'
    case 'output':
      return '#6865A5'
    default:
      return '#ff0072'
  }
}

function ReactFlowView() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // const [nodes, setNodes] = useState(initialNodes)
  // const [edges, setEdges] = useState(initialEdges)
  //
  // const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes])
  // const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges])

  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

  const options = {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    // figma-like viewport controls
    selectionMode: SelectionMode.Partial,
    selectionOnDrag: true,
    panOnDrag: [1, 2],
    panOnScroll: true,
    // fit to initialNodes bounds (test)
    fitView: true,
  }

  return (
    <ReactFlow {...options}>
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      <Controls />
      <Panel position="top-center" className="p-2 rounded-md shadow bg-secondary">
        {/* <div className="border-border border-2 p-1 rounded-md bg-secondary"> */}
        Panel test
        {/* </div> */}
      </Panel>
      <NodeToolbar />
      <NodeResizer />
    </ReactFlow>
  )
}

export default ReactFlowView
