import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import '@/style/globals.css'
import { siteConfig } from '@/config/site'
import { notoSansKr } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from './_components/providers'
import { SiteHeader } from './_components/site-header'
import { SiteFooter } from './_components/site-footer'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator, url: siteConfig.links.blog }],
  creator: siteConfig.creator,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        ...siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn('bg-background', notoSansKr.className)}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-1 flex">{children}</div>
            <SiteFooter />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
