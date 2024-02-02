// defines a tRPC instance that works for your client-side components.

import { createTRPCReact } from '@trpc/react-query'

import { type AppRouter } from '../server'

export const trpc = createTRPCReact<AppRouter>()
