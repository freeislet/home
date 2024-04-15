import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { Lucia, type User, type Session } from 'lucia'
import { Mysql2Adapter } from '@lucia-auth/adapter-mysql'

import { getPool } from '@/db/db'

const adapter = new Mysql2Adapter(getPool(), {
  user: 'auth_user',
  session: 'auth_user_session',
})

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes: DatabaseUserAttributes): UserAttributes => ({
    username: attributes.username,
    email: attributes.email,
    avatarUrl: attributes.avatar_url,
  }),
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
    DatabaseSessionAttributes: DatabaseSessionAttributes
  }
}

/**
 * Web Crypto API Polyfill (Node.js 20 미만인 경우 필요하다고 함)
 */

// import { webcrypto } from 'node:crypto'
// globalThis.crypto = webcrypto as Crypto

/**
 * Session
 */

export async function createSession(userId: string) {
  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

async function validateSession(): Promise<{ user: User; session: Session } | { user: null; session: null }> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) return { user: null, session: null }

  const result = await lucia.validateSession(sessionId)
  const { session } = result
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return result
}
export const validateSessionCached = cache(validateSession)

export async function getSessionUser(): Promise<User | null> {
  const { user } = await validateSessionCached()
  return user
}
export type { User }
