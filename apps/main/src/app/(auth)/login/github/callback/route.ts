import type { NextRequest } from 'next/server'
import { OAuth2RequestError } from 'arctic'

import { getStoredState, githubAuth } from '@/auth/oauth/github'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = getStoredState()

  // validate state
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    await githubAuth.handleAuthorization(code)

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      // bad verification code, invalid credentials, etc
      // const { message, description, request } = e
      return new Response(null, {
        status: 400,
      })
    }

    return new Response(null, {
      status: 500,
    })
  }
}
