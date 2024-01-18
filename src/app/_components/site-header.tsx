import Link from 'next/link'

import { getPageSession } from '@/auth/lucia'
import { siteConfig } from '@/config/site'
import { NavMain } from './nav-main'
import { NavMobile } from './nav-mobile'
import { Logo } from '@/components/icons'
import { ThemeMode } from '@/components/theme-mode'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export async function SiteHeader() {
  const session = await getPageSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background-blur">
      <div className="my-container my-flex-row h-14">
        <div className="sm:hidden">
          <NavMobile />
        </div>

        <Link href="/" className="my-flex-row mr-8">
          <Logo className="size-8" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <div className="hidden sm:block mr-4">
          <NavMain />
        </div>

        <div className="my-flex-row ml-auto">
          {session ? (
            <Avatar className="size-8 mr-4">
              <AvatarImage src="" />
              <AvatarFallback className="text-sm">AB</AvatarFallback>
            </Avatar>
          ) : (
            <Link
              href="/login"
              className="text-sm underline-offset-4 hover:underline mr-4"
            >
              log in
            </Link>
          )}
          <ThemeMode />
        </div>
      </div>
    </header>
  )
}
