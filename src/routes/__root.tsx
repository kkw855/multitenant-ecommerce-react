import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <div className="p-4">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
