import '@/globals.css'
import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { notoSansKr } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/app/providers'
import { SiteHeader } from '@/components/app/site-header'
import { SiteFooter } from '@/components/app/site-footer'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [siteConfig.author],
  creator: siteConfig.author.name,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={cn('bg-background', notoSansKr.className)}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  )
}
