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
        <h2>Three.js</h2>
        <MyPortfolio id="three-js" />
        <h2>Unity</h2>
        <MyPortfolio id="unity" />
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
        <h2>MediaPipe</h2>
        <MyPortfolio id="mediapipe" />
        TBD
      </ProseLayout>
    ),
  },
]
