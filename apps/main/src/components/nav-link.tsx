'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { hrefAsString } from '@/lib/url'
import { cn } from '@/lib/utils'

type LinkProps = React.ComponentProps<typeof Link>
type NavLinkProps = LinkProps & {
  activeClassName: string
  allowPartialMatch?: boolean
  partialActiveClassName?: string
  handleActiveState?: (active: boolean, partialActive: boolean) => void
  nonlink?: boolean
}

export default function NavLink({
  children,
  activeClassName,
  allowPartialMatch,
  partialActiveClassName,
  handleActiveState,
  nonlink,
  className,
  ...props
}: { children: React.ReactNode } & NavLinkProps) {
  const href = hrefAsString(props.href)
  const pathname = usePathname()
  const isActive = pathname === href
  const isPartialActive = !isActive && pathname.startsWith(href)

  handleActiveState?.(isActive, isPartialActive)

  const getClassName = () => {
    if (isActive) return activeClassName
    if (allowPartialMatch && isPartialActive) return partialActiveClassName || activeClassName
  }

  className = cn(className, getClassName())

  return nonlink ? (
    <div className={className}>{children}</div>
  ) : (
    <Link className={className} {...props}>
      {children}
    </Link>
  )
}
