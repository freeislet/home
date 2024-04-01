import { notFound } from 'next/navigation'

import { findPortfolioItem } from '@/contents/portfolio'
import MyPortfolioPage from '@/contents/components/my-portfolio-page'

export default function FallbackPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/')
  const portfolioItem = findPortfolioItem(slug)
  if (portfolioItem) {
    return <MyPortfolioPage item={portfolioItem} />
  }

  notFound()
}
