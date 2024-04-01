'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'

import { findNavItemWithAncestors } from '@/contents/nav'
import { getNodeText } from '@/lib/node'

interface MyPortfolioPageProps {
  item: PortfolioItem
}

export default function MyPortfolioPage({ item }: MyPortfolioPageProps) {
  const PortfolioComponent = item.component
  if (!PortfolioComponent) notFound()

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

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        {state.icon}&thinsp;
        {state.badge && <span className="badge mr-1">{state.badge}</span>}
        {item.title}
      </div>
      <PortfolioComponent />
    </div>
  )
}
