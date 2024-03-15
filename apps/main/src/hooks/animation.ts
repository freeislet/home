// https://css-tricks.com/using-requestanimationframe-with-react-hooks/ 참고

import { useRef, useEffect } from 'react'

export interface AnimationFrameCallback {
  (time: DOMHighResTimeStamp, deltaTime: DOMHighResTimeStamp): void
}

export function useAnimationFrame(callback: AnimationFrameCallback) {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<DOMHighResTimeStamp>()

  const animate = (time: DOMHighResTimeStamp) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(time, deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(requestRef.current!)
  }, [])
}
