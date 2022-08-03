import { Skeleton } from 'antd'
import type { LazyExoticComponent } from 'react'
import { Suspense } from 'react'

export const buildRouteSuspense = (LazyRoute: LazyExoticComponent<any>) => {
  return (
    <Suspense fallback={<Skeleton />}>
      <LazyRoute />
    </Suspense>
  )
}
