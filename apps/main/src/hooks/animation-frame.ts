// https://css-tricks.com/using-requestanimationframe-with-react-hooks/ 참고
// TODO: https://react.dev/learn/reusing-logic-with-custom-hooks#there-is-more-than-one-way-to-do-it 참고해서 리팩토링

import { useRef, useEffect, DependencyList } from 'react'

export interface AnimationFrameCallback {
  (time: number, timeDelta: number): void | boolean
}

export function useAnimationFrame(callback: AnimationFrameCallback, deps?: DependencyList) {
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<DOMHighResTimeStamp>()

  const animate = (time: DOMHighResTimeStamp) => {
    const timeDelta = previousTimeRef.current != undefined ? time - previousTimeRef.current : 0
    if (callback(time, timeDelta) === false) return

    previousTimeRef.current = time
    requestRef.current = window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(requestRef.current!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ?? [])

  // TODO: start, stop callback 추가
}
