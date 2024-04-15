import type { NextRequest } from 'next/server'

import { storeState, githubAuth } from '@/auth/oauth/github'

export const GET = async (request: NextRequest) => {
  storeState()

  const authorizationUrl = await githubAuth.createAuthorizationUrl()
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizationUrl.toString(),
    },
  })
}
