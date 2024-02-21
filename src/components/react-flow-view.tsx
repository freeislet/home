'use client'

import { useRef, useCallback } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  Panel,
  NodeToolbar,
  NodeResizer,
} from 'reactflow'
import 'reactflow/dist/style.css'

import './reactflow/reactflow.css'
import {
  nodeTypes,
  initialNodes,
  initialEdges,
  styleOptions,
  viewportControlOptions,
  getNodeColor,
} from './reactflow/example'
import { Button } from './ui/button'

export interface ReactFlowViewProps {
  className?: string
}

function ReactFlowView({ className }: ReactFlowViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

  const options = {
    nodeTypes,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    fitView: true,
    ...styleOptions,
    ...viewportControlOptions,
  }

  return (
    <ReactFlowProvider>
      <ReactFlow className={className} {...options}>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <MiniMap nodeColor={getNodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Controls />
        <ReactFlowPanel />
        <NodeToolbar />
        <NodeResizer />
      </ReactFlow>
    </ReactFlowProvider>
  )
}

function ReactFlowPanel() {
  const reactFlowInstance = useReactFlow()
  const nodeId = useRef(0)
  const handleAddNode = useCallback(() => {
    const id = `new-${++nodeId.current}`
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    }
    reactFlowInstance.addNodes(newNode)
  }, [])

  return (
    <Panel position="top-left" className="p-2 space-x-2 rounded-md shadow bg-secondary">
      <span>Panel 테스트</span>
      <Button size="sm" onClick={() => window.alert('클릭!')}>
        버튼
      </Button>
      <Button size="sm" variant="outline" onClick={handleAddNode}>
        노드 추가
      </Button>
    </Panel>
  )
}

export default ReactFlowView
