'use client'

import { docsConfig } from '@/config/docs'
import { filterValidNav } from '@/lib/nav'
import NavLink from '@/components/nav-link'

export function NavMain() {
  const validNav = filterValidNav(docsConfig.nav)

  return (
    <nav className="my-flex-row gap-4 text-sm">
      {validNav.map((item, index) => (
        <NavLink
          key={index}
          href={item.href}
          className="group text-foreground/60 hover:text-foreground/80 transition-colors"
          activeClassName="text-foreground"
          allowPartialMatch
        >
          <div className="my-flex-row px-1 space-x-1">
            {item.icon}
            <span>{item.title}</span>
          </div>
          <div className="max-w-0 group-hover:max-w-full h-0.5 mx-auto bg-sky-300 transition-all"></div>
        </NavLink>
      ))}
    </nav>
  )
}
