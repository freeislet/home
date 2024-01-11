/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./lucia.js').Auth
  type DatabaseUserAttributes = Omit<AuthUser, 'id'>
  type DatabaseSessionAttributes = Omit<
    UserSession,
    'id' | 'active_expires' | 'idle_expires' | 'user_id'
  >
}
