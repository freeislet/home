import { useState, useCallback, memo } from 'react'
import { ChevronDown } from 'lucide-react'

import { type NavItem } from '@/lib/nav'
import { cn } from '@/lib/utils'
import NavLink from '@/components/nav-link'

interface NavTreeProps extends React.ComponentProps<'div'> {
  nav: NavItem[]
}

interface NavInnerTreeProps {
  nav: NavItem[]
  depth: number
}

interface NavTreeItemProps {
  navItem: NavItem
  depth: number
  initialCollapse?: boolean
}

export default function NavTree({ nav, className, ...props }: NavTreeProps) {
  return (
    <div className={cn('my-flex-col space-y-2 text-[15px]', className)} {...props}>
      {nav.map((item, index) => (
        <div key={index}>
          <NavTreeItem navItem={item} depth={0} initialCollapse />
        </div>
      ))}
    </div>
  )
}

const NavInnerTree = memo(({ nav, depth }: NavInnerTreeProps) => {
  return (
    <div className={cn('my-flex-col space-y-2 text-sm ml-3', depth <= 1 ? 'py-3' : 'py-2')}>
      {nav.map((item, index) => (
        <div key={index}>
          <NavTreeItem navItem={item} depth={depth} initialCollapse />
        </div>
      ))}
    </div>
  )
})
NavInnerTree.displayName = 'NavInnerTree'

const NavTreeItem = memo(({ navItem, depth, initialCollapse = false }: NavTreeItemProps) => {
  const [expanded, setExpanded] = useState(!initialCollapse)

  const onActiveStateChange = useCallback((active: boolean, partialActive: boolean) => {
    if (active || partialActive) setExpanded(true)
  }, [])

  const hasChildren = !!navItem.children?.length
  return (
    <>
      <div className="my-flex-row">
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
          <NavInnerTree nav={navItem.children!} depth={depth + 1} />
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
