import { procedure, router } from './trpc'
// import { geminiRouter } from './routers/gemini'
import { productsRepository } from '@/repository/products'

export const appRouter = router({
  healthcheck: procedure.query(() => 'yay!'),
  getSession: procedure.query(async ({ ctx }) => {
    return ctx.session // lucia.Session | null
  }),

  // routers
  // gemini: geminiRouter,

  // 테스트 router TODO: 제거
  products: procedure
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
