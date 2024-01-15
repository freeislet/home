import { Logo } from '@/components/icons'

export interface NavItem {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  href?: string
  disabled?: boolean

  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: 'Link 1',
    href: '/link1',
  },
  {
    title: (
      <>
        <Logo />
        <span>Link 2</span>
      </>
    ),
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
