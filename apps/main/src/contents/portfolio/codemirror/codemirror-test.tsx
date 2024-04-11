/**
 * - CodeMirror: https://codemirror.net/
 * - react-codemirror: https://github.com/uiwjs/react-codemirror
 * - Monaco Editor 비교: https://blog.replit.com/codemirror
 */

'use client'

import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import '@/style/codemirror.css'

const code = `
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

function App() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return <CodeMirror value={value} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} />;
}
export default App;
`.trimStart()

export default function CodeMirrorTest() {
  return (
    <CodeMirror
      value={code}
      theme={vscodeDark}
      height="100%"
      style={{ fontSize: '13px' }}
      extensions={[javascript({ jsx: true })]}
    />
  )
}
