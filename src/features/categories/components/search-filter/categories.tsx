import { CategoryDropdown } from '@/features/categories/components/search-filter/category-dropdown'

import type { Category } from '@/types/api'

export const Categories = ({ data }: { data: Category[] }) => {
  return (
    <div className="flex">
      {data.map((category) => (
        <CategoryDropdown
          key={category.id}
          category={category}
          isActive={false}
          isNavigationHovered={false}
        />
      ))}
    </div>
  )
}
