// Here is an example storing a next-auth session in context.
// This 'session' will therefore be available in any tRPC procedure.

import { getSessionUser } from '@/auth/lucia'

export async function createContext() {
  const user = await getSessionUser()

  return {
    user,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
