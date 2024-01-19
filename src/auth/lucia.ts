import { cache } from 'react'
import * as context from 'next/headers'
import { lucia } from 'lucia'
import { nextjs_future } from 'lucia/middleware'
import { github } from '@lucia-auth/oauth/providers'
import { planetscale } from '@lucia-auth/adapter-mysql'
import { connect } from '@planetscale/database'

import { dbConfig } from '../db/kysely'
import { getUserAttributes } from './utils'

export const auth = lucia({
  adapter: planetscale(connect(dbConfig), {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  middleware: nextjs_future(),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  sessionCookie: {
    expires: false,
  },
  getUserAttributes,
})

export type Auth = typeof auth

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
  scope: undefined,
})

export const getPageSession = cache(async () => {
  const authRequest = auth.handleRequest('GET', context)
  return await authRequest.validate()
})
