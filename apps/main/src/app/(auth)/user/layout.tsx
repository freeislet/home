import { redirect } from 'next/navigation'

import { getSessionUser } from '@/auth/lucia'
import NavLink from '@/components/nav-link'

const nav = [
  ['/user/profile', 'Profile'],
  ['/user/oauth', 'OAuth 관리'],
]

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()
  if (!user) redirect('/login')

  return (
    <div className="my-container flex-1 grid grid-cols-[10rem_1fr] gap-12 my-6">
      <aside className="my-flex-col space-y-2">
        <nav className="grid items-start gap-2">
          {nav.map(([url, title], index) => (
            <NavLink
              key={index}
              href={url}
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              activeClassName="bg-accent"
            >
              {title}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
