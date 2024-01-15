'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import url from 'url'
import { cn } from '@/lib/utils'

type LinkProps = React.ComponentProps<typeof Link>
type NavLinkProps = LinkProps & {
  activeClassName: string
  partialAsActive?: boolean
  partialActiveClassName?: string
}

export function NavLink({
  children,
  activeClassName,
  partialAsActive,
  partialActiveClassName,
  ...linkProps
}: { children: React.ReactNode } & NavLinkProps) {
  const pathname = usePathname()

  const href = url.format(linkProps.href)
  const isActive = pathname === href
  const isPartialActive = !isActive && pathname.startsWith(href)

  let className

  if (isActive) className = activeClassName
  else if (isPartialActive) {
    if (partialAsActive) className = activeClassName
    else className = partialActiveClassName
  }

  linkProps.className = cn(linkProps.className, className)

  return <Link {...linkProps}>{children}</Link>
}
