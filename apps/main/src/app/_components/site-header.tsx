import Link from 'next/link'

import { getSessionUser } from '@/auth/lucia'
import { siteConfig } from '@/config/site'
import { Logo } from '@/components/icons'
import { ThemeMode } from '@/components/theme-mode'
import { UserNav } from '@/components/user-nav'
import { NavMain } from '@/contents/components/nav-main'
import { NavMobile } from '@/contents/components/nav-mobile'
import { ScrollProgress } from './scroll-progress'

export async function SiteHeader() {
  const user = await getSessionUser()

  return (
    <header className="sticky top-0 z-50 w-full h-header-height border-b border-border/40 bg-background-blur">
      <div className="my-container my-flex-row h-full">
        <div className="md:hidden">
          <NavMobile />
        </div>

        <Link href="/" className="my-flex-row mr-8">
          <Logo className="size-8 mr-1" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <div className="hidden md:block mr-4">
          <NavMain />
        </div>

        <div className="my-flex-row ml-auto space-x-2">
          <UserNav user={user} />
          <ThemeMode />
        </div>
      </div>
      <ScrollProgress />
    </header>
  )
}
