// type DatabaseUserAttributes = Omit<AuthUser, 'id'>
// NOTE: Omit 사용하면 spread 등에서 엄격한 타입 체크가 안 되어서 interface 직접 선언함
interface DatabaseUserAttributes {
  username: string
  email: string | null
  avatar_url: string | null
}

interface UserAttributes {
  username: string
  email: string | null
  avatarUrl: string | null
}

type DatabaseSessionAttributes = Omit<AuthUserSession, 'id' | 'expires_at' | 'user_id'>
