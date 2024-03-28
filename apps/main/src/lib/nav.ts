import { PortfolioItem } from './portfolio'

export interface NavItem {
  title: React.ReactNode
  icon?: React.ReactNode
  href: string
  nonlink?: boolean
  disabled?: boolean

  children?: NavItem[]
  portfolio?: PortfolioItem[]
}

export function buildValidNav(nav: NavItem[]): NavItem[] {
  function build(item: NavItem) {
    if (item.disabled) return false

    const children = item.children?.filter(build)
    const portfolioNav = item.portfolio?.map((item) => ({ title: item.title, href: item.href }))
    item.children = children || portfolioNav ? [...(children || []), ...(portfolioNav || [])] : undefined
    return true
  }

  const validNav = nav.filter(build)
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
