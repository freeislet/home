import Blockly, { type BlocklyOptions } from 'blockly/core'

const options: BlocklyOptions = {
  renderer: 'geras', // <geras> | thrasos | zelos(scratch-like renderer)
  theme: Blockly.Themes.Zelos, // https://developers.google.com/blockly/guides/configure/web/appearance/themes
  horizontalLayout: false, // <false>
  toolboxPosition: 'start', // <start> | end
  trashcan: true, // <true>
  maxTrashcanContents: 32, // <32>
  grid: { spacing: 25, length: 3, colour: '#ccc', snap: true },
  zoom: { controls: true, wheel: true, startScale: 1.0, maxScale: 1, minScale: 0.3 },
  plugins: {}, // https://developers.google.com/blockly/guides/configure/advanced/using_blockly_apis
  // media: '../../media/',
  // readOnly: false, // <false>
}

export default options
