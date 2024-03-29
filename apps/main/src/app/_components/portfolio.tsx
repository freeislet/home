import PortfolioList from '@/components/portfolio-list'
import { portfolios, PortfolioId } from '@/config/docs/portfolio'

export interface PortpolioProps {
  id: PortfolioId
}

export default function Portfolio({ id }: PortpolioProps) {
  const portfolio = portfolios[id]
  return <PortfolioList portfolio={portfolio} />
}
