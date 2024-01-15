type PartialPick<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type PartialOmit<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>
