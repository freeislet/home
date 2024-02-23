'use client'

import { RefObject, forwardRef } from 'react'

import { useScrollToTarget } from '@/hooks/element'
import { cn } from '@/lib/utils'

interface ScrollTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  targetRef: RefObject<HTMLElement>
  children?: React.ReactNode
}

export function ScrollTrigger({ targetRef, children, ...props }: ScrollTriggerProps) {
  const scrollTo = useScrollToTarget(targetRef)

  return (
    <button onClick={scrollTo} {...props}>
      {children}
    </button>
  )
}

interface ScrollTargetProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const ScrollTarget = forwardRef<HTMLDivElement, ScrollTargetProps>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('scroll-mt-header-height', className)} {...props}>
      {children}
    </div>
  )
})
ScrollTarget.displayName = 'ScrollTarget'
