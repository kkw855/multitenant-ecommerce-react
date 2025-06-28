import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { NotFound } from '@/components/layout/not-found'

import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Root,
  notFoundComponent: NotFound,
})

function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0] flex">
        <Outlet />
      </div>
      <Footer />

      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}
