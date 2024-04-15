import { Metadata } from 'next'
import { redirect } from 'next/navigation'
// import Link from 'next/link'

import { getSessionUser } from '@/auth/lucia'
import { Logo } from '@/components/icons'
import { LoginForm } from '../_components/login-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default async function LoginPage() {
  const user = await getSessionUser()
  if (user) redirect('/')

  return (
    <div className="my-container my-flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Logo className="size-8 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          {/* <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p> */}
        </div>
        <LoginForm />
        {/* <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  )
}
