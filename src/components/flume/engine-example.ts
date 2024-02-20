// useRootEngine 훅에서 사용하는 RootEngine 정의 예제 (https://flume.dev/docs/using-with-react)

import { RootEngine, InputData, FlumeNode, NodeType } from 'flume'
import config from './config'

const resolvePorts = (portType: string, data: InputData, context: any) => {
  switch (portType) {
    case 'string':
      return data.string
    case 'boolean':
      return data.boolean
    case 'number':
      return data.number
    default:
      return data
  }
}

const resolveNodes = (node: FlumeNode, inputValues: InputData, nodeType: NodeType, context: any) => {
  switch (node.type) {
    case 'string':
      return { string: inputValues.string }
    case 'boolean':
      return { boolean: inputValues.boolean }
    case 'number':
      return { number: inputValues.number }
    case 'user':
      return context.user
    case 'joinText':
      return { joinedText: (inputValues as any).string1 + inputValues.string2 }
    case 'reverseBoolean':
      return { boolean: !inputValues.boolean }
    default:
      return inputValues
  }
}

const engine = new RootEngine(config, resolvePorts, resolveNodes)

export default engine
