export interface UserAttributes {
  username: string
  email: string | null
  avatarUrl: string | null
}

export interface User extends UserAttributes {
  userId: string
}

export type UserDbAttributes = Omit<AuthUser, 'id'>
