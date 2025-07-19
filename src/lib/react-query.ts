import type { DefaultOptions, UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: 0,
    staleTime: 60000000,
  },
} satisfies DefaultOptions

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>

type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<
  ReturnType<FnType>
>

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>
