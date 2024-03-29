'use client'

import { useState } from 'react'

import { PortfolioComponentMap, PortfolioItem } from '@/lib/portfolio'
import { NavItem } from '@/lib/nav'
import { findNavItemWithAncestors } from '@/config/docs/nav'
import { load } from '@/components/loading'
import { getNodeText } from '@/lib/node'

const portfolioLoaders: PortfolioComponentMap = {
  // TODO three-js 추가
  '/ai/mediapipe/face-tracking': load(() => import('./portfolio/mediapipe/face-tracking')),
  '/ai/mediapipe/face-avatar': load(() => import('./portfolio/mediapipe/face-avatar')),
  '/ai/mediapipe/hand-tracking': load(() => import('./portfolio/mediapipe/hand-tracking')),
  '/ai/mediapipe/pose-tracking': load(() => import('./portfolio/mediapipe/pose-tracking')),
}

interface MyPortfolioPageProps {
  item: PortfolioItem
}

export default function MyPortfolioPage({ item }: MyPortfolioPageProps) {
  const PortfolioComponent = portfolioLoaders[item.href]
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
