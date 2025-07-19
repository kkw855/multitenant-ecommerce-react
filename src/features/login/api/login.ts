/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useMutation } from '@tanstack/react-query'
import { Schema as S } from 'effect'

import { api } from '@/lib/api-client'

import type { MutationConfig } from '@/lib/react-query'

export const LoginSchema = S.Struct({
  username: S.String.pipe(
    S.minLength(3, { message: () => 'Username must be at least 3 characters' }),
    S.maxLength(63, {
      message: () => 'Username must be less than 63 characters',
    }),
    S.pattern(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, {
      message: () =>
        'Username can only contain lowercase letters, numbers and hyphens. It must start and end with a letter or number',
    }),
    S.filter((val) => !val.includes('--'), {
      message: () => 'Username cannot contain consecutive hyphens',
    }),
  ),
  password: S.String,
})

// using the interface keyword may improve readability and performance in some cases
export interface Login extends S.Schema.Type<typeof LoginSchema> {}

const login = ({ data }: { data: Login }) => {
  const response = api.post(`/auth/login`, data)
  console.log('login response', response)
  return response
}

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>
}

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  // const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      // queryClient.invalidateQueries({
      //   queryKey: getDiscussionsQueryOptions().queryKey,
      // })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: login,
  })
}
