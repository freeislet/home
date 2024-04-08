import type { ImageProps } from 'next/image'

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
        <h1>Three.js</h1>
        <MyPortfolio id="three-js" />
        <h1>Unity</h1>
        <MyPortfolio id="unity" />
        <h1>Ready Player Me</h1>
        <MyPortfolio id="ready-player-me" />
      </ProseLayout>
    ),
  },
  {
    image: webImage,
    title: '🌏 웹 개발',
    content: <ProseLayout>TBD</ProseLayout>,
  },
  {
    image: aiImage,
    title: '👽 AI/ML',
    content: (
      <ProseLayout>
        <h1>MediaPipe</h1>
        <MyPortfolio id="mediapipe" />
        TBD
      </ProseLayout>
    ),
  },
]
