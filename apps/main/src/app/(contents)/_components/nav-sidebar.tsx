'use client'

import { usePathname } from 'next/navigation'

import { validNav } from '@/config/docs/nav'
import { cn } from '@/lib/utils'
import { getBaseNavItem } from '@/lib/nav'
import NavTree from '@/components/nav-tree'

export function NavSidebar({ className, ...props }: React.ComponentProps<'div'>) {
  const pathname = usePathname()

  const baseNavItem = getBaseNavItem(validNav, pathname)
  if (!baseNavItem?.children?.length) return

  return (
    <aside
      className={cn('flex-none hidden sm:flex flex-col min-w-32 space-y-2 bg-secondary border-r', className)}
      {...props}
    >
      <div className="my-flex-row p-4 pb-2 space-x-1 font-medium text-foreground/80 border-b mb-2">
        {baseNavItem.icon}
        <span>{baseNavItem.title}</span>
      </div>
      <nav>
        <NavTree nav={baseNavItem.children} className="mx-4" />
      </nav>
    </aside>
  )
}
