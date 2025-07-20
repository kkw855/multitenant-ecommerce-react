import { Option } from 'effect'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'

import { api } from '@/lib/api-client'
import { login, type Login, register, type SignUp } from '@/lib/auth'

import type { AxiosError } from 'axios'

export type User = {
  username: string
  email: string
  createdAt: number
  exp: number
  iat: number
}

export interface AuthContext {
  accessToken: null | string
  user: null | User
  signUp: ({ data }: { data: SignUp }) => Promise<{ accessToken: string }>
  signIn: ({ data }: { data: Login }) => Promise<{ accessToken: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContext>({
  accessToken: null,
  user: null,
  signUp: () => new Promise(() => {}),
  signIn: () => new Promise(() => {}),
  logout: () => new Promise(() => {}),
})

const decodeAccessToken = (accessToken: string): User => {
  const payload = accessToken.substring(
    accessToken.indexOf('.') + 1,
    accessToken.lastIndexOf('.'),
  )
  return JSON.parse(atob(payload))
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<AuthContext['accessToken']>(
    () => localStorage.getItem('accessToken'),
  )
  const [user, setUser] = useState<AuthContext['user']>(() =>
    Option.fromNullable(accessToken).pipe(
      Option.map(decodeAccessToken),
      Option.getOrNull,
    ),
  )

  const setAuth = useCallback((accessToken: string) => {
    const user = decodeAccessToken(accessToken)

    setAccessToken(accessToken)
    setUser(user)

    localStorage.setItem('accessToken', accessToken)
  }, [])

  const removeAuth = () => {
    setAccessToken(null)
    setUser(null)

    localStorage.removeItem('accessToken')
  }

  const signUp = async ({ data }: { data: SignUp }) => {
    const response = await register({ data })

    setAuth(response.data.accessToken)

    return response.data
  }

  const signIn = async ({ data }: { data: Login }) => {
    const response = await login({ data })

    setAuth(response.data.accessToken)

    return response.data
  }

  const logout = async () => {
    await api.get(`/auth/logout`)
    removeAuth()
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

            // Update your state with the new access token
            setAuth(newAccessToken)

            // Retry the original request with the new token
            return api(originalRequest)
          } catch (tokenRefreshError) {
            // Handle token refresh failure (e.g., logout the user)
            console.error('Token refresh failed', tokenRefreshError)
            removeAuth()
          }
        }

        // Handle other errors
        return Promise.reject(error)
      },
    )

    return () => api.interceptors.response.eject(authInterceptor)
  }, [accessToken, setAuth])

  useLayoutEffect(() => {
    const maybeAccessToken = Option.fromNullable(
      localStorage.getItem('accessToken'),
    ).pipe(Option.getOrNull)

    console.log('AuthProvider getItem accessToken', maybeAccessToken)

    if (maybeAccessToken) {
      setAuth(maybeAccessToken)
    }
  }, [accessToken, setAuth])

  console.log('AuthProvider token', accessToken)

  return (
    <AuthContext.Provider value={{ accessToken, user, signUp, signIn, logout }}>
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
