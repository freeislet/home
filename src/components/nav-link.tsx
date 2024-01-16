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
  partialDepthLimit?: number
}

export function NavLink({
  children,
  activeClassName,
  allowPartialMatch,
  partialActiveClassName,
  partialDepthLimit,
  ...linkProps
}: { children: React.ReactNode } & NavLinkProps) {
  const href = hrefAsString(linkProps.href)
  const pathname = usePathname()

  const getClassName = () => {
    const isActive = pathname === href
    if (isActive) return activeClassName

    if (!allowPartialMatch) return

    const hrefPartial = partialDepthLimit
      ? getBasePathname(href, partialDepthLimit)
      : href
    const isPartialActive = pathname.startsWith(hrefPartial)
    if (isPartialActive) return partialActiveClassName || activeClassName
  }

  linkProps.className = cn(linkProps.className, getClassName())

  return <Link {...linkProps}>{children}</Link>
}
