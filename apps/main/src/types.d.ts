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
  title: string | React.ReactNode
  description: string | React.ReactNode
  thumbnail: string | React.ReactNode
  href: string
  component?: React.ComponentType<any> // href에 해당하는 static route가 없을 때 이 컴포넌트를 불러옴 (MyPortfolioPage에서)
}
