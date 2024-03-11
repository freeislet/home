import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/trpc/server'
import { createContext } from '@/trpc/server/context'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/trpc',
    req,
    router: appRouter,
    // This line of code will create the context asynchronously whenever you call a tRPC endpoint.
    createContext: async () => await createContext(),
  })

export { handler as GET, handler as POST }
