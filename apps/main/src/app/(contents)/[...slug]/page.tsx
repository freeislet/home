import MyPortfolioPage from '@/app/_components/my-portfolio-page'
import { findPortfolioItem, PortfolioId } from '@/config/docs/portfolio'

export default function FallbackPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  const portfolioItem = findPortfolioItem(slug)
  if (portfolioItem) {
    return <MyPortfolioPage item={portfolioItem} />
  }
}
