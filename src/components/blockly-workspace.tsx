/**
 * 다음 프로젝트 참고
 * - blockly-react-sample (https://github.com/google/blockly-samples/tree/master/examples/blockly-react)
 * - blockly code demo (https://github.com/google/blockly/tree/develop/demos/code)
 * - react-blockly (https://github.com/nbudin/react-blockly)
 */

'use client'

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import Blockly, { type BlocklyOptions, WorkspaceSvg } from 'blockly/core'
import locale from 'blockly/msg/en'
import 'blockly/blocks'

import '@/style/blockly.css'
import * as Utils from './blockly/utils'
import { cn } from '@/lib/utils'

Blockly.setLocale(locale)

export interface BlocklyWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  options: BlocklyOptions
  toolbox: Blockly.utils.toolbox.ToolboxDefinition
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

const BlocklyWorkspace = forwardRef(function BlocklyWorkspace(
  {
    options,
    toolbox,
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
  }: BlocklyWorkspaceProps,
  ref
) {
  const workspaceRef = useRef<WorkspaceSvg>()
  const workspaceDivRef = useCallback(
    (node: HTMLDivElement) => {
      workspaceRef.current?.dispose()

      if (!node) {
        workspaceRef.current = undefined
        return
      }

      workspaceRef.current = Blockly.inject(node, { ...options, toolbox })

      // if (initialXml) {
      //   const initialDom = Blockly.utils.xml.textToDom(initialXml)
      //   Blockly.Xml.domToWorkspace(initialDom, curWorkspaceRef.current)
      // }
    },
    [options]
  )

  useImperativeHandle(ref, () => {
    const workspace = workspaceRef.current

    return {
      clear: () => Utils.clear(workspace),
      run: () => Utils.run(workspace),
      generateCode: () => Utils.generateCode(workspace),
    }
  })

  return <div ref={workspaceDivRef} className={cn('h-full', className)} {...props} />
})

export default BlocklyWorkspace
export { default as Blockly, type BlocklyOptions } from 'blockly/core'
