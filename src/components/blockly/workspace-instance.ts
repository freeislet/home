import { Workspace } from 'blockly/core'

import * as WorkspaceUtils from './workspace-utils'
import * as CustomCodeGen from './custom-codegen'

export interface CodeGenConfig {
  customPrint?: string
}

class WorkspaceInstance {
  workspace: Workspace

  constructor(workspace?: Workspace) {
    this.workspace = WorkspaceUtils.coalesceWorkspace(workspace)
  }

  clear() {
    WorkspaceUtils.clearWorkspace(this.workspace)
  }

  // todo
  // load() {}
  // save() {}

  backup() {
    WorkspaceUtils.saveWorkspaceToLocalStorage(this.workspace)
  }

  restoreBackup() {
    WorkspaceUtils.loadWorkspaceFromLocalStorage(this.workspace)
  }

  setBackupOnUnload(backupOnUnload: boolean) {
    WorkspaceUtils.setBackupOnUnload(backupOnUnload, this.workspace)
  }

  run() {
    WorkspaceUtils.run()
  }

  generateCode() {
    return WorkspaceUtils.generateCode(this.workspace)
  }

  private static codeGenConfig?: CodeGenConfig

  static initCodeGen(config: CodeGenConfig) {
    if (config.customPrint) CustomCodeGen.set_text_print(config.customPrint)

    this.codeGenConfig = config
  }

  static uninitCodeGen() {
    const config = this.codeGenConfig
    if (!config) return

    if (config.customPrint) CustomCodeGen.reset_text_print()

    this.codeGenConfig = undefined
  }
}

export default WorkspaceInstance
