import type { DefaultOptions, UseMutationOptions } from '@tanstack/react-query'

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: 0,
    staleTime: 0,
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
  Error,
  Parameters<MutationFnType>[0]
>
