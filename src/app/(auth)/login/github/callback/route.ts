import { cookies, headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { LuciaError } from 'lucia'
import { OAuthRequestError } from '@lucia-auth/oauth'

import { auth, githubAuth } from '@/auth/lucia'
import { UserDbAttributes } from '@/auth/types'
import { getUserDbAttributes } from '@/auth/utils'
import { filterDiff, isEmpty } from '@/lib/utils'

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get('github_oauth_state')?.value
  const url = new URL(request.url)
  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')

  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const { githubUser, getExistingUser, createUser } = await githubAuth.validateCallback(code)

    const userDbAttributes: UserDbAttributes = {
      username: githubUser.login,
      email: githubUser.email,
      avatar_url: githubUser.avatar_url,
    }

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) {
        const existingUserDbAttributes = getUserDbAttributes(existingUser)
        const updatedDbAttributes = filterDiff(userDbAttributes, existingUserDbAttributes)
        if (isEmpty(updatedDbAttributes)) return existingUser

        try {
          const updatedUser = await auth.updateUserAttributes(existingUser.userId, updatedDbAttributes)
          return updatedUser
        } catch (e) {
          if (e instanceof LuciaError && e.message === `AUTH_INVALID_USER_ID`) {
            // invalid user id
          }
          // provided user attributes violates database rules (e.g. unique constraint)
          // or unexpected database errors
          throw e
        }
      }

      auth.createUser
      const user = await createUser({
        attributes: userDbAttributes,
      })
      return user
    }

    const user = await getUser()
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    })
    authRequest.setSession(session)

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/', // redirect to profile page
      },
    })
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }

    return new Response(null, {
      status: 500,
    })
  }
}
