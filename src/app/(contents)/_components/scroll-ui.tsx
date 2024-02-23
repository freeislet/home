import { FaAnglesDown } from 'react-icons/fa6'

export function DownToDocument() {
  return (
    <div className="my-flex-row space-x-1 p-0.5 pr-1.5 border rounded-full shadow-sm">
      <FaAnglesDown className="size-5 p-[3px] border bg-border/50 rounded-full" />
      <span className="text-xs text-muted-foreground">설명</span>
    </div>
  )
}
