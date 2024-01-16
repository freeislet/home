import url, { type UrlObject } from 'url'

export function hrefAsString(href: string | UrlObject): string {
  return url.format(href)
}

function nthIndex(str: string, pat: string, n: number) {
  let i = -1
  while (n-- && i++ < str.length) {
    i = str.indexOf(pat, i)
    if (i < 0) break
  }
  return i
}

export function getBasePathname(pathname: string, numSegments = 1) {
  const lastSlashPos = nthIndex(pathname, '/', numSegments + 1)
  if (lastSlashPos < 0) return pathname
  return pathname.substring(0, lastSlashPos)
}
