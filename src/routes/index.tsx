import { createFileRoute } from '@tanstack/react-router'

import { SearchFilter } from '@/features/categories/components/search-filter'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <SearchFilter />
}
