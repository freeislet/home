import { SpinnerIcon } from './icons'
import { cn } from '@/lib/utils'

type LoadingSpinnerProps = React.ComponentProps<'svg'>

export default function LoadingSpinner({ className, ...props }: LoadingSpinnerProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <SpinnerIcon className={cn(' left-1/2 top-1/2 size-24', className)} {...props} />
    </div>
  )
}
