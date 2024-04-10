import { FaAnglesDown, FaArrowUp } from 'react-icons/fa6'

export function DownToDocument() {
  return (
    <div className="my-flex-row p-0.5 pr-1.5 ring-1 rounded-full text-xs text-muted-foreground hover:text-accent-foreground hover:bg-muted/50">
      <FaAnglesDown className="size-4 p-0.5 mr-1 border rounded-full bg-border/30" />
      <span>설명</span>
    </div>
  )
}

export function ScrollToTop({ text }: { text?: React.ReactNode }) {
  return (
    <div className="sticky top-header-height my-flex-col items-center -mb-7">
      <button
        className="my-flex-row h-7 px-4 border border-t-0 rounded-b-3xl shadow-md text-xs text-muted-foreground hover:text-accent-foreground bg-background-blur hover:bg-muted/70"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaArrowUp className="size-5 p-0.5 mr-1 border rounded-md bg-border/50" />
        {text && <span>{text}</span>}
      </button>
    </div>
  )
}
