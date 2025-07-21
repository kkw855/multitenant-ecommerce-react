import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { Array, Option } from 'effect'

import { getCategoriesQueryOptions } from '@/features/categories/api/get-categories'
import { BreadcrumbsNavigation } from '@/features/categories/components/search-filter/breadcrumbs-navigation'
import { Categories } from '@/features/categories/components/search-filter/categories'
import { SearchInput } from '@/features/categories/components/search-filter/search-input'
import { DEFAULT_BG_COLOR } from '@/types/constants'
import { BreadcrumbsNavigation2 } from '@/features/categories/components/search-filter/breadcrumbs-navigation2'

export const SearchFilter = () => {
  const { data } = useSuspenseQuery(getCategoriesQueryOptions())

  const params = useParams({ strict: false })

  const activeCategory = Option.fromNullable(params?.category).pipe(
    Option.flatMap((category) =>
      Array.findFirst(data, (cat) => cat.slug === category),
    ),
    Option.map((category) => ({
      name: category.name,
      slug: category.slug,
      color: category.color,
      subcategories: category.subcategories,
    })),
    Option.getOrElse(() => ({
      name: null,
      slug: null,
      color: DEFAULT_BG_COLOR,
      subcategories: [],
    })),
  )

  const activeSubcategoryName = Option.fromNullable(params?.subcategory).pipe(
    Option.flatMap((subcategory) =>
      Array.findFirst(
        activeCategory.subcategories,
        (sub) => sub.slug === subcategory,
      ),
    ),
    Option.map((subcategory) => subcategory.name),
    Option.getOrNull,
  )

  console.log('SearchFilter', params)

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full bg-[#F5F5F5]"
      style={{ backgroundColor: activeCategory.color }}
    >
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbsNavigation
        activeCategorySlug={activeCategory.slug}
        activeCategoryName={activeCategory.name}
        activeSubcategoryName={activeSubcategoryName}
      />
      <BreadcrumbsNavigation2
        activeCategorySlug={activeCategory.slug}
        activeCategoryName={activeCategory.name}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  )
}
