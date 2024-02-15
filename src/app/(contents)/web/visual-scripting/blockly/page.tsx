'use client'

import { useRef } from 'react'

import BlocklyWorkspace, { type BlocklyOptions } from '@/components/blockly-workspace'
import toolbox from '@/components/blockly/toolbox-example'
import { Button } from '@/components/ui/button'
import { handleClientScriptLoad } from 'next/script'

export default function BlocklyPage() {
  const blocklyRef = useRef<any>()
  const options: BlocklyOptions = { toolbox }

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
