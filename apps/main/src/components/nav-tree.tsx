import { useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
  const onClickLink = useCallback(
    (active: boolean, partialActive: boolean) => {
      // nonlink라면, 무조건 토글
      // link라면, active면 토글, 아니면 펼치기
      const expand = navItem.nonlink || active ? !expanded : true
      setExpanded(expand)
    },
    [expanded, navItem.nonlink]
  )

  const hasChildren = !!navItem.children?.length
  const expandMotionProps = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: 'auto',
      opacity: 1,
    },
    exit: {
      height: 0,
      opacity: 0,
    },
  }
  return (
    <>
      <div className="my-flex-row">
        <NavLink
          href={navItem.href}
          nonlink={navItem.nonlink}
          className={cn(
            'my-flex-row space-x-1 text-foreground/60 transition-colors',
            !navItem.nonlink && 'hover:text-blue-500'
          )}
          activeClassName="text-foreground underline underline-offset-4 decoration-2 decoration-sky-300"
          allowPartialMatch
          partialActiveClassName="text-foreground/70"
          onActiveStateChange={onActiveStateChange}
          onClickLink={onClickLink}
        >
          {navItem.icon}
          <span>{navItem.title}</span>
        </NavLink>
        {hasChildren && <ExpandToggle expanded={expanded} onChange={setExpanded} />}
      </div>
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div {...expandMotionProps} key={navItem.href} className="overflow-hidden">
            <NavInnerTree nav={navItem.children!} depth={depth + 1} key={navItem.href} />
          </motion.div>
        )}
      </AnimatePresence>
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
      className={cn(
        'ml-1 mt-1 size-4 text-foreground/80 cursor-pointer transition duration-200',
        !expanded && '-rotate-90'
      )}
      onClick={(e) => {
        onChange?.(!expanded)
      }}
      onMouseDown={(e) => {
        e.preventDefault() // 텍스트 선택 방지
      }}
    />
  )
})
ExpandToggle.displayName = 'ExpandToggle'
