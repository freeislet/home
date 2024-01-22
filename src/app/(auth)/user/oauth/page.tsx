import { redirect } from 'next/navigation'

import { getPageSession } from '@/auth/lucia'

export default async function OauthPage() {
  const session = await getPageSession()
  if (!session) redirect('/login')

  return (
    <div className="my-container">
      <span>TBD</span>
    </div>
  )
}
