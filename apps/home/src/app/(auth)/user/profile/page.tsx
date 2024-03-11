import { redirect } from 'next/navigation'

import { getPageSession } from '@/auth/lucia'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Form from '@/components/form'

export default async function ProfilePage() {
  const session = await getPageSession()
  if (!session) redirect('/login')

  return (
    <div className="grid items-start gap-8">
      <div className="my-flex-row justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-bold text-3xl md:text-4xl">Profile</h1>
          <p className="text-lg text-muted-foreground">사용자 프로필 관리</p>
        </div>
      </div>
      <div className="grid gap-4">
        {/* TODO: profile-form.tsx 컴포넌트 분리 */}
        {/* <p>User id: {session?.user.userId}</p> */}
        <Card>
          <CardHeader>
            <CardTitle>Username</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>{session?.user.username}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>{session?.user.email}</p>
          </CardContent>
        </Card>
        <Form action="/api/logout">
          <Button variant="outline" size="sm" asChild>
            <input type="submit" value="Sign out" />
          </Button>
        </Form>
      </div>
    </div>
  )
}
