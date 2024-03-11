import { db } from '@/db/kysely'
import { Products } from '@/db/schema'

export class ProductsRepository {
  async all() {
    return await db.selectFrom('products').selectAll().execute()
  }

  async findById(id: number) {
    return await db.selectFrom('products').where('id', '=', id).selectAll().executeTakeFirst()
  }
}

export const productsRepository = new ProductsRepository()
