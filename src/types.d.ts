type PartialPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>

type RequiredPick<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
type RequiredExcept<T, K extends keyof T> = Pick<T, K> & Required<Omit<T, K>>
