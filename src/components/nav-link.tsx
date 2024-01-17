'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { hrefAsString, getBasePathname } from '@/lib/url'
import { cn } from '@/lib/utils'

type LinkProps = React.ComponentProps<typeof Link>
type NavLinkProps = LinkProps & {
  activeClassName: string
  allowPartialMatch?: boolean
  partialActiveClassName?: string
}

export function NavLink({
  children,
  activeClassName,
  allowPartialMatch,
  partialActiveClassName,
  ...linkProps
}: { children: React.ReactNode } & NavLinkProps) {
  const href = hrefAsString(linkProps.href)
  const pathname = usePathname()

  const getClassName = () => {
    const isActive = pathname === href
    if (isActive) return activeClassName

    if (!allowPartialMatch) return

    const isPartialActive = pathname.startsWith(href)
    if (isPartialActive) return partialActiveClassName || activeClassName
  }

  linkProps.className = cn(linkProps.className, getClassName())

  return <Link {...linkProps}>{children}</Link>
}
