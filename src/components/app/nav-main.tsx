'use client'

import { docsConfig } from '@/config/docs'
import { NavLink } from '@/components/nav-link'

export function NavMain() {
  return (
    <nav className="flex items-center gap-6 text-sm">
      {docsConfig.mainNav?.map(
        (item) =>
          item.href && (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-foreground/60 hover:text-foreground/80 transition-colors"
              activeClassName="text-foreground"
            >
              {item.title}
            </NavLink>
          )
      )}
    </nav>
  )
}
