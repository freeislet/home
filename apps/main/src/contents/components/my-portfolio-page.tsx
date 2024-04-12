'use client'

import { useRef, useState } from 'react'
import { notFound } from 'next/navigation'
import { TbInfoHexagon } from 'react-icons/tb'

import { findNavItemWithAncestors } from '../nav'
import { getNodeText } from '@/lib/node'
import { cn } from '@/lib/utils'
import { ScrollTrigger, ScrollTarget } from '@/components/scroll-trigger'
import { DownToDocument, ScrollToTop } from '@/contents/components/scroll-ui'
import ProseLayout from '@/components/prose-layout'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface MyPortfolioPageProps {
  item: PortfolioItem
}

export default function MyPortfolioPage({ item }: MyPortfolioPageProps) {
  const PortfolioComponent = item.component
  if (!PortfolioComponent) notFound()

  const PortfolioDocument = item.document

  const [state, setState] = useState<{
    navLine: NavItem[] // 특정 navItem과 ancestors 리스트
    icon?: React.ReactNode // navLine의 최초 icon
    badge?: string // navItem 부모 title
  }>(() => {
    const navLine = findNavItemWithAncestors(item.href)
    const icon = navLine.find((item) => item.icon)?.icon
    const [_, parent] = navLine
    const badge = parent && getNodeText(parent.title)
    return { navLine, icon, badge }
  })
  const docRef = useRef(null)

  return (
    <>
      <div className="my-grid-main">
        <div className="my-flex-row m-2">
          {state.icon}&thinsp;
          {state.badge && <span className="badge mr-1">{state.badge}</span>}
          {item.title}
          <InfoTooltip content={item.description} className="ml-1" />
          {PortfolioDocument && (
            <ScrollTrigger targetRef={docRef} className="ml-4">
              <DownToDocument />
            </ScrollTrigger>
          )}
        </div>
        <PortfolioComponent />
      </div>
      {PortfolioDocument && (
        <>
          <ScrollTarget ref={docRef} />
          <div className="my-container relative">
            <ScrollToTop text={item.details?.scrollToTopText} />
            <ProseLayout>
              <PortfolioDocument />
            </ProseLayout>
          </div>
        </>
      )}
    </>
  )
}

function InfoTooltip({ content, className }: { content: React.ReactNode; className?: string }) {
  if (!content) return null

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <TbInfoHexagon
            className={cn(
              'size-5 p-0.5 rounded-sm',
              'text-foreground/50',
              'hover:text-foreground/80 hover:bg-foreground/10',
              className
            )}
          />
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="text-sm text-foreground/70">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
