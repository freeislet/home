import { FaAnglesDown, FaArrowUp } from 'react-icons/fa6'

export function DownToDocument() {
  return (
    <div className="my-flex-row space-x-1 p-0.5 pr-1.5 hover:bg-muted/50 ring-1 rounded-full text-xs text-muted-foreground hover:text-accent-foreground">
      <FaAnglesDown className="size-6 p-1 border bg-border/30 rounded-full" />
      <span>설명</span>
    </div>
  )
}

export function ScrollToTop({ text }: { text?: string }) {
  return (
    <div className="sticky top-header-height my-flex-col items-center pt-2 -mb-10">
      <button
        className="my-flex-row space-x-1 h-8 p-1 bg-muted ring-1 hover:ring-2 rounded-lg shadow-md text-xs text-muted-foreground hover:text-accent-foreground"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaArrowUp />
        {text && <span>{text}</span>}
      </button>
    </div>
  )
}
