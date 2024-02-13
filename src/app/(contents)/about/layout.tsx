export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-container">
      <article className="my-prose my-[50px] text-muted-foreground">{children}</article>
    </div>
  )
}
