import type { ImageProps } from 'next/image'
import Link from 'next/link'

import gameImage from '~/public/image/landing/game.jpeg'
import webImage from '~/public/image/landing/web.jpeg'
import aiImage from '~/public/image/landing/ai.jpeg'
import { Image } from '@/components/image'
import ProseLayout from '@/components/prose-layout'
import MyPortfolio from '@/contents/components/my-portfolio'
import IconText from '@/components/icon-text'
import { findNavItem } from './nav'

const Heading = ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>
const LinkHeading = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="underline-offset-8">
    <h2>{children}</h2>
  </Link>
)
const PortfolioHeading = ({ href }: { href: string }) => {
  const navItem = findNavItem(href)
  if (!navItem) return

  const children = <IconText icon={navItem.icon} text={navItem.title} />
  return navItem.nonlink ? <Heading>{children}</Heading> : <LinkHeading href={href}>{children}</LinkHeading>
}

export interface CatalogItem {
  image?: ImageProps['src']
  title?: React.ReactNode
  content: React.ReactNode
}

export const catalog: CatalogItem[] = [
  {
    content: (
      <div className="flex-1 py-20 flex flex-col items-center">
        <p className="mb-12 text-center text-2xl font-semibold leading-relaxed">
          게임 개발자 / 웹 개발자 / 데이터 엔지니어의
          <br />
          포트폴리오 & 블로그 <span className="text-lg font-normal">(...를 만드는 중)</span> 입니다.
        </p>
        <Image src="/image/landing/spaceboy1.jpeg" className="h-72 rounded-2xl my-4 mx-auto" />
      </div>
    ),
  },
  {
    image: gameImage,
    title: '🚀 게임/3D',
    content: (
      <ProseLayout>
        <PortfolioHeading href="/game/three-js" />
        <MyPortfolio id="three-js" />
        <PortfolioHeading href="/game/unity" />
        <MyPortfolio id="unity" />
        <PortfolioHeading href="/game/avatar/ready-player-me" />
        <MyPortfolio id="ready-player-me" />
      </ProseLayout>
    ),
  },
  {
    image: webImage,
    title: '🌏 웹 개발',
    content: (
      <ProseLayout>
        <PortfolioHeading href="/web/web-components" />
        <MyPortfolio id="web-components" />
        <PortfolioHeading href="/web/visual-scripting" />
        <MyPortfolio id="visual-scripting" />
      </ProseLayout>
    ),
  },
  {
    image: aiImage,
    title: '👽 AI/ML',
    content: (
      <ProseLayout>
        <PortfolioHeading href="/ai/mediapipe" />
        <MyPortfolio id="mediapipe" />
        <PortfolioHeading href="/ai/gemini" />
        <MyPortfolio id="gemini" />
      </ProseLayout>
    ),
  },
]
