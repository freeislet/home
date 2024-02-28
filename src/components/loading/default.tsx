import { Skeleton } from '@/components/ui/skeleton'

export default function DefaultLoading() {
  return (
    <div className="h-full w-full p-4 flex flex-col space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-[400px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 max-w-96" />
        <Skeleton className="h-4 max-w-96" />
        <Skeleton className="h-4 max-w-80" />
      </div>
    </div>
  )
}
