'use client'

import { useRef, useState } from 'react'

import { load } from '@/components/loading'
import { BlocklyWorkspaceOptions, WorkspaceInstance } from '@/components/blockly-workspace'
import options from '@/components/blockly/options-default'
import toolbox from '@/components/blockly/toolbox-example'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CodeBlock } from '@/components/codeblock'
import { DiagramIcon } from '@/components/icons'
import { ScrollTrigger, ScrollTarget } from '@/components/scroll-trigger'
import { DownToDocument, ScrollToTop } from '@/app/(contents)/_components/scroll-ui'
import ProseLayout from '@/components/prose-layout'
import BlocklyMdx from './blockly.mdx'

const BlocklyWorkspace = load(import('@/components/blockly-workspace'))

export default function BlocklyPage() {
  const blocklyRef = useRef<WorkspaceInstance>()
  const [codeOpen, setCodeOpen] = useState(false)
  const codeRef = useRef('')
  const [outputOpen, setOutputOpen] = useState(false)
  const outputMessagesRef = useRef<string[]>([])
  const docRef = useRef(null)

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
    <>
      <div className="grid grid-rows-[auto_1fr] min-h-main-height">
        <div className="my-flex-row justify-between">
          <div className="m-2 my-flex-row">
            <DiagramIcon className="mr-1" />
            Blockly 테스트
            <ScrollTrigger targetRef={docRef} className="ml-4">
              <DownToDocument />
            </ScrollTrigger>
          </div>
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
                {!codeRef.current ? (
                  <span>생성된 코드가 없습니다.</span>
                ) : (
                  <CodeBlock language="js" value={codeRef.current} />
                )}
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
        </div>
        <BlocklyWorkspace ref={blocklyRef} options={options} toolbox={toolbox} workspaceOptions={workspaceOptions} />
      </div>
      <ScrollTarget ref={docRef} />
      <div className="my-container relative">
        <ScrollToTop text="Workspace" />
        <ProseLayout>
          <BlocklyMdx />
        </ProseLayout>
      </div>
    </>
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
