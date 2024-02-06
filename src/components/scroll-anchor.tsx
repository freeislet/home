'use client'

import { RefObject, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useAtBottom } from '@/hooks/element'

interface ScrollAnchorProps {
  trackVisibility?: boolean
  containerRef?: RefObject<HTMLElement>
  rootMargin?: string
}

export function ScrollAnchor({ trackVisibility, containerRef, rootMargin }: ScrollAnchorProps) {
  const isAtBottom = useAtBottom()
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    root: containerRef?.current,
    rootMargin,
  })

  useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
      })
    }
  }, [inView, entry, isAtBottom, trackVisibility, containerRef, rootMargin])

  return <div ref={ref} className="h-px w-full" />
}
