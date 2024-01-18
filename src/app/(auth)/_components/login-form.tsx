'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// import { useSearchParams } from 'next/navigation'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import * as z from 'zod'
// import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
// import { userAuthSchema } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { toast } from '@/components/ui/use-toast'
import { GitHubIcon, SpinnerIcon } from '@/components/icons'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// type FormData = z.infer<typeof userAuthSchema>

export function LoginForm({ className, ...props }: LoginFormProps) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   resolver: zodResolver(userAuthSchema),
  // })
  const [isLoading, setIsLoading] = useState(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  // const searchParams = useSearchParams()
  const router = useRouter()

  // async function onSubmit(data: FormData) {
  //   setIsLoading(true)

  //   const signInResult = await signIn('email', {
  //     email: data.email.toLowerCase(),
  //     redirect: false,
  //     callbackUrl: searchParams?.get('from') || '/dashboard',
  //   })

  //   setIsLoading(false)

  //   if (!signInResult?.ok) {
  //     return toast({
  //       title: 'Something went wrong.',
  //       description: 'Your sign in request failed. Please try again.',
  //       variant: 'destructive',
  //     })
  //   }

  //   return toast({
  //     title: 'Check your email',
  //     description: 'We sent you a login link. Be sure to check your spam too.',
  //   })
  // }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </button>
        </div>
      </form> */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {/*Or */}continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          setIsGitHubLoading(true)
          router.push('/login/github')
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <SpinnerIcon className="size-4 mr-2" />
        ) : (
          <GitHubIcon className="size-4 mr-2" />
        )}{' '}
        Github
      </Button>
    </div>
  )
}
