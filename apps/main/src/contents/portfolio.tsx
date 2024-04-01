import { type PortfolioItem, findPortfolioItem as _findPortfolioItem } from '@/lib/portfolio'

export type PortfolioId = 'three-js' | 'unity' | 'mediapipe'
export type PortfolioMap = {
  [id in PortfolioId]: PortfolioItem[]
}

export const portfolios: PortfolioMap = {
  'three-js': [
    {
      href: '/game/three-js/basic-demo',
      thumbnail: '/image/threejs/basic-demo.png',
      title: 'Basic demo',
      description: 'Basic demo',
    },
    {
      href: '/game/three-js/html',
      thumbnail: '/image/threejs/html.png',
      title: 'HTML',
      description: 'HTML',
    },
    {
      href: '/game/three-js/shoe',
      thumbnail: '/image/threejs/shoe.png',
      title: 'Shoe configurator',
      description: 'Shoe configurator',
    },
    {
      href: '/game/three-js/portal',
      thumbnail: '/image/threejs/portal.png',
      title: 'Portal shader',
      description: 'Portal shader',
    },
    {
      href: '/game/three-js/particles',
      thumbnail: '/image/threejs/particles.png',
      title: 'Particles & Effects',
      description: 'Particles & Effects',
    },
  ],
  unity: [
    {
      href: '/game/unity/kart',
      thumbnail: '/image/unity/kart.png',
      title: 'Kart',
      description: 'Kart',
    },
    {
      href: '/game/unity/3d-game-kit',
      thumbnail: '/image/unity/3d-game-kit.png',
      title: '3D Game Kit',
      description: '3D Game Kit',
    },
  ],
  mediapipe: [
    {
      href: '/ai/mediapipe/face-tracking',
      thumbnail: '/image/mediapipe/face-tracking.png',
      title: 'Face Tracking',
      description: 'Face Landmarker를 이용한 실시간 face tracking 예제.',
    },
    {
      href: '/ai/mediapipe/face-avatar',
      thumbnail: '/image/mediapipe/face-avatar.png',
      title: 'Face Avatar',
      description:
        'Face Landmarker의 facialTransformationMatrixes, faceBlendshapes를 이용한 실시간 face avatar 렌더링 예제.',
    },
    {
      href: '/ai/mediapipe/hand-tracking',
      thumbnail: '/image/mediapipe/hand-tracking.png',
      title: 'Hand Tracking',
      description: 'Hand Landmarker를 이용한 실시간 hand tracking 예제.',
    },
    {
      href: '/ai/mediapipe/pose-tracking',
      thumbnail: '/image/mediapipe/pose-tracking.png',
      title: 'Pose Tracking',
      description: 'Pose Landmarker를 이용한 실시간 pose tracking 예제.',
    },
  ],
}

export function findPortfolioItem(slug: string): PortfolioItem | undefined {
  for (const [id, portfolio] of Object.entries(portfolios)) {
    const item = _findPortfolioItem(portfolio, slug)
    if (item) return item
  }
}
