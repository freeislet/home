export interface PortfolioItem {
  href: string
  thumbnail: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
  disabled?: boolean
}

export function filterValidPortfolio(portfolio: PortfolioItem[]): PortfolioItem[] {
  return portfolio.filter((item) => !item.disabled) ?? []
}

export function findPortfolioItem(portfolio: PortfolioItem[], slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.href.endsWith(slug))
}

export interface PortfolioLoaderMap {
  [slug: string]: () => React.ComponentType<any>
}
