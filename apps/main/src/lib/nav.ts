export interface NavItem {
  title: React.ReactNode
  icon?: React.ReactNode
  href: string
  nonlink?: boolean
  disabled?: boolean

  children?: NavItem[]
}

export function buildValidNav(nav: NavItem[]): NavItem[] {
  function filterFn(item: NavItem) {
    if (item.disabled) return false
    item.children = item.children?.filter(filterFn)
    return true
  }

  const validNav = nav.filter(filterFn)
  return validNav
}

export function getBaseNavItem(nav: NavItem[], pathname: string): NavItem | undefined {
  const matchPathname = (item: NavItem) => {
    if (item.href === pathname) return true
    if (item.children) {
      for (const child of item.children) {
        if (matchPathname(child)) return true
      }
    } else if (item.href) {
      if (pathname.startsWith(item.href)) return true
    }
  }

  for (const navItem of nav) {
    if (matchPathname(navItem)) return navItem
  }
}
