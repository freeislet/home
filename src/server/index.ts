import { publicProcedure, router } from './trpc'

import { z } from 'zod'
import { productsRepository } from '@/repository/products'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  getSession: publicProcedure.query(async ({ ctx }) => {
    return ctx.session // lucia.Session | null
  }),

  // routers
  //...
  products: publicProcedure
    // .input(
    //   z.object({
    //     category_id: z.number().nullish(),
    //     id: z.number(),
    //     image_url: z.string().nullish(),
    //     name: z.string(),
    //   })
    // )
    .query(async () => {
      const products = await productsRepository.all()
      return products
    }),
})

export type AppRouter = typeof appRouter
