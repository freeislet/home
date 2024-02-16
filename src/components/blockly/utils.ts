import Blockly, { Workspace, utils } from 'blockly/core'
import { javascriptGenerator } from 'blockly/javascript'

import { cerror } from '@/lib/utils'

export interface WorkspaceState {
  [key: string]: any
}

export function coalesceWorkspace(workspace?: Workspace): Workspace {
  workspace = workspace ?? Blockly.getMainWorkspace()
  if (workspace == null) throw 'Blockly workspace not found.'
  return workspace
}

export function saveWorkspace(workspace?: Workspace): WorkspaceState {
  const state = Blockly.serialization.workspaces.save(coalesceWorkspace(workspace))
  return state
}

export function loadWorkspace(state: WorkspaceState, workspace?: Workspace) {
  Blockly.serialization.workspaces.load(state, coalesceWorkspace(workspace))
}

const LOCAL_STORAGE_WORKSPACE_STATE = 'blocklyWorkspaceState'

export function saveWorkspaceToLocalStorage(workspace?: Workspace) {
  try {
    const state = saveWorkspace(workspace)
    const stateStr = JSON.stringify(state)
    window.sessionStorage.setItem(LOCAL_STORAGE_WORKSPACE_STATE, stateStr)
  } catch (e) {
    cerror(e)
  }
}

export function loadWorkspaceFromLocalStorage(workspace?: Workspace) {
  try {
    const stateStr = window.sessionStorage.getItem(LOCAL_STORAGE_WORKSPACE_STATE)
    if (stateStr) {
      const state = JSON.parse(stateStr)
      loadWorkspace(state, workspace)
    }

    window.sessionStorage.removeItem(LOCAL_STORAGE_WORKSPACE_STATE)
  } catch (e) {
    cerror(e)
  }
}

export function clear(workspace?: Workspace) {
  coalesceWorkspace(workspace)?.clear()
}

export function generateCode(workspace?: Workspace) {
  const code = javascriptGenerator.workspaceToCode(coalesceWorkspace(workspace))
  return code
}

export function run(workspace?: Workspace) {
  const code = generateCode(workspace)
  eval(code)
}
