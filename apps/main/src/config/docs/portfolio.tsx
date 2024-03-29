import { type PortfolioItem, findPortfolioItem as _findPortfolioItem } from '@/lib/portfolio'

export type PortfolioId = 'three-js' | 'mediapipe'
export type PortfolioMap = {
  [id in PortfolioId]: PortfolioItem[]
}

export const portfolios: PortfolioMap = {
  'three-js': [
    {
      href: '/game/three-js/basic-demo',
      thumbnail: '/contents/three-js/basic-demo.png',
      title: 'Basic demo',
      description: 'Basic demo',
    },
    {
      href: '/game/three-js/html',
      thumbnail: '/contents/three-js/html.png',
      title: 'HTML',
      description: 'HTML',
    },
    {
      href: '/game/three-js/shoe',
      thumbnail: '/contents/three-js/shoe.png',
      title: 'Shoe configurator',
      description: 'Shoe configurator',
    },
    {
      href: '/game/three-js/portal',
      thumbnail: '/contents/three-js/portal.png',
      title: 'Portal shader',
      description: 'Portal shader',
    },
    {
      href: '/game/three-js/particles',
      thumbnail: '/contents/three-js/particles.png',
      title: 'Particles & Effects',
      description: 'Particles & Effects',
    },
  ],
  mediapipe: [
    {
      href: '/ai/mediapipe/face-tracking',
      thumbnail: '/contents/mediapipe/face-tracking.png',
      title: 'Face Tracking',
      description: 'Face Landmarker를 이용한 실시간 face tracking 예제.',
    },
    {
      href: '/ai/mediapipe/face-avatar',
      thumbnail: '/contents/mediapipe/face-avatar.png',
      title: 'Face Avatar',
      description:
        'Face Landmarker의 facialTransformationMatrixes, faceBlendshapes를 이용한 실시간 face avatar 렌더링 예제.',
    },
    {
      href: '/ai/mediapipe/hand-tracking',
      thumbnail: '/contents/mediapipe/hand-tracking.png',
      title: 'Hand Tracking',
      description: 'Hand Landmarker를 이용한 실시간 hand tracking 예제.',
    },
    {
      href: '/ai/mediapipe/pose-tracking',
      thumbnail: '/contents/mediapipe/pose-tracking.png',
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
