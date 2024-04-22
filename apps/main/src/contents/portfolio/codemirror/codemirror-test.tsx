/**
 * - CodeMirror: https://codemirror.net/
 * - react-codemirror: https://github.com/uiwjs/react-codemirror
 * - Monaco Editor 비교: https://blog.replit.com/codemirror
 */

'use client'

import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'
import { HighlightStyle, syntaxHighlighting, syntaxTree } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import { EditorView, Decoration, DecorationSet, PluginValue, ViewPlugin, ViewUpdate } from '@codemirror/view'
import { RangeSetBuilder } from '@codemirror/state'

import '@/style/codemirror.css'

const code = `
/**
 * HighlightStyle로 주석에 배경색을 사용할 수 있다.
 * 그러나, HighlightStyle 방식은 라인 전체가 아닌 글자에만 배경색이 적용된다.
*/

//
// 라인 전체에 배경색을 적용하려면 line decoration을 사용해야 한다.
// Decoration.line 함수로 생성한 decoration을 ViewPlugin extension에서 주석 위치에 추가한다.
// 주석 위치는 syntax tree에서 LineComment 노드 타입(node.name)으로 판단한다. (아래 코드 참고)
//

// 주석 highlight style
const myHighlightStyle = HighlightStyle.define([
  // decoration으로 주석 라인 전체에 배경색 적용하는 방식과 비교하기 위해 tags.comment 대신 blockComment 사용
  { tag: tags.blockComment, backgroundColor: '#bbb7', themeType: 'light' },
  { tag: tags.blockComment, backgroundColor: '#4447', themeType: 'dark' },
])

/**
 * 주석 전체 라인 배경색 적용
 */

// styles
const commentBaseTheme = EditorView.baseTheme({
  // We need to set some transparency because the stripe are above the selection layer
  '.cm-commentLine': { fontSize: '1rem' }, // font-size 테스트
  '&light .cm-commentLine': { backgroundColor: '#bbb7' },
  '&dark .cm-commentLine': { backgroundColor: '#4447' },
})

// line decoration
const commentDecoration = Decoration.line({
  attributes: { class: 'cm-commentLine' },
})

// view plugin
class CommentPlugin implements PluginValue {
  decorations: DecorationSet

  constructor(view: EditorView) {
    this.decorations = this.commentDeco(view)
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.commentDeco(update.view)
    }
  }

  commentDeco(view: EditorView) {
    const builder = new RangeSetBuilder<Decoration>()
    for (let { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        from,
        to,
        enter: (node) => {
          if (node.name == 'LineComment') {
            builder.add(node.from, node.from, commentDecoration)
          }
        },
      })
    }
    return builder.finish()
  }
}

const commentPlugin = ViewPlugin.fromClass(CommentPlugin, {
  decorations: (v) => v.decorations,
})

export default function App() {
  return (
    <CodeMirror
      value={...}
      extensions={[
        javascript({ jsx: true }),
        syntaxHighlighting(myHighlightStyle),
        [commentBaseTheme, commentPlugin],
      ]}
    />
  )
}
`.trimStart()

// 주석 highlight style
const myHighlightStyle = HighlightStyle.define([
  // { tag: tags.keyword, color: '#fc6' },
  // { tag: tags.comment, color: '#f5d', fontStyle: 'italic' },
  // decoration으로 주석 라인 전체에 배경색 적용하는 방식과 비교하기 위해 tags.comment 대신 blockComment 사용
  { tag: tags.blockComment, backgroundColor: '#bbb7', themeType: 'light' },
  { tag: tags.blockComment, backgroundColor: '#4447', themeType: 'dark' },
])

/**
 * 주석 전체 라인 배경색 적용
 */

// styles
const commentBaseTheme = EditorView.baseTheme({
  // We need to set some transparency because the stripe are above the selection layer
  '.cm-commentLine': { fontSize: '1rem' },
  '&light .cm-commentLine': { backgroundColor: '#bbb7' },
  '&dark .cm-commentLine': { backgroundColor: '#4447' },
})

// line decoration
const commentDecoration = Decoration.line({
  attributes: { class: 'cm-commentLine' },
})

// view plugin
class CommentPlugin implements PluginValue {
  decorations: DecorationSet

  constructor(view: EditorView) {
    this.decorations = this.commentDeco(view)
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.commentDeco(update.view)
    }
  }

  commentDeco(view: EditorView) {
    const builder = new RangeSetBuilder<Decoration>()
    for (let { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        from,
        to,
        enter: (node) => {
          if (node.name == 'LineComment') {
            builder.add(node.from, node.from, commentDecoration)
          }
          // NOTE: BlockComment 타입은 미구현
        },
      })
    }
    return builder.finish()
  }
}

const commentPlugin = ViewPlugin.fromClass(CommentPlugin, {
  decorations: (v) => v.decorations,
})

export default function CodeMirrorTest() {
  return (
    <CodeMirror
      value={code}
      theme={vscodeDark}
      height="100%"
      style={{ fontSize: '13px' }}
      extensions={[
        //
        javascript({ jsx: true }),
        syntaxHighlighting(myHighlightStyle),
        [commentBaseTheme, commentPlugin],
      ]}
    />
  )
}
