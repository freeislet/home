// defines a tRPC instance that works for your client-side components.

import { type AppRouter } from '@/server'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>({})
