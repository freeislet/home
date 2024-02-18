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
import * as WorkspaceUtils from './blockly/workspace-utils'
import * as CodeUtils from './blockly/code-utils'
import { cn } from '@/lib/utils'

Blockly.setLocale(locale)

export interface BlocklyWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  options: BlocklyOptions
  toolbox: Blockly.utils.toolbox.ToolboxDefinition
  workspaceOptions?: BlocklyWorkspaceOptions
}

export interface BlocklyWorkspaceOptions {
  backupOnUnload?: boolean
  onCreate?: (workspace: WorkspaceSvg) => void
  onDispose?: (workspace: WorkspaceSvg) => void
  // todo
  initialXml?: string
  initialJson?: object
  onWorkspaceChange?: (workspace: WorkspaceSvg) => void
  onImportError?: (error: any) => void
  onXmlChange?: (xml: string) => void
  onJsonChange?: (worksapceJson: object) => void
}

const BlocklyWorkspace = forwardRef(function BlocklyWorkspace(
  { options, toolbox, workspaceOptions, className, ...props }: BlocklyWorkspaceProps,
  ref
) {
  const workspaceRef = useRef<WorkspaceSvg>()
  const workspaceDivRef = useCallback(
    (node: HTMLDivElement) => {
      const prevWorkspace = workspaceRef.current
      if (prevWorkspace) {
        if (workspaceOptions?.backupOnUnload) {
          WorkspaceUtils.setBackupOnUnload(false, prevWorkspace)
          WorkspaceUtils.backup(prevWorkspace)
        }
        workspaceOptions?.onDispose?.(prevWorkspace)

        prevWorkspace.dispose()
      }

      if (!node) {
        workspaceRef.current = undefined
        return
      }

      const newWorkspace = Blockly.inject(node, { ...options, toolbox })
      workspaceRef.current = newWorkspace

      if (workspaceOptions?.backupOnUnload) {
        WorkspaceUtils.setBackupOnUnload(true, newWorkspace)
        WorkspaceUtils.restoreBackup(newWorkspace)
      }
      workspaceOptions?.onCreate?.(newWorkspace)

      // if (initialXml) {
      //   const initialDom = Blockly.utils.xml.textToDom(initialXml)
      //   Blockly.Xml.domToWorkspace(initialDom, curWorkspaceRef.current)
      // }
    },
    [options, toolbox]
  )

  useImperativeHandle(ref, () => {
    const workspace = workspaceRef.current

    return {
      clear: () => WorkspaceUtils.clear(workspace),
      run: () => CodeUtils.run(workspace),
      generateCode: () => CodeUtils.generateCode(workspace),
    }
  })

  return <div ref={workspaceDivRef} className={cn('h-full', className)} {...props} />
})

export default BlocklyWorkspace
export { default as Blockly, type BlocklyOptions } from 'blockly/core'
