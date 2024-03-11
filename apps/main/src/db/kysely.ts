import 'server-only'

import { Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import type { DB } from './schema'

export const dbConfig = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect(dbConfig),
})
