import 'server-only'

import { Kysely, MysqlDialect } from 'kysely'
// import { TiDBServerlessDialect } from '@tidbcloud/kysely'
// NOTE: pool 사용 위해 TiDBServerlessDialect 대신  MysqlDialect 사용
// - Lucia > Kysely Database [https://lucia-auth.com/database/kysely] MySQL 참고

import { getPool } from './db'
import type { DB } from './schema'

export const db = new Kysely<DB>({
  dialect: new MysqlDialect({
    pool: getPool().pool, // IMPORTANT NOT TO JUST PASS `pool`
  }),
})
