// https://css-tricks.com/using-requestanimationframe-with-react-hooks/ 참고

import { useRef, useEffect, DependencyList } from 'react'

export interface AnimationFrameCallback {
  (time: number, deltaTime: number): void | boolean
}

export function useAnimationFrame(callback: AnimationFrameCallback, deps?: DependencyList) {
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<DOMHighResTimeStamp>()

  const animate = (time: DOMHighResTimeStamp) => {
    const deltaTime = previousTimeRef.current != undefined ? time - previousTimeRef.current : 0
    if (callback(time, deltaTime) === false) return

    previousTimeRef.current = time
    requestRef.current = window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(requestRef.current!)
  }, deps ?? [])

  // TODO: start, stop callback 추가
}
