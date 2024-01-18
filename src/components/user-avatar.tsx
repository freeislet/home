import { type AvatarProps } from '@radix-ui/react-avatar'

import { User } from '@/auth/auth'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps extends AvatarProps {
  user: User
}

export function UserAvatar({ user, className, ...props }: UserAvatarProps) {
  const initials = user.username
    ?.split(' ')
    .map((chunk) => chunk.charAt(0).toLocaleUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <Avatar className={cn('size-8', className)} {...props}>
      <AvatarImage src="" />
      <AvatarFallback className="text-sm">{initials}</AvatarFallback>
    </Avatar>
  )
}
