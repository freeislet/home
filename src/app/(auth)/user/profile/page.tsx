import { redirect } from 'next/navigation'

import { getPageSession } from '@/auth/lucia'
import { Button } from '@/components/ui/button'
import Form from '@/components/form'

export default async function ProfilePage() {
  const session = await getPageSession()
  if (!session) redirect('/login')

  return (
    <div className="my-container">
      <h1>Profile</h1>
      {/* <p>User id: {session?.user.userId}</p> */}
      <p>Username: {session?.user.username}</p>
      <p>Email: {session?.user.email}</p>
      <Form action="/api/logout">
        <Button variant="outline-blue" size="sm" asChild>
          <input type="submit" value="Sign out" />
        </Button>
      </Form>
    </div>
  )
}
