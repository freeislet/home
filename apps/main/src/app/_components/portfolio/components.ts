import { PortfolioComponentMap } from '@/lib/portfolio'
import { load } from '@/components/loading'

export const portfolioComponents: PortfolioComponentMap = {
  // TODO three-js 추가
  '/ai/mediapipe/face-tracking': load(() => import('./mediapipe/face-tracking')),
  '/ai/mediapipe/face-avatar': load(() => import('./mediapipe/face-avatar')),
  '/ai/mediapipe/hand-tracking': load(() => import('./mediapipe/hand-tracking')),
  '/ai/mediapipe/pose-tracking': load(() => import('./mediapipe/pose-tracking')),
}
