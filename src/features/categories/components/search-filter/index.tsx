import { useSuspenseQuery } from '@tanstack/react-query'

import { getCategoriesQueryOptions } from '@/features/categories/api/get-categories'
import { Categories } from '@/features/categories/components/search-filter/categories'
import { SearchInput } from '@/features/categories/components/search-filter/search-input'

export const SearchFilter = () => {
  const { data } = useSuspenseQuery(getCategoriesQueryOptions())

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  )
}
