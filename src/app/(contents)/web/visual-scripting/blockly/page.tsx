import BlocklyWorkspace, { type BlocklyOptions } from '@/components/blockly-workspace'
import toolbox from '@/components/blockly/toolbox-example'

export default function BlocklyPage() {
  const options: BlocklyOptions = { toolbox }

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-main-height">
      <div className="my-container">blockly...</div>
      <BlocklyWorkspace options={options} />
    </div>
  )
}
