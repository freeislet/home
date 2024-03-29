import { PortfolioLoaderMap, PortfolioItem } from '@/lib/portfolio'
import { load } from '@/components/loading'
import { MediaPipeIcon } from '@/components/icons'

const portfolioLoaders: PortfolioLoaderMap = {
  // TODO three-js 추가
  '/ai/mediapipe/face-tracking': () => load(() => import('./portfolio/mediapipe/face-tracking')),
  '/ai/mediapipe/face-avatar': () => load(() => import('./portfolio/mediapipe/face-avatar')),
  '/ai/mediapipe/hand-tracking': () => load(() => import('./portfolio/mediapipe/hand-tracking')),
  '/ai/mediapipe/pose-tracking': () => load(() => import('./portfolio/mediapipe/pose-tracking')),
}

interface MyPortfolioPageProps {
  item: PortfolioItem
}

export default function MyPortfolioPage({ item }: MyPortfolioPageProps) {
  const PortfolioComponent = portfolioLoaders[item.href]?.()
  // TODO: nav 정보 찾기

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <MediaPipeIcon />
        <span className="badge mr-1 ml-0.5">MediaPipe</span>
        {item?.title}
      </div>
      <PortfolioComponent />
    </div>
  )
}
