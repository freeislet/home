import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { customAlphabet } from 'nanoid'

import { isDev } from './env'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterDiff(obj: object, obj2: any) {
  const filteredEntries = Object.entries(obj).filter(([k, v]) => obj2[k] !== v)
  return Object.fromEntries(filteredEntries)
}

export function isEmpty(obj: object) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false
    }
  }
  return true
}

export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7) // 7-character random string

export function clog(...args: any[]) {
  console.log(...args)
}

export function cerror(...args: any[]) {
  console.error(...args)
}

export const clogd = isDev() ? (...args: any[]) => clog(...args) : () => {}
export const cerrord = isDev() ? (...args: any[]) => cerror(...args) : () => {}
