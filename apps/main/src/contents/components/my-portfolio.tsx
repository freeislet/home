'use client'

import PortfolioList from '@/components/portfolio-list'
import { portfolios, PortfolioId } from '../portfolio'

export interface MyPortpolioProps {
  id: PortfolioId
}

export default function MyPortfolio({ id }: MyPortpolioProps) {
  const portfolio = portfolios[id]
  return <PortfolioList portfolio={portfolio} />
}
