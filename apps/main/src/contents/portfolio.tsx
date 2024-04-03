'use client'
// NOTE: PortfolioItem에 dynamic component 포함하면서 'use client' 선언
//       -> PortfolioList, MyPortfolio, FallbackPage를 client component로 변경
//       (다시 component 목록을 ./portfolio/portfolio-components.ts에 맵으로 분리하는게 나을지도?)

import { findPortfolioItem as _findPortfolioItem } from '@/lib/portfolio'
import { load } from '@/components/loading'

export type PortfolioId = 'three-js' | 'unity' | 'ready-player-me' | 'mediapipe'
export type PortfolioMap = {
  [id in PortfolioId]: PortfolioItem[]
}

export const portfolios: PortfolioMap = {
  'three-js': [
    {
      title: 'Basic demo',
      description: '오브젝트 추가 및 애니메이션, 메시 로딩 예제.',
      thumbnail: '/image/threejs/basic-demo.png',
      href: '/game/three-js/basic-demo',
      component: load(() => import('./portfolio/three-js/basic-demo')),
    },
    {
      title: 'HTML',
      description: 'HTML 렌더링 예제',
      thumbnail: '/image/threejs/html.png',
      href: '/game/three-js/html',
      component: load(() => import('./portfolio/three-js/html')),
    },
    {
      title: 'Shoe configurator',
      description: '서브메시 picking 및 머티리얼 설정 예제',
      thumbnail: '/image/threejs/shoe.png',
      href: '/game/three-js/shoe',
      component: load(() => import('./portfolio/three-js/shoe')),
    },
    {
      title: 'Portal shader',
      description: '커스텀 shader 예제',
      thumbnail: '/image/threejs/portal.png',
      href: '/game/three-js/portal',
      component: load(() => import('./portfolio/three-js/portal')),
    },
    {
      title: 'Particles & Effects',
      description: '인스턴싱을 활용한 파티클 및 포스트이펙트 예제',
      thumbnail: '/image/threejs/particles.png',
      href: '/game/three-js/particles',
      component: load(() => import('./portfolio/three-js/particles')),
    },
  ],
  unity: [
    {
      title: 'Kart',
      description: '간단한 자동차 경주 예제',
      thumbnail: '/image/unity/kart.png',
      href: '/game/unity/kart',
      // component: load(() => import('./unity/kart')),
    },
    {
      title: '3D Game Kit',
      description: (
        <>
          3D 액션 게임 개발을 위한 학습용 프로젝트 (
          <a href="https://learn.unity.com/project/3d-game-kit-lite">3D Game Kit Lite</a>)
        </>
      ),
      thumbnail: '/image/unity/3d-game-kit.png',
      href: '/game/unity/3d-game-kit',
    },
  ],
  'ready-player-me': [
    {
      title: 'Avatar Creator',
      description: 'Ready Player Me Avatar Creator',
      thumbnail: '/image/threejs/basic-demo.png',
      href: '/game/avatar/ready-player-me/avatar-creator',
      component: load(() => import('./portfolio/ready-player-me/my-avatar-creator')),
    },
  ],
  mediapipe: [
    {
      title: 'Face Tracking',
      description: 'Face Landmarker를 이용한 실시간 face tracking 예제',
      thumbnail: '/image/mediapipe/face-tracking.png',
      href: '/ai/mediapipe/face-tracking',
      component: load(() => import('./portfolio/mediapipe/face-tracking')),
    },
    {
      title: 'Face Avatar',
      description:
        'Face Landmarker의 facialTransformationMatrixes, faceBlendshapes를 이용한 실시간 face avatar 렌더링 예제',
      thumbnail: '/image/mediapipe/face-avatar.png',
      href: '/ai/mediapipe/face-avatar',
      component: load(() => import('./portfolio/mediapipe/face-avatar')),
    },
    {
      title: 'Hand Tracking',
      description: 'Hand Landmarker를 이용한 실시간 hand tracking 예제',
      thumbnail: '/image/mediapipe/hand-tracking.png',
      href: '/ai/mediapipe/hand-tracking',
      component: load(() => import('./portfolio/mediapipe/hand-tracking')),
    },
    {
      title: 'Pose Tracking',
      description: 'Pose Landmarker를 이용한 실시간 pose tracking 예제',
      thumbnail: '/image/mediapipe/pose-tracking.png',
      href: '/ai/mediapipe/pose-tracking',
      component: load(() => import('./portfolio/mediapipe/pose-tracking')),
    },
  ],
}

export function findPortfolioItem(slug: string): PortfolioItem | undefined {
  for (const [id, portfolio] of Object.entries(portfolios)) {
    const item = _findPortfolioItem(portfolio, slug)
    if (item) return item
  }
}
