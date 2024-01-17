'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BsList } from 'react-icons/bs'

import { docsConfig } from '@/config/docs'
import { siteConfig } from '@/config/site'
import { Logo } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NavTree } from './nav-tree'

export function NavMobile() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-1.5 text-base bg-secondary focus-visible:no-ring"
        >
          <BsList size={24} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px]">
        <Link href="/" className="my-flex-row border-b">
          <Logo size={30} />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <ScrollArea className="my-8 h-[calc(100vh-8rem)] pb-10 pl-4">
          <NavTree nav={docsConfig.nav} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
