'use client'

// Next Themes
import { ThemeProvider } from 'next-themes'

// tRPC
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'

// import { url } from '@/config'
import { trpc } from '@/trpc/client'

const url = process.env.NODE_ENV === 'production' ? 'https://freeislet.vercel.com' : 'http://localhost:3000'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${url}/trpc`,
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
