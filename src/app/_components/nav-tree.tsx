'use client'

import * as React from 'react'

import { type NavItem, filterValidNav } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { NavLink } from '@/components/nav-link'

export function NavTree({
  nav,
  depth = 0,
}: {
  nav: NavItem[]
  depth?: number
}) {
  return (
    <div
      className={cn(
        'my-flex-col',
        depth === 0 ? 'space-y-2 text-[15px]' : 'space-y-1.5 ml-2 text-sm'
      )}
    >
      {filterValidNav(nav).map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <NavLink
              href={item.href}
              className="my-flex-row text-foreground/60 hover:text-foreground/80 transition-colors"
              activeClassName="text-foreground underline"
            >
              {item.title}
            </NavLink>
          ) : (
            <div className="my-flex-row font-medium text-muted-foreground">
              {item.title}
            </div>
          )}
          {item.children?.length && (
            <NavTree nav={item.children} depth={depth + 1} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
