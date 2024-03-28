import { useState, useCallback, memo } from 'react'
import { ChevronDown } from 'lucide-react'

import { type NavItem } from '@/lib/nav'
import { cn } from '@/lib/utils'
import NavLink from '@/components/nav-link'

interface NavTreeProps extends React.ComponentProps<'div'> {
  nav: NavItem[]
  depth?: number
}

export default function NavTree({ nav, depth = 0, className, ...props }: NavTreeProps) {
  return (
    <div
      className={cn(
        'my-flex-col',
        depth === 0 ? 'space-y-2 text-[15px]' : 'ml-3 py-3 space-y-2 text-sm',
        depth > 1 && 'py-2',
        className
      )}
      {...props}
    >
      {nav.map((item, index) => (
        <div key={index}>
          <NavTreeItem navItem={item} depth={depth} initialCollapse />
        </div>
      ))}
    </div>
  )
}

interface NavTreeItemProps extends React.ComponentProps<'div'> {
  navItem: NavItem
  depth: number
  initialCollapse?: boolean
}

const NavTreeItem = memo(({ navItem, depth, initialCollapse = false, className, ...props }: NavTreeItemProps) => {
  const [expanded, setExpanded] = useState(!initialCollapse)

  const onActiveStateChange = useCallback((active: boolean, partialActive: boolean) => {
    if (active || partialActive) setExpanded(true)
  }, [])

  const hasChildren = !!navItem.children?.length
  return (
    <>
      <div className={cn('my-flex-row', className)} {...props}>
        <NavLink
          href={navItem.href}
          nonlink={navItem.nonlink}
          className="my-flex-row space-x-1 text-foreground/60 hover:text-foreground/80 transition-colors"
          activeClassName="text-foreground underline underline-offset-4 decoration-2 decoration-sky-300"
          allowPartialMatch
          partialActiveClassName="text-foreground/70"
          onActiveStateChange={onActiveStateChange}
        >
          {navItem.icon}
          <span>{navItem.title}</span>
        </NavLink>
        {hasChildren && <ExpandToggle expanded={expanded} onChange={setExpanded} />}
      </div>
      {hasChildren && expanded && (
        <div className="overflow-hidden">
          <NavTree nav={navItem.children!} depth={depth + 1} />
        </div>
      )}
    </>
  )
})
NavTreeItem.displayName = 'NavTreeItem'

/**
 * Expand 토글 버튼
 */

interface ExpandToggleProps {
  expanded: boolean
  onChange?: (expanded: boolean) => void
}

const ExpandToggle = memo(({ expanded, onChange }: ExpandToggleProps) => {
  return (
    <ChevronDown
      className={cn('ml-1 size-4 text-foreground/80 cursor-pointer transition duration-200', {
        'rotate-180': expanded,
      })}
      onClick={(e) => {
        onChange?.(!expanded)
      }}
    />
  )
})
ExpandToggle.displayName = 'ExpandToggle'
