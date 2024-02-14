import BlocklyWorkspace, { type BlocklyOptions } from '@/components/blockly-workspace'

export default function BlocklyPage() {
  const toolbox = {
    // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
    kind: 'flyoutToolbox',
    // The contents is the blocks and other items that exist in your toolbox.
    contents: [
      {
        kind: 'block',
        type: 'controls_if',
      },
      {
        kind: 'block',
        type: 'controls_whileUntil',
      },
      // You can add more blocks to this array.
    ],
  }
  const options: BlocklyOptions = { toolbox }

  return (
    <div className="my-flex-col min-h-full">
      <div className="flex-1">
        <BlocklyWorkspace options={options} />
      </div>
      <div className="my-container">blockly...</div>
    </div>
  )
}
