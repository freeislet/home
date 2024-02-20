'use client'

import { useCallback } from 'react'
import { LiteGraph, LGraph, LGraphCanvas } from 'litegraph.js'

function LiteGraphCanvas() {
  const canvasRef = useCallback((node: HTMLCanvasElement) => {
    const graph = new LGraph()
    const canvas = new LGraphCanvas(node, graph)

    const node_const: any = LiteGraph.createNode('basic/const')
    node_const.pos = [200, 200]
    node_const.setValue(4.5)
    graph.add(node_const)

    const node_watch = LiteGraph.createNode('basic/watch')
    node_watch.pos = [700, 200]
    graph.add(node_watch)

    node_const.connect(0, node_watch, 0)

    graph.start()
  }, [])

  return <canvas ref={canvasRef} width="1024" height="720" className="border-[1px]"></canvas>
}

export default LiteGraphCanvas
