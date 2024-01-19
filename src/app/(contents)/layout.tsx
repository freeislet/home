import { NavSidebar } from '../_components/nav-sidebar'

export default function ContentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavSidebar />
      <div className="flex-1">{children}</div>
    </>
  )
}
