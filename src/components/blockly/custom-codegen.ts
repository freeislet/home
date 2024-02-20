import { Block, CodeGenerator } from 'blockly/core'
import { javascriptGenerator, Order } from 'blockly/javascript'

const defaultTextPrint = javascriptGenerator.forBlock['text_print']

export function set_text_print(printFunc: string) {
  javascriptGenerator.forBlock['text_print'] = function (block: Block, generator: CodeGenerator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE)
    const code = `${printFunc}(${text});\n`
    return code
  }
}

export function reset_text_print() {
  javascriptGenerator.forBlock['text_print'] = defaultTextPrint
}
