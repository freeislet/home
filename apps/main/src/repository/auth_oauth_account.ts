import { Selectable, Insertable, Updateable } from 'kysely'

import { db } from '@/db/kysely'
import { AuthOauthAccount } from '@/db/schema'
import { DatabaseUser } from 'lucia'

export class AuthOauthAccountRepository {
  readonly TABLE_NAME = 'auth_oauth_account'

  async all(): Promise<AuthOauthAccount[]> {
    return await db.selectFrom('auth_oauth_account').selectAll().execute()
  }

  async findByProviderUserId(provider_id: string, provider_user_id: string): Promise<AuthOauthAccount | undefined> {
    return await db
      .selectFrom('auth_oauth_account')
      .where('provider_id', '=', provider_id)
      .where('provider_user_id', '=', provider_user_id)
      .selectAll()
      .executeTakeFirst()
  }

  // async save(values: Insertable<AuthOauthAccount>, valuesOnConflict?: Updateable<AuthOauthAccount>) {
  //   const ret = await db
  //     .insertInto('auth_oauth_account')
  //     .values(values)
  //     .onDuplicateKeyUpdate(valuesOnConflict ?? values)
  //     .executeTakeFirst()
  //   return ret
  // }

  async createUser(providerId: string, providerUserId: string, userId: string, userAttributes: DatabaseUserAttributes) {
    const ret = await db.transaction().execute(async (trx) => {
      const r1 = await trx
        .insertInto('auth_oauth_account')
        .values({ provider_id: providerId, provider_user_id: providerUserId, user_id: userId })
        .onDuplicateKeyUpdate({ user_id: userId })
        // returningAll ?
        .executeTakeFirst()

      const r2 = await trx
        .insertInto('auth_user')
        .values({ id: userId, ...userAttributes })
        .onDuplicateKeyUpdate(userAttributes)
        .executeTakeFirst()

      return r2
    })
    return ret
  }
}

export const authOauthAccountRepository = new AuthOauthAccountRepository()
export type { AuthOauthAccount }
