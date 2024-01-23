'use client'

import { docsConfig } from '@/config/docs'
import { filterValidNav } from '@/lib/nav'
import { NavLink } from '@/components/nav-link'

// tRPC test
import { trpc } from '@/trpc/client'

export function NavMain() {
  const validNav = filterValidNav(docsConfig.nav)

  // tRPC test
  const products = trpc.products.useQuery()
  console.log(products)

  return (
    <nav className="my-flex-row gap-4 text-sm">
      {validNav.map(
        (item, index) =>
          item.href && (
            <NavLink
              key={index}
              href={item.href}
              className="group text-foreground/60 hover:text-foreground/80 transition-colors"
              activeClassName="text-foreground"
              allowPartialMatch
            >
              <div className="my-flex-row px-1">{item.title}</div>
              <div className="max-w-0 group-hover:max-w-full h-0.5 mx-auto bg-sky-300 transition-all"></div>
            </NavLink>
          )
      )}
    </nav>
  )
}
