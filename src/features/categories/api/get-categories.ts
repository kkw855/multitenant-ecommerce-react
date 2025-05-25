import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api-client'

import type { QueryConfig } from '@/lib/react-query'
import type { Category } from '@/types/api'

export const getCategories = async () => {
  const res = await api.get<Category[]>('/categories')

  return res.data
}

const getCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}

type UseCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>
}

export const useCategories = ({ queryConfig }: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...queryConfig,
  })
}
