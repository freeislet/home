import { PortfolioComponentMap } from '@/lib/portfolio'
import { load } from '@/components/loading'

export const portfolioComponents: PortfolioComponentMap = {
  // Three.js
  '/game/three-js/basic-demo': load(() => import('./three-js/basic-demo')),
  '/game/three-js/html': load(() => import('./three-js/html')),
  '/game/three-js/shoe': load(() => import('./three-js/shoe')),
  '/game/three-js/portal': load(() => import('./three-js/portal')),
  '/game/three-js/particles': load(() => import('./three-js/particles')),
  // MediaPipe
  '/ai/mediapipe/face-tracking': load(() => import('./mediapipe/face-tracking')),
  '/ai/mediapipe/face-avatar': load(() => import('./mediapipe/face-avatar')),
  '/ai/mediapipe/hand-tracking': load(() => import('./mediapipe/hand-tracking')),
  '/ai/mediapipe/pose-tracking': load(() => import('./mediapipe/pose-tracking')),
}
