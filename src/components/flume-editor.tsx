'use client'

import { useState, useCallback } from 'react'
import { NodeEditor, NodeMap } from 'flume'

import '@/style/flume.css'
import config from './flume/config'
import Homepage from './flume/homepage-example'
import { exampleNodes } from './flume/node-example'

export function FlumeEditor() {
  const [nodes, setNodes] = useState<NodeMap>(exampleNodes)

  const handleChange = useCallback((nodes: NodeMap) => {
    setNodes(nodes)
  }, [])

  return (
    <div className="flume grid grid-cols-[auto_20rem]">
      <NodeEditor portTypes={config.portTypes} nodeTypes={config.nodeTypes} nodes={nodes} onChange={handleChange} />
      <Homepage nodes={nodes} />
    </div>
  )
}
