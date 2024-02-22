import { cn } from '@/lib/utils'

interface ProseLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean
  containerClassName?: string
  children?: React.ReactNode
}

export default function ProseLayout({
  container = true,
  containerClassName = 'my-container',
  className,
  children,
  ...props
}: ProseLayoutProps) {
  const article = (
    <article className={cn('my-prose my-[50px] text-muted-foreground', className)} {...props}>
      {children}
    </article>
  )

  return container ? <div className={containerClassName}>{article}</div> : article
}
