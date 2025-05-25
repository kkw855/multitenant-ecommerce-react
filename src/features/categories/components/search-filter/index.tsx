import { useCategories } from '@/features/categories/api/get-categories'
import { Categories } from '@/features/categories/components/search-filter/categories'
import { SearchInput } from '@/features/categories/components/search-filter/search-input'

export const SearchFilter = () => {
  const categoriesQuery = useCategories()

  // TODO: Loading and Error
  if (categoriesQuery.isPending) return 'Loading...'
  if (categoriesQuery.isError) return 'Error!'

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <Categories data={categoriesQuery.data} />
    </div>
  )
}
