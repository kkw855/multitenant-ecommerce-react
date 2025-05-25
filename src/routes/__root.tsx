import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useState } from 'react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { queryConfig } from '@/lib/react-query'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-[#F4F4F0]">
          <Outlet />
        </div>
        <Footer />
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    </QueryClientProvider>
  )
}
