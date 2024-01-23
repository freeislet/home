// Here is an example storing a next-auth session in context.
// This 'session' will therefore be available in any tRPC procedure.

import { getPageSession } from '@/auth/lucia'

export async function createContext() {
  const session = await getPageSession()

  return {
    session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
