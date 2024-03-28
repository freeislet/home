'use client'

import { usePathname } from 'next/navigation'

import { getBaseNavItem } from '@/config/docs/nav'
import { cn } from '@/lib/utils'
import NavLink from '@/components/nav-link'
import NavTree from '@/components/nav-tree'

export function NavSidebar({ className, ...props }: React.ComponentProps<'div'>) {
  const pathname = usePathname()

  const baseNavItem = getBaseNavItem(pathname)
  if (!baseNavItem?.children?.length) return

  return (
    <aside
      className={cn('flex-none hidden sm:flex flex-col min-w-32 space-y-2 bg-secondary border-r', className)}
      {...props}
    >
      <NavLink
        href={baseNavItem.href}
        nonlink={baseNavItem.nonlink}
        className={cn(
          'my-flex-row p-4 pb-2 space-x-1 mb-2 border-b font-medium text-foreground/80 transition-colors',
          !baseNavItem.nonlink && 'hover:text-foreground'
        )}
        activeClassName=""
        // activeClassName="underline underline-offset-4 decoration-2 decoration-sky-300"
        // allowPartialMatch
        // partialActiveClassName=" "
      >
        {baseNavItem.icon}
        <span>{baseNavItem.title}</span>
      </NavLink>
      <nav>
        <NavTree nav={baseNavItem.children} className="mx-4" />
      </nav>
    </aside>
  )
}
