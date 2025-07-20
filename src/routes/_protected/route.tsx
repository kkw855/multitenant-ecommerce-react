import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Footer } from '@/routes/_protected/(layout)/footer'
import { Navbar } from '@/routes/_protected/(layout)/navbar'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context, location }) => {
    console.log('_protected route.tsx beforeLoad', context)
    if (!context.accessToken) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0] flex">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
