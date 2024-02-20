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
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

function ReactFlowView() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <MiniMap />
      <Controls />
      <Panel position="top-center">
        <div className="border-border border-2 p-1 rounded-md bg-secondary">Panel test</div>
      </Panel>
      <NodeToolbar />
      <NodeResizer />
    </ReactFlow>
  )
}

export default ReactFlowView
