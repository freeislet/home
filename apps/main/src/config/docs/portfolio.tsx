import { type PortfolioItem } from '@/lib/portfolio'

export const mediaPipePortfolio: PortfolioItem[] = [
  {
    href: '/game/mediapipe/face-tracking',
    thumbnail: '/contents/mediapipe/face-tracking.png',
    title: 'Face Tracking',
    description: 'Face Landmarker를 이용한 실시간 face tracking 예제.',
  },
  {
    href: '/game/mediapipe/face-avatar',
    thumbnail: '/contents/mediapipe/face-avatar.png',
    title: 'Face Avatar',
    description:
      'Face Landmarker의 facialTransformationMatrixes, faceBlendshapes를 이용한 실시간 face avatar 렌더링 예제.',
  },
  {
    href: '/game/mediapipe/hand-tracking',
    thumbnail: '/contents/mediapipe/hand-tracking.png',
    title: 'Hand Tracking',
    description: 'Hand Landmarker를 이용한 실시간 hand tracking 예제.',
  },
  {
    href: '/game/mediapipe/pose-tracking',
    thumbnail: '/contents/mediapipe/pose-tracking.png',
    title: 'Pose Tracking',
    description: 'Pose Landmarker를 이용한 실시간 pose tracking 예제.',
  },
]
