import PortfolioList from '@/components/portfolio-list'
import { portfolios, PortfolioId } from '@/config/docs/portfolio'

export interface MyPortpolioProps {
  id: PortfolioId
}

export default function MyPortfolio({ id }: MyPortpolioProps) {
  const portfolio = portfolios[id]
  return <PortfolioList portfolio={portfolio} />
}
