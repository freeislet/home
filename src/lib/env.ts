export function isProd() {
  return process.env.NODE_ENV === 'production'
}

export function isDev() {
  return process.env.NODE_ENV === 'development'
}

export function isPreview() {
  return process.env.VERCEL_ENV === 'preview'
}

export function getBaseUrl() {
  // if (typeof window !== 'undefined')
  //   // browser should use relative path
  //   return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}
