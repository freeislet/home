import { NavSidebar } from '@/contents/components/nav-sidebar'

export default function ContentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavSidebar className="w-48" /> {/* 가변폭 사용시 transform 3d 버그로 인해 width 지정 (React Three Fiber) */}
      <main className="flex-1">{children}</main>
    </>
  )
}
