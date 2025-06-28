import { createFileRoute } from '@tanstack/react-router'

import { getCategoriesQueryOptions } from '@/features/categories/api/get-categories'
import { SearchFilter } from '@/features/categories/components/search-filter'

export const Route = createFileRoute('/')({
  component: Home,
  loader: ({ context: { queryClient } }) => {
    console.log('Home loader')
    return queryClient.ensureQueryData({ ...getCategoriesQueryOptions() })
  },
})

function Home() {
  return <SearchFilter />
}
