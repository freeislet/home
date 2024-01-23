// define a tRPC instance that works for your server-side components.

import { appRouter } from '@/server'
import { createCallerFactory } from '@/server/trpc'
import { createContext } from '@/server/context'

const createCaller = createCallerFactory(appRouter)

// export const serverClient = createCaller(await createContext())
