import type { ImageProps } from 'next/image'
import Link from 'next/link'

import gameImage from '~/public/image/landing/game.jpeg'
import webImage from '~/public/image/landing/web.jpeg'
import aiImage from '~/public/image/landing/ai.jpeg'
import { Image } from '@/components/image'
import ProseLayout from '@/components/prose-layout'
import MyPortfolio from '@/contents/components/my-portfolio'

export interface CatalogItem {
  image?: ImageProps['src']
  title?: React.ReactNode
  content: React.ReactNode
}

const Link_h1 = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="underline-offset-8">
    <h1>{children}</h1>
  </Link>
)

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
        <Link_h1 href="/game/three-js">Three.js</Link_h1>
        <MyPortfolio id="three-js" />
        <Link_h1 href="/game/unity">Unity</Link_h1>
        <MyPortfolio id="unity" />
        <Link_h1 href="/game/avatar/ready-player-me">Ready Player Me</Link_h1>
        <MyPortfolio id="ready-player-me" />
      </ProseLayout>
    ),
  },
  {
    image: webImage,
    title: '🌏 웹 개발',
    content: (
      <ProseLayout>
        <h1>Visual Scripting</h1>
        <MyPortfolio id="visual-scripting" />
      </ProseLayout>
    ),
  },
  {
    image: aiImage,
    title: '👽 AI/ML',
    content: (
      <ProseLayout>
        <Link_h1 href="/ai/mediapipe">MediaPipe</Link_h1>
        <MyPortfolio id="mediapipe" />
        <h1>Gemini</h1>
        <MyPortfolio id="gemini" />
      </ProseLayout>
    ),
  },
]
