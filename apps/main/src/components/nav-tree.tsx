import { type NavItem, filterValidNav } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { NavLink } from '@/components/nav-link'

interface NavTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: NavItem[]
  depth?: number
}

export function NavTree({ nav, depth = 0, className, ...props }: NavTreeProps) {
  const validNav = filterValidNav(nav)

  return (
    <div
      className={cn(
        'my-flex-col',
        depth === 0 ? 'space-y-5 text-[15px]' : 'space-y-2 mt-3 ml-3 text-sm',
        depth > 1 && 'mt-2',
        className
      )}
      {...props}
    >
      {validNav.map((item, index) => (
        <div key={index}>
          {item.href ? (
            <NavLink
              href={item.href}
              className="my-flex-row space-x-1 text-foreground/60 hover:text-foreground/80 transition-colors"
              activeClassName="text-foreground underline underline-offset-4 decoration-2 decoration-sky-300"
              allowPartialMatch
              partialActiveClassName="text-foreground/70"
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ) : (
            <div className="my-flex-row space-x-1 text-muted-foreground">
              {item.icon}
              <span>{item.title}</span>
            </div>
          )}
          {item.children?.length && <NavTree nav={item.children} depth={depth + 1} />}
        </div>
      ))}
    </div>
  )
}
