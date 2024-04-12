export interface AuthOauthAccount {
  provider_id: string;
  provider_user_id: string;
  user_id: string;
}

export interface AuthUser {
  avatar_url: string | null;
  email: string | null;
  id: string;
  username: string;
}

export interface AuthUserSession {
  expires_at: Date;
  id: string;
  user_id: string;
}

export interface DB {
  auth_oauth_account: AuthOauthAccount;
  auth_user: AuthUser;
  auth_user_session: AuthUserSession;
}
