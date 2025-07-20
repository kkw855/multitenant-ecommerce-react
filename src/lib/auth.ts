/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Schema as S } from 'effect'

import { api } from '@/lib/api-client'
import { emailRegex } from '@/utils/regex'

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

export const login = ({ data }: { data: Login }) => {
  const response = api.post<{ accessToken: string }>(`/auth/login`, data)
  console.log('login response', response)
  return response
}

export const SignUpSchema = S.Struct({
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
  email: S.String.pipe(
    S.pattern(emailRegex, {
      message: () => 'Invalid email',
    }),
  ),
  password: S.String.pipe(
    S.minLength(3, { message: () => 'Password must be at least 3 characters' }),
  ),
})

// using the interface keyword may improve readability and performance in some cases
export interface SignUp extends S.Schema.Type<typeof SignUpSchema> {}

export const register = async ({ data }: { data: SignUp }) => {
  const response = await api.post<{ accessToken: string }>(`/auth/users`, data)
  console.log('signUp response', JSON.stringify(response))
  return response
}
