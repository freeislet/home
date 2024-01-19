'use client'

import * as React from 'react'

import { type NavItem, filterValidNav } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { NavLink } from '@/components/nav-link'

export function NavTree({ nav, depth = 0 }: { nav: NavItem[]; depth?: number }) {
  return (
    <div
      className={cn(
        'my-flex-col',
        depth === 0 ? 'space-y-5 text-[15px]' : 'space-y-2 mt-3 ml-3 text-sm',
        depth > 1 && 'mt-2'
      )}
    >
      {filterValidNav(nav).map((item, index) => (
        <div key={index}>
          {item.href ? (
            <NavLink
              href={item.href}
              className="my-flex-row text-foreground/60 hover:text-foreground/80 transition-colors"
              activeClassName="text-foreground underline"
            >
              {item.title}
            </NavLink>
          ) : (
            <div className="my-flex-row text-muted-foreground">{item.title}</div>
          )}
          {item.children?.length && <NavTree nav={item.children} depth={depth + 1} />}
        </div>
      ))}
    </div>
  )
}
