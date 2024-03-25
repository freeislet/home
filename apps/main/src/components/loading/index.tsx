import { lazy } from 'react'
import dynamic, { Loader } from 'next/dynamic'

/**
 * 컴포넌트 비동기 import
 * @param loader import 함수 (예: () => import(모듈 path))
 * @param loading 로딩 컴포넌트 모듈명
 * @returns
 */
export function load<P>(loader: Loader<P>, loading = 'default'): React.ComponentType<P> {
  const Loading = lazy(() => import(`./${loading}`)) // NOTE: synchronous dynamic import 위해 lazy 사용

  return dynamic<P>(loader, { ssr: false, loading: () => <Loading /> })
}
