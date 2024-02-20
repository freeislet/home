'use client'

import { useRef, useState } from 'react'

import BlocklyWorkspace, { BlocklyWorkspaceOptions, WorkspaceInstance } from '@/components/blockly-workspace'
import options from '@/components/blockly/options-default'
import toolbox from '@/components/blockly/toolbox-example'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function BlocklyPage() {
  const blocklyRef = useRef<WorkspaceInstance>()
  const [codeOpen, setCodeOpen] = useState(false)
  const codeRef = useRef('')
  const [outputOpen, setOutputOpen] = useState(false)
  const outputMessagesRef = useRef<string[]>([])

  const workspaceOptions: BlocklyWorkspaceOptions = {
    backupOnUnload: true,
    onCreate: (workspace: WorkspaceInstance) => {
      initCodeGen()
    },
    onDispose: (workspace: WorkspaceInstance) => {
      uninitCodeGen()
    },
  }

  const handleClear = () => {
    blocklyRef.current?.clear()
  }

  const handleViewCode = () => {
    codeRef.current = blocklyRef.current?.generateCode()
    setCodeOpen(true)
  }

  const handleRun = () => {
    window.blClear()
    blocklyRef.current?.run()
    outputMessagesRef.current = window.blOutputMessages
    setOutputOpen(true)
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
        <Button onClick={handleViewCode} size="sm" variant="outline" className="!ml-4">
          View Code
        </Button>
        <Dialog open={codeOpen} onOpenChange={setCodeOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Generated Code</DialogTitle>
            </DialogHeader>
            {!codeRef.current ? <span>생성된 코드가 없습니다.</span> : <pre>{codeRef.current}</pre>}
          </DialogContent>
        </Dialog>
        <Dialog open={outputOpen} onOpenChange={setOutputOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Output</DialogTitle>
            </DialogHeader>
            <div>
              {outputMessagesRef.current.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
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
    blOutputMessages: string[]
    blPrint: (text: string) => void
    blClear: () => void
  }
}

function initCodeGen() {
  window.blOutputMessages = []
  window.blPrint = (text: string) => window.blOutputMessages.push(text)
  window.blClear = () => (window.blOutputMessages.length = 0)

  WorkspaceInstance.initCodeGen({
    customPrint: 'blPrint',
  })
}

function uninitCodeGen() {
  WorkspaceInstance.uninitCodeGen()
}
