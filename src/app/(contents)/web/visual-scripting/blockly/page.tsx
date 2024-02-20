'use client'

import { useRef, useState } from 'react'

import BlocklyWorkspace, { BlocklyWorkspaceOptions, WorkspaceInstance } from '@/components/blockly-workspace'
import options from '@/components/blockly/options-default'
import toolbox from '@/components/blockly/toolbox-example'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function BlocklyPage() {
  const blocklyRef = useRef<any>()
  const workspaceOptions: BlocklyWorkspaceOptions = {
    backupOnUnload: true,
    onCreate: (workspace: WorkspaceInstance) => {
      initCodeGen()
    },
    onDispose: (workspace: WorkspaceInstance) => {
      WorkspaceInstance.uninitCodeGen()
    },
  }

  const handleRun = () => {
    blocklyRef.current?.run()
  }
  const handleClear = () => {
    blocklyRef.current?.clear()
  }

  const [codeOpen, setCodeOpen] = useState(false)
  const codeRef = useRef('')
  const handleGenerateCode = () => {
    codeRef.current = blocklyRef.current?.generateCode()
    setCodeOpen(true)
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
        <Dialog open={codeOpen} onOpenChange={setCodeOpen}>
          <DialogContent className="max-w-6xl">
            <DialogHeader>
              <DialogTitle>Generated Code</DialogTitle>
            </DialogHeader>
            {!codeRef.current ? <span>생성된 코드가 없습니다.</span> : <div>{codeRef.current}</div>}
          </DialogContent>
        </Dialog>
      </div>
      <BlocklyWorkspace ref={blocklyRef} options={options} toolbox={toolbox} workspaceOptions={workspaceOptions} />
    </div>
  )
}

/**
 * 코드생성 초기화
 */

declare global {
  interface Window {
    blPrint: (text: string) => void
  }
}

function initCodeGen() {
  window.blPrint = (text: string) => console.log(text)

  WorkspaceInstance.initCodeGen({
    customPrint: 'blPrint',
  })
}
