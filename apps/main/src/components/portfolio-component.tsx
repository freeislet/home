import { PortfolioItem, findPortfolioItem } from '@/lib/portfolio'
import { load } from '@/components/loading'

interface PortfolioComponentProps {
  portfolio: PortfolioItem[]
  slug: string
}

export default function PortfolioComponent({ portfolio, slug }: PortfolioComponentProps) {
  const portfolioItem = findPortfolioItem(portfolio, slug)
  if (!portfolioItem) return false

  const Component = load(() => import(portfolioItem.component))
  return <Component />
}
