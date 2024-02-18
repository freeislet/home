import { Workspace, Block, CodeGenerator } from 'blockly/core'
import { javascriptGenerator, Order } from 'blockly/javascript'

import { coalesceWorkspace } from './workspace-utils'

export const blockHandlerNames = {
  text_print: 'console.log',
}

type BlockHandlerTypes = 'text_print'

export function setBlockHandlerName(blockType: BlockHandlerTypes, handlerName: string) {
  blockHandlerNames[blockType] = handlerName
}

javascriptGenerator.forBlock['text_print'] = function (block: Block, generator: CodeGenerator) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE)
  const code = `${blockHandlerNames.text_print}(${text});\n`
  return code
}

export function generateCode(workspace?: Workspace) {
  const code = javascriptGenerator.workspaceToCode(coalesceWorkspace(workspace))
  return code
}

export function run(workspace?: Workspace) {
  const code = generateCode(workspace)
  eval(code)
}
