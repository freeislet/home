export function buildNav(nav: NavItem[]): NavItem[] {
  function build(item: NavItem) {
    if (item.disabled) return false

    const children = item.children?.filter(build)
    const portfolioNav = item.portfolio?.map((item) => ({ title: item.title, href: item.href }))
    item.children = children || portfolioNav ? [...(children || []), ...(portfolioNav || [])] : undefined

    if (item.nonlink) item.nonlinkRedirectUrl = findFirstValidUrl(item)

    return true
  }

  const validNav = nav.filter(build)
  return validNav
}

function findFirstValidUrl(navItem: NavItem): string | undefined {
  if (!navItem.disabled && !navItem.nonlink) return navItem.href
  if (navItem.children?.length) {
    for (const child of navItem.children) {
      return findFirstValidUrl(child)
    }
  }
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

export function findNavItem(nav: NavItem[], href: string): NavItem | undefined {
  for (const item of nav) {
    if (item.href == href) return item
    if (item.children?.length) {
      const found = findNavItem(item.children, href)
      if (found) return found
    }
  }
}

export function findNavItemWithAncestors(nav: NavItem[], href: string): NavItem[] {
  function trace(nav: NavItem[], href: string): boolean {
    for (const item of nav) {
      if (item.href == href) {
        itemAndAncestors = [item]
        return true
      }
      if (item.children?.length) {
        const found = trace(item.children, href)
        if (found) {
          itemAndAncestors.push(item)
          return true
        }
      }
    }
    return false
  }

  let itemAndAncestors: NavItem[] = []
  trace(nav, href)
  return itemAndAncestors
}

export function getRedirectUrl(nav: NavItem[], href: string): string | undefined {
  const navItem = findNavItem(nav, href)
  if (navItem) return findFirstValidUrl(navItem)
}
