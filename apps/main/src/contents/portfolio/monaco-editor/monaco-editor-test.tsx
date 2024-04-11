// https://www.npmjs.com/package/@monaco-editor/react

'use client'

// import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react'
import Editor from '@monaco-editor/react'

const code = `
/**
 * useMonaco [https://www.npmjs.com/package/@monaco-editor/react#usemonaco]
 *
 * useMonaco is a React hook that returns the instance of the monaco.
 * But there is an important note that should be considered: the initialization process is
 * being handled by the loader utility (the reference of @monaco-editor/loader):
 * that process is being done asynchronously and only once. So, if the first initiator of
 * the initialization is useMonaco hook, the first returned value will be null,
 * due to its asynchronous installation. Just check the returned value of useMonaco
 */

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import Editor, { useMonaco } from '@monaco-editor/react';

function App() {
  const monaco = useMonaco();

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log('here is the monaco instance:', monaco);
    }
  }, [monaco]);

  return <Editor height="90vh" defaultValue="// some comment" defaultLanguage="javascript" />;
}
`.trimStart()

export default function MonacoEditorTest() {
  return <Editor height="100%" defaultLanguage="javascript" defaultValue={code} />
}
