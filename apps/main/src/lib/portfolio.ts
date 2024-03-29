export interface PortfolioItem {
  href: string
  thumbnail: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
}

export function findPortfolioItem(portfolio: PortfolioItem[], slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.href.endsWith(slug))
}

export interface PortfolioComponentMap {
  [href: string]: React.ComponentType<any>
}
