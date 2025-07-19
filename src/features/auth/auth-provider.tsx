import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

import { api } from '@/lib/api-client'

import type { Login } from '@/features/login/api/login'
import type { SignUp } from '@/features/sign-up/api/sign-up'
import type { AxiosError } from 'axios'

export type User = {
  username: string
  email: string
  createdAt: number
  exp: number
  iat: number
}

export interface AuthContext {
  accessToken: undefined | string
  user: undefined | User
  signUp: ({ data }: { data: SignUp }) => Promise<{ accessToken: string }>
  login: ({ data }: { data: Login }) => Promise<{ accessToken: string }>
}

const AuthContext = createContext<AuthContext>({
  accessToken: undefined,
  user: undefined,
  signUp: () => new Promise(() => {}),
  login: () => new Promise(() => {}),
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] =
    useState<AuthContext['accessToken']>(undefined)
  const [user, setUser] = useState<AuthContext['user']>(undefined)

  const signUp = async ({ data }: { data: SignUp }) => {
    const response = await api.post<{ accessToken: string }>(
      `/auth/users`,
      data,
    )
    console.log('signUp response', response.data)
    const token = response.data.accessToken
    setAccessToken(token)
    const payload = token.substring(
      token.indexOf('.') + 1,
      token.lastIndexOf('.'),
    )
    const payloadObj = JSON.parse(atob(payload))
    setUser(payloadObj)
    // console.log('payload', payload, atob(payload), payloadObj)
    return response.data
  }

  const login = async ({ data }: { data: Login }) => {
    const response = await api.post<{ accessToken: string }>(
      `/auth/login`,
      data,
    )
    const token = response.data.accessToken
    setAccessToken(token)
    const payload = token.substring(
      token.indexOf('.') + 1,
      token.lastIndexOf('.'),
    )
    const payloadObj = JSON.parse(atob(payload))
    setUser(payloadObj)
    // console.log('payload', payload, atob(payload), payloadObj)
    return response.data
  }

  useEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      // console.log('Authorization', config.headers.Authorization)

      return config
    })

    return () => api.interceptors.request.eject(authInterceptor)
  }, [accessToken])

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        // console.log('api.interceptors.response Error', error)

        const originalRequest = error?.config

        // Check if the error is due to an unauthorized request
        if (originalRequest && error.response?.status === 403) {
          // error.request._retry = true // Prevent infinite loop
          try {
            // Attempt to refresh the access token
            const response = await api.get('/auth/refreshToken')
            console.log('newAccessToken', response.data.accessToken)
            const newAccessToken = response.data.accessToken

            // Update the original request's Authorization header

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            originalRequest._retry = true

            setAccessToken(response.data.accessToken) // Update your state with the new access token

            // Retry the original request with the new token
            return api(originalRequest)
          } catch (tokenRefreshError) {
            // Handle token refresh failure (e.g., logout the user)
            console.error('Token refresh failed', tokenRefreshError)
            setAccessToken(undefined)
          }
        }

        // Handle other errors
        return Promise.reject(error)
      },
    )

    return () => api.interceptors.response.eject(authInterceptor)
  }, [accessToken])

  console.log('AuthProvider token', accessToken)

  return (
    <AuthContext.Provider value={{ accessToken, user, signUp, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return authContext
}
