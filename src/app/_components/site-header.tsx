import Link from 'next/link'

import { getPageSession } from '@/auth/lucia'
import { siteConfig } from '@/config/site'
import { NavMain } from './nav-main'
import { NavMobile } from './nav-mobile'
import { Logo } from '@/components/icons'
import { ThemeMode } from '@/components/theme-mode'
import { UserNav } from '@/components/user-nav'

export async function SiteHeader() {
  const session = await getPageSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background-blur">
      <div className="my-container my-flex-row h-14">
        <div className="md:hidden">
          <NavMobile />
        </div>

        <Link href="/" className="my-flex-row mr-8">
          <Logo className="size-8" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <div className="hidden md:block mr-4">
          <NavMain />
        </div>

        <div className="my-flex-row ml-auto space-x-2">
          <UserNav user={session?.user} />
          <ThemeMode />
        </div>
      </div>
    </header>
  )
}
