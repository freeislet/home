import { db, Products } from '@/lib/database'

export class ProductsRepository {
  async all() {
    return await db.selectFrom('products')
      .selectAll()
      .execute()
  }

  async findById(id: number) {
    return await db.selectFrom('products')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }
}

export const productsRepository = new ProductsRepository()
