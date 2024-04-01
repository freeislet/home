import { findPortfolioItem as _findPortfolioItem } from '@/lib/portfolio'
import { load } from '@/components/loading'

export type PortfolioId = 'three-js' | 'unity' | 'mediapipe'
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
      description: 'Kart',
      thumbnail: '/image/unity/kart.png',
      href: '/game/unity/kart',
      // component: load(() => import('./unity/kart')),
    },
    {
      title: '3D Game Kit',
      description: '3D Game Kit',
      thumbnail: '/image/unity/3d-game-kit.png',
      href: '/game/unity/3d-game-kit',
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
