import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// import { Footer } from '@/routes/(home)/footer.tsx'
import { Navbar } from '@/routes/(home)/navbar.tsx'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0]">
        <Outlet />
      </div>
      {/*<Footer />*/}
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
