import { MutableRefObject, RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useResizeObserver from '@react-hook/resize-observer'

// useElementSize: https://dev.to/murashow/how-to-use-resize-observer-with-react-5ff5 참고
export interface Size {
  width: number
  height: number
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(
  round = false
): [MutableRefObject<T | null>, Size] {
  const target = useRef<T | null>(null)
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  })

  const setSizeInternal = ({ width, height }: Size) => {
    setSize(round ? { width: Math.round(width), height: Math.round(height) } : { width, height })
  }

  useLayoutEffect(() => {
    target.current && setSizeInternal(target.current.getBoundingClientRect())
  }, [target])

  useResizeObserver(target, (entry) => {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0]
    setSizeInternal({ width, height })
  })

  return [target, size]
}

export function useScrollToTarget<T extends HTMLElement = HTMLElement>(targetRef: RefObject<T>): () => void {
  const scrollTo = useCallback(() => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
  }, [targetRef]) // TODO: ref deps 정리

  return scrollTo
}

export function useScrollToTarget2<T extends HTMLElement = HTMLElement>(): [MutableRefObject<T | null>, () => void] {
  const targetRef = useRef<T | null>(null)
  const scrollTo = useScrollToTarget(targetRef)

  return [targetRef, scrollTo]
}

export function useAtBottom(offset = 0) {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtBottom(window.innerHeight + window.scrollY >= document.body.offsetHeight - offset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [offset])

  return isAtBottom
}
