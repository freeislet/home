'use client'

import { usePathname } from 'next/navigation'

import { docsConfig } from '@/config/docs'
import { getBaseNavItem } from '@/lib/nav'
import { NavTree } from './nav-tree'

export function NavSidebar() {
  const pathname = usePathname()

  const navItem = getBaseNavItem(docsConfig.nav, pathname)
  if (!navItem?.children?.length) return

  return (
    <div className="flex-none hidden sm:flex flex-col space-y-2 bg-secondary border-r">
      <div className="my-flex-row p-4 pb-2 font-medium text-foreground/80 border-b mb-2">{navItem.title}</div>
      <div className="mx-4">
        <NavTree nav={navItem.children} />
      </div>
    </div>
  )
}
