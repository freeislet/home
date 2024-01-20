import { notFound } from 'next/navigation'

import { getPageSession } from '@/auth/lucia'

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await getPageSession()
  if (!session) return notFound()

  return (
    <div className="flex-1 flex">
      <aside className="flex-none hidden sm:flex flex-col space-y-2 bg-secondary border-r">sidebar</aside>
      {children}
    </div>
  )
}
