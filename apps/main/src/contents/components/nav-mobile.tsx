'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BsList } from 'react-icons/bs'

import { siteConfig } from '@/config/site'
import { nav } from '@/contents/nav'
import { Logo } from '@/components/icons'
import NavTree from '@/components/nav-tree'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export function NavMobile() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="mr-2 px-1.5 text-base bg-secondary focus-visible:no-ring">
          <BsList size={24} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px]">
        <Link href="/" className="my-flex-row border-b">
          <Logo className="size-8 mr-1" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <ScrollArea className="my-8 h-[calc(100vh-8rem)] pl-4">
          <nav>
            <NavTree nav={nav} className="pb-10" />
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
