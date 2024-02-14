/**
 * 다음 프로젝트 참고
 * - blockly-react-sample (https://github.com/google/blockly-samples/tree/master/examples/blockly-react)
 * - react-blockly (https://github.com/nbudin/react-blockly)
 */

'use client'

import { useCallback, useEffect, useRef } from 'react'
import Blockly, { type BlocklyOptions, WorkspaceSvg } from 'blockly/core'
import { javascriptGenerator } from 'blockly/javascript'
import locale from 'blockly/msg/ko'
import 'blockly/blocks'

import { clogd, cn } from '@/lib/utils'

Blockly.setLocale(locale)

export interface BlocklyWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  options: BlocklyOptions
  // todo
  initialXml?: string
  initialJson?: object
  onWorkspaceChange?: (workspace: WorkspaceSvg) => void
  onImportError?: (error: any) => void
  onXmlChange?: (xml: string) => void
  onJsonChange?: (worksapceJson: object) => void
  onInject?: (newWorkspace: WorkspaceSvg) => void
  onDispose?: (workspace: WorkspaceSvg) => void
}

function BlocklyWorkspace({
  options,
  initialXml,
  initialJson,
  onWorkspaceChange,
  onImportError,
  onXmlChange,
  onJsonChange,
  onInject,
  onDispose,
  className,
  ...props
}: BlocklyWorkspaceProps) {
  const workspaceRef = useRef<WorkspaceSvg>()
  const workspaceDivRef = useCallback(
    (node: HTMLDivElement) => {
      workspaceRef.current?.dispose()

      if (!node) {
        workspaceRef.current = undefined
        return
      }

      workspaceRef.current = Blockly.inject(node, options)

      // if (initialXml) {
      //   const initialDom = Blockly.utils.xml.textToDom(initialXml)
      //   Blockly.Xml.domToWorkspace(initialDom, curWorkspaceRef.current)
      // }
    },
    [options]
  )

  const generateCode = useCallback(() => {
    const code = javascriptGenerator.workspaceToCode(workspaceRef.current)
    clogd(code)
    return code
  }, [workspaceDivRef])

  return (
    <>
      {/* <button onClick={generateCode}>Convert</button> */}
      <div ref={workspaceDivRef} className={cn('h-[500px]', className)} {...props} />
    </>
  )
}

export default BlocklyWorkspace
export type { BlocklyOptions } from 'blockly/core'
