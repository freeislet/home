export function findPortfolioItem(portfolio: PortfolioItem[], slug: string): PortfolioItem | undefined {
  return portfolio.find((item) => item.href.endsWith(slug))
}
