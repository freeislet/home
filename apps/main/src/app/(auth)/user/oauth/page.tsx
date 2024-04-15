import { redirect } from 'next/navigation'

import { getSessionUser } from '@/auth/lucia'

export default async function OauthPage() {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  return (
    <div className="my-container">
      <span>TBD</span>
    </div>
  )
}
