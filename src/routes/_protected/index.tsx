import { createFileRoute, redirect } from '@tanstack/react-router'

import { useAuth } from '@/components/layouts/auth-provider'
import { getCategoriesQueryOptions } from '@/features/categories/api/get-categories'

export const Route = createFileRoute('/_protected/')({
  beforeLoad: ({ context, location }) => {
    console.log('Home beforeLoad', context)
    if (!context.accessToken) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  loader: ({ context: { queryClient } }) => {
    console.log('Home loader')
    return queryClient.ensureQueryData({ ...getCategoriesQueryOptions() })
  },
  component: Home,
})

function Home() {
  const { user } = useAuth()

  return (
    <div className="w-full">
      <div>{JSON.stringify(user)}</div>
    </div>
  )
}
