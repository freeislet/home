export interface PortfolioItem {
  /* Portfolio list */
  href: string
  thumbnail: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
  disabled?: boolean
  /* Portfolio page */
  slug: string
  component: string // 모듈 경로
}

export function filterValidPortfolio(portfolio: PortfolioItem[]): PortfolioItem[] {
  return portfolio.filter((item) => !item.disabled) ?? []
}

export function findPortfolioItem(portfolio: PortfolioItem[], slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.slug === slug)
}
