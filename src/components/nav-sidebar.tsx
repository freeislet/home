'use client'

import { docsConfig } from '@/config/docs'
import { filterValidNav, getBaseNavItem } from '@/lib/nav'
import { NavLink } from '@/components/nav-link'
import { usePathname } from 'next/navigation'

export function NavSidebar() {
  const pathname = usePathname()

  const navItem = getBaseNavItem(docsConfig.nav, pathname)
  if (!navItem?.children?.length) return

  const validNav = filterValidNav(navItem.children)

  return (
    <div className="flex-none hidden sm:flex flex-col space-y-2 bg-secondary border-r">
      <div className="my-flex-row p-4 pb-2 font-medium text-foreground/80 border-b mb-2">
        {navItem.title}
      </div>
      <div className="my-flex-col space-y-2 mx-6 text-sm">
        {validNav.map((item, index) => (
          <NavLink
            key={index}
            href={item.href}
            className="my-flex-row text-foreground/60 hover:text-foreground/80 transition-colors"
            activeClassName="text-foreground underline"
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
