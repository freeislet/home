import { redirect } from 'next/navigation'

import { getRedirectUrl } from '@/config/docs/nav'

export default function RedirectPage({ params }: { params: { slug: string[] } }) {
  const href = '/' + params.slug?.join('/')
  const redirectUrl = getRedirectUrl(href)
  redirect(redirectUrl ?? '/')
}
