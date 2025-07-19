import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { NotFound } from '@/components/layout/not-found'

import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  accessToken: undefined | string
}>()({
  component: Root,
  notFoundComponent: NotFound,
})

function Root() {
  return (
    <>
      <Outlet />

      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
