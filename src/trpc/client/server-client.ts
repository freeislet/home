// TBD
// define a tRPC instance that works for your server-side components.

import { appRouter } from '@/trpc/server'
import { createCallerFactory } from '@/trpc/server/trpc'
import { createContext } from '@/trpc/server/context'

const createCaller = createCallerFactory(appRouter)

// export const serverClient = createCaller(await createContext())
