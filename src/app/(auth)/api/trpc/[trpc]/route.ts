import { appRouter } from '@/server'
import { createContext } from '@/server/context'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // This line of code will create the context asynchronously whenever you call a tRPC endpoint.
    createContext: async () => await createContext(),
  })

export { handler as GET, handler as POST }
