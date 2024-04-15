import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { lucia, validateSessionCached } from './lucia'

// NOTE: form action 함수는 현재 react canary에서만 동작함

interface ActionResult {
  error: string | null
}

export async function logout(): Promise<ActionResult> {
  'use server'

  const { session } = await validateSessionCached()
  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/login')
}
