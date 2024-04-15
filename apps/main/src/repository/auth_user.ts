import { Selectable, Insertable, Updateable } from 'kysely'

import { db } from '@/db/kysely'
import { AuthUser } from '@/db/schema'

export class AuthUserRepository {
  readonly TABLE_NAME = 'auth_user'

  async all(): Promise<AuthUser[]> {
    return await db.selectFrom('auth_user').selectAll().execute()
  }

  async findById(id: string): Promise<AuthUser | undefined> {
    return await db.selectFrom('auth_user').where('id', '=', id).selectAll().executeTakeFirst()
  }

  // async save(values: Insertable<AuthUser>, valuesOnConflict?: Updateable<AuthUser>) {
  //   const ret = await db
  //     .insertInto('auth_user')
  //     .values(values)
  //     .onDuplicateKeyUpdate(valuesOnConflict ?? values)
  //     .executeTakeFirst()
  //   return ret
  // }
}

export const authUserRepository = new AuthUserRepository()
export type { AuthUser }
