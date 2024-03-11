'use client'

import { lazy } from 'react'
import dynamic, { type LoaderComponent } from 'next/dynamic'

/**
 * 컴포넌트 비동기 import
 * @param specifier 모듈 path
 * @param loading 로딩 컴포넌트 모듈명
 * @returns
 */
export function load<P>(importer: LoaderComponent<P>, loading = 'default'): React.ComponentType<P> {
  const Loading = lazy(() => import(`./${loading}`)) // NOTE: synchronous dynamic import 위해 lazy 사용

  return dynamic<P>(() => importer, { ssr: false, loading: () => <Loading /> })
}
