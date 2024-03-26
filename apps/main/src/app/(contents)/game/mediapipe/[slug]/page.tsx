import { mediaPipePortfolio } from '@/config/docs'
import { findPortfolioItem, PortfolioLoaderMap } from '@/lib/portfolio'
import { load } from '@/components/loading'
import { MediaPipeIcon } from '@/components/icons'

const components: PortfolioLoaderMap = {
  'face-tracking': () => load(() => import('./_components/face-tracking')),
  'face-avatar': () => load(() => import('./_components/face-avatar')),
  'hand-tracking': () => load(() => import('./_components/hand-tracking')),
  'pose-tracking': () => load(() => import('./_components/pose-tracking')),
}

export default function MediaPipePortpolioPage({ params }: { params: { slug: string } }) {
  const portfolioItem = findPortfolioItem(mediaPipePortfolio, params.slug)
  const PortfolioComponent = components[params.slug]?.()

  return (
    <div className="my-grid-main">
      <div className="my-flex-row m-2">
        <MediaPipeIcon />
        <span className="badge mr-1 ml-0.5">MediaPipe</span>
        {portfolioItem?.title}
      </div>
      <PortfolioComponent />
    </div>
  )
}
