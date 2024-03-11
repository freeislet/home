/*
import { z } from 'zod'

import { publicProcedure, router } from './trpc'
import { productsRepository } from '@/repository/products'

const appRouter = router({
  products: publicProcedure.input(z.string()).query(async () => {
    const products = await productsRepository.all()
    return products
  }),
  // userCreate: publicProcedure.input(z.object({ name: z.string() })).mutation(async (opts) => {
  //   const { input } = opts
  //   // Create a new user in the database
  //   const user = await db.user.create(input)
  //   return user
  // }),
})
*/
