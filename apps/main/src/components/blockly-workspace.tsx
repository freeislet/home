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
import { cn } from '@/lib/utils'
import WorkspaceInstance from './blockly/workspace-instance'

Blockly.setLocale(locale)

export interface BlocklyWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  options: BlocklyOptions
  toolbox: Blockly.utils.toolbox.ToolboxDefinition
  workspaceOptions?: BlocklyWorkspaceOptions
}

export interface BlocklyWorkspaceOptions {
  backupOnUnload?: boolean
  onCreate?: (workspace: WorkspaceInstance) => void
  onDispose?: (workspace: WorkspaceInstance) => void
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
  const workspaceInstanceRef = useRef<WorkspaceInstance>()
  const workspaceDivRef = useCallback(
    (node: HTMLDivElement) => {
      const prevWorkspace = workspaceInstanceRef.current
      if (prevWorkspace) {
        uninitWorkspace(prevWorkspace, workspaceOptions)
      }

      if (node) {
        const newWorkspaceRaw = Blockly.inject(node, { ...options, toolbox })
        const newWorkspace = new WorkspaceInstance(newWorkspaceRaw)
        workspaceInstanceRef.current = newWorkspace
        initWorkspace(newWorkspace, workspaceOptions)

        // if (initialXml) {
        //   const initialDom = Blockly.utils.xml.textToDom(initialXml)
        //   Blockly.Xml.domToWorkspace(initialDom, curWorkspaceRef.current)
        // }
      } else {
        workspaceInstanceRef.current = undefined
      }
    },
    [options, toolbox]
  )

  useImperativeHandle(ref, () => workspaceInstanceRef.current, [workspaceInstanceRef])

  return <div ref={workspaceDivRef} className={cn('h-full', className)} {...props} />
})

/**
 * Workspace 초기화
 */

function initWorkspace(workspace: WorkspaceInstance, options?: BlocklyWorkspaceOptions) {
  if (options?.backupOnUnload) {
    workspace.restoreBackup()
    workspace.setBackupOnUnload(true)
  }

  options?.onCreate?.(workspace)
}

function uninitWorkspace(workspace: WorkspaceInstance, options?: BlocklyWorkspaceOptions) {
  if (options?.backupOnUnload) {
    workspace.backup()
    workspace.setBackupOnUnload(false)
  }

  options?.onDispose?.(workspace)
  workspace.workspace.dispose()
}

export default BlocklyWorkspace
export { default as WorkspaceInstance, type CodeGenConfig } from './blockly/workspace-instance'
export { default as Blockly, type BlocklyOptions } from 'blockly/core'
