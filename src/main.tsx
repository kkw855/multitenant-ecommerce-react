import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'

import { AuthProvider, useAuth } from '@/components/layouts/auth-provider'
import { queryConfig } from '@/lib/react-query'
import { routeTree } from '@/routeTree.gen'

import '@/globals.css'

// TODO: 다국어

const queryClientInstance = new QueryClient({
  defaultOptions: queryConfig,
})

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClientInstance,
    accessToken: undefined,
  },
  defaultPreload: false,
  defaultStaleTime: queryConfig.queries.staleTime,
  // Since we're using React Query, we don't want loader calls to ever be stale.
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  // noinspection JSUnusedGlobalSymbols
  interface Register {
    router: typeof router
  }
}

const domNode = document.getElementById('root')
if (!domNode) throw new Error('No root element found')

const root = createRoot(domNode)

const App = () => {
  const { accessToken } = useAuth()
  return <RouterProvider router={router} context={{ accessToken }} />
}

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
