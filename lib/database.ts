import 'server-only'

import { Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import { DB } from './db-schema'
 
export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }),
})
