type PartialPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>

type RequiredPick<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
type RequiredExcept<T, K extends keyof T> = Pick<T, K> & Required<Omit<T, K>>

interface NavItem {
  title: React.ReactNode
  icon?: React.ReactNode
  href: string
  nonlink?: boolean
  nonlinkRedirectUrl?: string
  disabled?: boolean

  children?: NavItem[]
  portfolio?: PortfolioItem[]
}

interface PortfolioItem {
  href: string
  thumbnail: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
}
