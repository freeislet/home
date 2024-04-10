'use client'

import { useRef, useState } from 'react'
import { notFound } from 'next/navigation'

import { findNavItemWithAncestors } from '../nav'
import { getNodeText } from '@/lib/node'
import { ScrollTrigger, ScrollTarget } from '@/components/scroll-trigger'
import { DownToDocument, ScrollToTop } from '@/contents/components/scroll-ui'
import ProseLayout from '@/components/prose-layout'

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
