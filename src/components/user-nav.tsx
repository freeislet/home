import Link from 'next/link'

import { User } from '@/auth/types'
import { UserAvatar } from '@/components/user-avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Form from './form'

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User
}

export function UserNav({ user, ...props }: UserNavProps) {
  if (!user)
    return (
      <div {...props}>
        <Link
          href="/login"
          className="text-sm underline-offset-4 hover:underline px-2"
        >
          log in
        </Link>
      </div>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar user={user} {...props} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.username}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Theme</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Form action="/api/logout">
            <input type="submit" value="Sign out" />
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
