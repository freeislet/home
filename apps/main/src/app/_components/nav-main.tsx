'use client'

import { nav } from '@/config/docs/nav'
import NavLink from '@/components/nav-link'

export function NavMain() {
  return (
    <nav className="my-flex-row gap-4 text-sm">
      {nav.map((item, index) => (
        <NavLink
          key={index}
          href={item.nonlink ? item.nonlinkRedirectUrl : item.href}
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
