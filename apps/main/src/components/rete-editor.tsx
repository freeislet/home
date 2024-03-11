import { useEditor } from './rete/example-dataflow'

export interface ReteEditorProps {
  className?: string
}

export default function ReteEditor({ className }: ReteEditorProps) {
  const [ref, editor] = useEditor()

  return <div ref={ref} className={className}></div>
}
