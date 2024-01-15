'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { NavMain } from './nav-main'
import { NavSidebar } from './nav-sidebar'
import { Logo } from '@/components/icons'
import { ThemeMode } from '@/components/theme-mode'

export function SiteHeader() {
  const pathname = usePathname()
  const isActive = (url: string) => pathname === url
  const navItems = [
    ['Home', '/'],
    ['Portfolio 1', '/portfolio1'],
    ['Portfolio 2', '/portfolio2'],
    ['Portfolio 3', '/portfolio3'],
    ['About', '/about'],
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background-blur">
      <div className="my-container my-flex-row h-14">
        <div className="md:hidden">
          <NavSidebar />
        </div>

        <Link href="/" className="my-flex-row space-x-2 mr-6">
          <Logo />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>

        <div className="hidden md:flex mr-4">
          <NavMain />
        </div>

        <div className="ml-auto">
          <nav className="inline text-sm font-medium hidden">
            {navItems.map(([title, url], index) => (
              <Link
                className={`py-1 px-2 rounded-sm hover:bg-theme-active/30
                  ${isActive(url) ? 'text-theme-active font-bold' : ''}`}
                href={url}
                key={index}
              >
                {title}
              </Link>
            ))}
          </nav>
          <div className="inline ml-4">
            <ThemeMode />
          </div>
        </div>
      </div>
    </header>
  )
}
