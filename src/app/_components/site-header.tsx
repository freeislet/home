'use client'

import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { NavMain } from './nav-main'
import { NavSidebar } from './nav-sidebar'
import { Logo } from '@/components/icons'
import { ThemeMode } from '@/components/theme-mode'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background-blur">
      <div className="my-container my-flex-row h-14">
        <div className="md:hidden">
          <NavSidebar />
        </div>

        <Link href="/" className="my-flex-row mr-6">
          <Logo marginRight={2} />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <div className="hidden md:flex mr-4">
          <NavMain />
        </div>

        <div className="ml-auto">
          <div className="inline ml-4">
            <ThemeMode />
          </div>
        </div>
      </div>
    </header>
  )
}
