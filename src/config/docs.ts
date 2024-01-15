export interface NavItem {
  title: string
  label?: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: React.ReactNode

  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: 'Link 1',
    href: '/link1',
  },
  {
    title: 'Link 2',
    href: '/link2',
  },
  {
    title: 'with submenu',
    href: '/link3',
    children: [
      {
        title: 'Sub 1',
        href: '/link3/sub1',
      },
      {
        title: 'Sub 2',
        href: '/link3/sub2',
      },
    ],
  },
  {
    title: 'About',
    href: '/about',
  },
]

export interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: navItems,
  sidebarNav: navItems,
}
