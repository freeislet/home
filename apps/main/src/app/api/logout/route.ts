import { logout } from '@/auth/actions'
import type { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  // NOTE: form action 함수는 현재 react canary에서만 동작함

  await logout()

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login', // redirect to login page
    },
  })
}
