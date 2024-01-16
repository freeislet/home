'use client'

import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { NavMain } from './nav-main'
import { NavMobile } from './nav-mobile'
import { Logo } from '@/components/icons'
import { ThemeMode } from '@/components/theme-mode'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background-blur">
      <div className="my-container my-flex-row h-14">
        <div className="sm:hidden">
          <NavMobile />
        </div>

        <Link href="/" className="my-flex-row mr-8">
          <Logo size={30} />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <div className="hidden sm:block mr-4">
          <NavMain />
        </div>

        <div className="my-flex-row ml-auto">
          <ThemeMode />
        </div>
      </div>
    </header>
  )
}
