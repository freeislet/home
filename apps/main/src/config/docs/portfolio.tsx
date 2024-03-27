import { type PortfolioItem } from '@/lib/portfolio'

export const mediaPipePortfolio: PortfolioItem[] = [
  {
    href: '/game/mediapipe/face-tracking',
    thumbnail: '/contents/mediapipe/face-tracking.png',
    title: 'Face Tracking 예제',
    description: 'Face Landmarker를 이용한 실시간 face tracking.',
  },
  {
    href: '/game/mediapipe/face-avatar',
    thumbnail: '/contents/mediapipe/face-avatar.png',
    title: 'Face Avatar 예제',
    description: 'Face Landmarker의 facialTransformationMatrixes, faceBlendshapes를 이용한 실시간 face avatar 렌더링.',
  },
  {
    href: '/game/mediapipe/hand-tracking',
    thumbnail: '/contents/mediapipe/hand-tracking.png',
    title: 'Hand Tracking 예제',
    description: 'Hand Landmarker를 이용한 실시간 hand tracking.',
  },
  {
    href: '/game/mediapipe/pose-tracking',
    thumbnail: '/contents/mediapipe/pose-tracking.png',
    title: 'Pose Tracking 예제',
    description: 'Pose Landmarker를 이용한 실시간 pose tracking.',
  },
]
