'use client'

import { useReducer, useEffect, memo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { hrefAsString } from '@/lib/url'
import { cn } from '@/lib/utils'

type LinkProps = React.ComponentProps<typeof Link>
type Url = LinkProps['href']

interface ActiveState {
  active: boolean
  partialActive: boolean
}

interface ActiveStateAction {
  href: Url
  pathname: string
}

function getActiveState(href: Url, pathname: string): ActiveState {
  const hrefStr = hrefAsString(href)
  const active = href == pathname
  const partialActive = !active && pathname.startsWith(hrefStr)
  return { active, partialActive }
}

function activeStateReducer(state: ActiveState, action: ActiveStateAction): ActiveState {
  return getActiveState(action.href, action.pathname)
}

type NavLinkProps = LinkProps & {
  activeClassName: string
  allowPartialMatch?: boolean
  partialActiveClassName?: string
  onActiveStateChange?: (active: boolean, partialActive: boolean) => void
  nonlink?: boolean
}

const NavLink = memo(
  ({
    children,
    activeClassName,
    allowPartialMatch,
    partialActiveClassName,
    onActiveStateChange,
    nonlink,
    className,
    ...props
  }: { children: React.ReactNode } & NavLinkProps) => {
    const pathname = usePathname()
    const [activeState, dispatchActiveState] = useReducer(activeStateReducer, getActiveState(props.href, pathname))

    useEffect(() => {
      dispatchActiveState({ href: props.href, pathname })
    }, [pathname])

    useEffect(() => {
      onActiveStateChange?.(activeState.active, activeState.partialActive)
    }, [activeState.active, activeState.partialActive])

    const getClassName = () => {
      if (activeState.active) return activeClassName
      if (allowPartialMatch && activeState.partialActive) return partialActiveClassName || activeClassName
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
)

export default NavLink
