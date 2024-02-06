export interface NavItem {
  title: React.ReactNode
  icon?: React.ReactNode
  href?: string
  disabled?: boolean

  children?: NavItem[]
}

export function filterValidNav(navItems: NavItem[]): NavItem[] {
  return navItems?.filter((item) => !item.disabled) ?? []
}

export function getBaseNavItem(nav: NavItem[], pathname: string): NavItem | undefined {
  const matchPathname = (item: NavItem) => {
    if (item.href === pathname) return true
    if (item.children) {
      for (const child of item.children) {
        if (matchPathname(child)) return true
      }
    }
  }

  for (const navItem of nav) {
    if (matchPathname(navItem)) return navItem
  }
}
