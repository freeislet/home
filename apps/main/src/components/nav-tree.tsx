import { useState, useRef, useLayoutEffect, forwardRef, memo } from 'react'
import { ChevronDown } from 'lucide-react'

import { type NavItem, filterValidNav } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { NavLink } from '@/components/nav-link'

interface NavTreeProps extends React.ComponentProps<'div'> {
  nav: NavItem[]
  depth?: number
}

const NavTree = forwardRef<HTMLDivElement, NavTreeProps>(({ nav, depth = 0, className, ...props }, ref) => {
  const validNav = filterValidNav(nav)

  return (
    <div
      ref={ref}
      className={cn(
        'my-flex-col',
        depth === 0 ? 'space-y-2 text-[15px]' : 'ml-3 py-3 space-y-2 text-sm',
        depth > 1 && 'py-2',
        className
      )}
      {...props}
    >
      {validNav.map((item, index) => (
        <div key={index}>
          <NavTreeItem navItem={item} depth={depth} initialCollapse />
        </div>
      ))}
    </div>
  )
})
NavTree.displayName = 'NavTree'

interface NavTreeItemProps extends React.ComponentProps<'div'> {
  navItem: NavItem
  depth: number
  initialCollapse?: boolean
}

const NavTreeItem = memo(({ navItem, depth, initialCollapse = false, className, ...props }: NavTreeItemProps) => {
  const [expanded, setExpanded] = useState(!initialCollapse)
  const [subtreeHeight, setSubtreeHeight] = useState('0')
  const subtreeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const subtree = subtreeRef.current
    if (subtree) {
      setSubtreeHeight(expanded ? `${subtree.clientHeight}px` : '0')
    }
  }, [subtreeRef, expanded])

  const hasChildren = !!navItem.children?.length
  return (
    <>
      <div className={cn('my-flex-row', className)} {...props}>
        {navItem.href ? (
          <NavLink
            href={navItem.href}
            className="my-flex-row space-x-1 text-foreground/60 hover:text-foreground/80 transition-colors"
            activeClassName="text-foreground underline underline-offset-4 decoration-2 decoration-sky-300"
            allowPartialMatch
            partialActiveClassName="text-foreground/70"
          >
            {navItem.icon}
            <span>{navItem.title}</span>
          </NavLink>
        ) : (
          <div className="my-flex-row space-x-1 text-muted-foreground">
            {navItem.icon}
            <span>{navItem.title}</span>
          </div>
        )}
        {hasChildren && <ExpandToggle expanded={expanded} onChange={setExpanded} />}
      </div>
      {hasChildren && (
        <div className="overflow-hidden transition-[height]" style={{ height: subtreeHeight }}>
          <NavTree ref={subtreeRef} nav={navItem.children!} depth={depth + 1} />
        </div>
      )}
    </>
  )
})
NavTreeItem.displayName = 'NavTreeItem'

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

export default NavTree
