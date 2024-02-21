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

import './reactflow/reactflow.css'
import { nodeTypes, initialNodes, initialEdges, reactflowStyle, minimapNodeColor } from './reactflow/example'
import { Button } from './ui/button'

export interface ReactFlowViewProps {
  className?: string
}

function ReactFlowView({ className }: ReactFlowViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // const [nodes, setNodes] = useState(initialNodes)
  // const [edges, setEdges] = useState(initialEdges)
  //
  // const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes])
  // const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges])

  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

  const options = {
    nodeTypes,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    style: reactflowStyle,
    // fit to initialNodes bounds (test)
    fitView: true,
    // figma-like viewport controls
    selectionMode: SelectionMode.Partial,
    selectionOnDrag: true,
    panOnDrag: [1, 2],
    panOnScroll: true,
  }

  return (
    <ReactFlow className={className} {...options}>
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <MiniMap nodeColor={minimapNodeColor} nodeStrokeWidth={3} zoomable pannable />
      <Controls />
      <Panel position="top-left" className="p-2 space-x-2 rounded-md shadow bg-secondary">
        <span>Panel 테스트</span>
        <Button size="sm" onClick={() => window.alert('클릭!')}>
          버튼
        </Button>
      </Panel>
      <NodeToolbar />
      <NodeResizer />
    </ReactFlow>
  )
}

export default ReactFlowView
