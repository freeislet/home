'use client'

import { useRef } from 'react'

import BlocklyWorkspace, { Blockly, type BlocklyOptions } from '@/components/blockly-workspace'
import toolbox from '@/components/blockly/toolbox-example'
import { Button } from '@/components/ui/button'

export default function BlocklyPage() {
  const blocklyRef = useRef<any>()
  const options: BlocklyOptions = {
    toolbox,
    toolboxPosition: 'end', // <start> | end
    horizontalLayout: false, // <false>
    grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
    zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 1, minScale: 0.3 },
    trashcan: true, // <true>
    maxTrashcanContents: 32, // <32>
    renderer: 'geras', // <geras> | thrasos | zelos(scratch-like renderer)
    theme: Blockly.Themes.Zelos,
    // media: '../../media/',
    plugins: {}, // https://developers.google.com/blockly/guides/configure/advanced/using_blockly_apis
    readOnly: false, // <false>
  }

  const handleRun = () => {
    blocklyRef.current?.run()
  }
  const handleClear = () => {
    blocklyRef.current?.clear()
  }
  const handleGenerateCode = () => {
    const code = blocklyRef.current?.generateCode()
    code && window.alert(code)
  }

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-main-height">
      <div className="my-flex-row m-2 space-x-2">
        <Button onClick={handleRun} size="sm">
          Run
        </Button>
        <Button onClick={handleClear} size="sm" variant="destructive">
          Clear
        </Button>
        <Button onClick={handleGenerateCode} size="sm" variant="outline" className="!ml-4">
          View Code
        </Button>
      </div>
      <BlocklyWorkspace ref={blocklyRef} options={options} />
    </div>
  )
}
