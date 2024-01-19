import { UserAttributes, UserDbAttributes } from './types'

export function getUserAttributes(user: UserDbAttributes): UserAttributes {
  return {
    username: user.username,
    email: user.email,
    avatarUrl: user.avatar_url,
  }
}

export function getUserDbAttributes(user: UserAttributes): UserDbAttributes {
  return {
    username: user.username,
    email: user.email,
    avatar_url: user.avatarUrl,
  }
}
