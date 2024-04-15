import { cookies } from 'next/headers'
import { generateState, GitHub, GitHubTokens } from 'arctic'
import { generateId } from 'lucia'

import { createSession } from '@/auth/lucia'
import { authOauthAccountRepository } from '@/repository/auth_oauth_account'
import { authUserRepository } from '@/repository/auth_user'
import { filterDiff, isEmpty } from '@/lib/utils'

const state = generateState()
export const githubState = state

const STATE_KEY = 'github_oauth_state'

export function storeState(
  maxAge = 60 * 60 // 60 min
) {
  cookies().set(STATE_KEY, state, {
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    maxAge,
  })
}

export function getStoredState() {
  const storedState = cookies().get(STATE_KEY)?.value
  return storedState
}

class GitHubAuth {
  github: GitHub
  tokens: GitHubTokens | null

  constructor() {
    const clientId = process.env.GITHUB_CLIENT_ID ?? ''
    const clientSecret = process.env.GITHUB_CLIENT_SECRET ?? ''
    this.github = new GitHub(clientId, clientSecret)
    this.tokens = null
  }

  // Authorize

  async createAuthorizationUrl(): Promise<URL> {
    return await this.github.createAuthorizationURL(state, {
      scopes: ['user:email'], // fetches non-public emails as well
    })
  }

  // Validate

  async validateAuthorizationCode(code: string): Promise<GitHubTokens> {
    this.tokens = await this.github.validateAuthorizationCode(code)
    return this.tokens
  }

  // Authenticated User

  async getUser() {
    if (!this.tokens) return

    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${this.tokens.accessToken}`,
      },
    })
    const user = await response.json()
    return user
    /* response 예
{
  "login": "octocat",
  "id": 1,
  "node_id": "MDQ6VXNlcjE=",
  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  "gravatar_id": "",
  "url": "https://api.github.com/users/octocat",
  "html_url": "https://github.com/octocat",
  "followers_url": "https://api.github.com/users/octocat/followers",
  "following_url": "https://api.github.com/users/octocat/following{/other_user}",
  "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
  "organizations_url": "https://api.github.com/users/octocat/orgs",
  "repos_url": "https://api.github.com/users/octocat/repos",
  "events_url": "https://api.github.com/users/octocat/events{/privacy}",
  "received_events_url": "https://api.github.com/users/octocat/received_events",
  "type": "User",
  "site_admin": false,
  "name": "monalisa octocat",
  "company": "GitHub",
  "blog": "https://github.com/blog",
  "location": "San Francisco",
  "email": "octocat@github.com",
  "hireable": false,
  "bio": "There once was...",
  "twitter_username": "monatheoctocat",
  "public_repos": 2,
  "public_gists": 1,
  "followers": 20,
  "following": 0,
  "created_at": "2008-01-14T04:33:35Z",
  "updated_at": "2008-01-14T04:33:35Z",
  "private_gists": 81,
  "total_private_repos": 100,
  "owned_private_repos": 100,
  "disk_usage": 10000,
  "collaborators": 8,
  "two_factor_authentication": true,
  "plan": {
    "name": "Medium",
    "space": 400,
    "private_repos": 20,
    "collaborators": 0
  }
}
    */
  }

  async getUserEmails() {
    if (!this.tokens) return

    const response = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${this.tokens.accessToken}`,
      },
    })
    const emails = await response.json()
    return emails
    /* response 예
[
  {
    "email": "octocat@github.com",
    "verified": true,
    "primary": true,
    "visibility": "public"
  }
]
    */
  }

  // Utils

  async handleAuthorization(code: string) {
    await this.validateAuthorizationCode(code)
    const githubUser = await this.getUser()
    const userAttributes: DatabaseUserAttributes = {
      username: githubUser.login,
      email: githubUser.email,
      avatar_url: githubUser.avatar_url,
    }

    const existingAccount = await authOauthAccountRepository.findByProviderUserId('github', githubUser.id)
    if (existingAccount) {
      const existingUser = await authUserRepository.findById(existingAccount.user_id)
      if (existingUser) {
        // user 정보 변동사항 있으면 DB 업데이트
        // TODO: lucia v3 업데이트 후 테스트 안 해봄
        const { id, ...existingUserAttributes } = existingUser
        const updatedUserAttributes = filterDiff(userAttributes, existingUserAttributes)
        if (!isEmpty(updatedUserAttributes)) {
          await authUserRepository.update(existingUser.id, updatedUserAttributes)
        }

        await createSession(existingAccount.user_id)
        return
      }
    }

    const userId = generateId(32)
    await authOauthAccountRepository.createUser('github', githubUser.id, userId, userAttributes)
    await createSession(userId)
  }
}

export { GitHubAuth }
export const githubAuth = new GitHubAuth()
