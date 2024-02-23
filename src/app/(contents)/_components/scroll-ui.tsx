import { FaAnglesDown, FaArrowUp } from 'react-icons/fa6'

export function DownToDocument() {
  return (
    <div className="my-flex-row p-0.5 pr-1.5 space-x-1 ring-1 rounded-full text-xs text-muted-foreground hover:text-accent-foreground hover:bg-muted/50">
      <FaAnglesDown className="size-6 p-1 border bg-border/30 rounded-full" />
      <span>설명</span>
    </div>
  )
}

export function ScrollToTop({ text }: { text?: string }) {
  return (
    <div className="sticky top-header-height my-flex-col items-center -mb-7">
      <button
        className="my-flex-row h-7 px-4 space-x-1 border border-t-0 rounded-b-full shadow-md text-xs text-muted-foreground hover:text-accent-foreground bg-background-blur hover:bg-muted/70"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaArrowUp />
        {text && <span>{text}</span>}
      </button>
    </div>
  )
}
