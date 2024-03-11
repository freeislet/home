import { useCallback, ChangeEvent } from 'react'

import { Handle, Position, NodeProps } from 'reactflow'

const handleStyle = { left: 10 }

function TextUpdaterNode({ data, isConnectable }: NodeProps) {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value)
  }, [])

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  )
}

export default TextUpdaterNode
