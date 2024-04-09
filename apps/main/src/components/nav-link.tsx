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
  href?: Url
  pathname?: string
}

function getActiveState(href?: Url, pathname?: string): ActiveState {
  if (!href || !pathname) return { active: false, partialActive: false }

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
  onClickLink?: (active: boolean, partialActive: boolean) => void
  nonlink?: boolean
}

const NavLink = memo(
  ({
    children,
    href,
    nonlink,
    className,
    activeClassName,
    allowPartialMatch,
    partialActiveClassName,
    onActiveStateChange,
    onClickLink,
    ...props
  }: { children: React.ReactNode } & NavLinkProps) => {
    const pathname = usePathname()
    const [activeState, dispatchActiveState] = useReducer(activeStateReducer, getActiveState(href, pathname))

    useEffect(() => {
      dispatchActiveState({ href, pathname })
    }, [href, pathname])

    useEffect(() => {
      onActiveStateChange?.(activeState.active, activeState.partialActive)
    }, [activeState.active, activeState.partialActive])

    const onClick = onClickLink && (() => onClickLink(activeState.active, activeState.partialActive))

    const getClassName = () => {
      if (activeState.active) return activeClassName
      if (allowPartialMatch && activeState.partialActive) return partialActiveClassName || activeClassName
    }

    if (nonlink) {
      return (
        <div className={cn(onClick && 'cursor-pointer', className, getClassName())} onClick={onClick}>
          {children}
        </div>
      )
    } else {
      props.onClick = onClick
      return (
        <Link href={href} className={cn(className, getClassName())} {...props}>
          {children}
        </Link>
      )
    }
  }
)
NavLink.displayName = 'NavLink'

export default NavLink
