import { siteConfig } from '@/config/site'

export function SiteFooter() {
  return (
    <footer className="py-6 border-t">
      <div className="my-container my-flex-row justify-between gap-4">
        <p className="text-balance text-left text-sm leading-loose text-muted-foreground">
          Built by{' '}
          <a
            href={siteConfig.links.blog}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.creator}
          </a>
          . The source code is available on{' '}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
