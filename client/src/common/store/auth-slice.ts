import { authApi } from '@Common/api'
import { FullUserDto, LoginDto } from '@Common/api/generated'
import { AxiosError } from 'axios'
import { StateCreator } from 'zustand'

type ApiErrorResponse = {
  message: string
  statusCode: number
  error: string
}

type AuthState = {
  user: FullUserDto | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

type AuthActions = {
  login: (credentials: LoginDto) => Promise<boolean>
  logout: () => Promise<boolean>
  clearError: () => void
}

export type AuthSlice = AuthState & AuthActions

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  AuthSlice
> = (set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null }, undefined, 'auth/login/start')

    try {
      const resp = await authApi.login(credentials)
      set(
        {
          user: resp.data,
          isAuthenticated: true,
          isLoading: false,
        },
        undefined,
        'auth/login/success',
      )
      return true
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>
      set(
        {
          isLoading: false,
          error:
            error.response?.data?.message ||
            'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde',
        },
        undefined,
        'auth/login/error',
      )
      return false
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null }, undefined, 'auth/logout/start')
    try {
      await authApi.logout()
      set(
        {
          user: null,
          isAuthenticated: false,
          isLoading: false,
        },
        undefined,
        'auth/logout/success',
      )
      return true
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>
      set(
        {
          isLoading: false,
          error:
            error.response?.data?.message ||
            'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde',
        },
        undefined,
        'auth/logout/error',
      )
      return false
    }
  },

  clearError: () => {
    set({ error: null }, undefined, 'auth/clearError')
  },
})
