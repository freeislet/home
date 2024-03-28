export interface NavItem {
  title: React.ReactNode
  icon?: React.ReactNode
  href: string
  nonlink?: boolean
  disabled?: boolean

  children?: NavItem[]
}

export function buildValidNav(nav: NavItem[]): NavItem[] {
  const validNav = nav?.filter((item) => !item.disabled) ?? []
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
