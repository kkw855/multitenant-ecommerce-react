import { createFileRoute, redirect } from '@tanstack/react-router'

import { useAuth } from '@/features/auth/auth-provider'
import { getCategoriesQueryOptions } from '@/features/categories/api/get-categories'
import { SearchFilter } from '@/features/categories/components/search-filter'

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
    <div>
      <SearchFilter />
      <div>{JSON.stringify(user)}</div>
    </div>
  )
}
