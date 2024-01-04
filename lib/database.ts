import { Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import { DB } from 'kysely-codegen'
 
export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
})

export type {
  Categories,
  Products,
} from 'kysely-codegen'
