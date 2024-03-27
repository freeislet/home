'use client'

import { usePathname } from 'next/navigation'

import { docsConfig } from '@/config/docs'
import { cn } from '@/lib/utils'
import { getBaseNavItem } from '@/lib/nav'
import NavTree from '@/components/nav-tree'

export function NavSidebar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  const navItem = getBaseNavItem(docsConfig.nav, pathname)
  if (!navItem?.children?.length) return

  return (
    <aside
      className={cn('flex-none hidden sm:flex flex-col min-w-32 space-y-2 bg-secondary border-r', className)}
      {...props}
    >
      <div className="my-flex-row p-4 pb-2 space-x-1 font-medium text-foreground/80 border-b mb-2">
        {navItem.icon}
        <span>{navItem.title}</span>
      </div>
      <nav>
        <NavTree nav={navItem.children} className="mx-4" />
      </nav>
    </aside>
  )
}
