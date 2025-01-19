import { User } from '../type/user.type'
import { Path, UseFormSetError } from 'react-hook-form'
import axios from 'axios'
import { HttpStatusCode } from '../constant/httpStatusCode.enum'

export const isClient = typeof window !== 'undefined'

export const getAccessTokenFromLS = () => (isClient ? localStorage.getItem('access_token') : null)
export const getRefreshTokenFromLS = () => (isClient ? localStorage.getItem('refresh_token') : null)
export const getProfileFromLS = (): User | null => {
  if (!isClient) return null

  const userInfo = localStorage.getItem('userInfo')

  try {
    return userInfo ? JSON.parse(userInfo) : {}
  } catch (error) {
    console.error('Failed to parse userInfo from localStorage:', error)
    return null
  }
}

export const setAccessTokenToLS = (access_token: string) =>
  isClient && localStorage.setItem('access_token', access_token)
export const setRefreshTokenToLS = (refresh_token: string) =>
  isClient && localStorage.setItem('refresh_token', refresh_token)
export const setProfileToLS = (profile: User) => isClient && localStorage.setItem('profile', JSON.stringify(profile))

export const clearLS = () => {
  if (isClient) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('profile')
  }
}

export const handleError = <T extends Record<string, any>>(
  error: unknown,
  setError: UseFormSetError<T>,
  typeFormData: T
) => {
  if (axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity) {
    const formError = error.response?.data?.data as Partial<T>
    if (formError) {
      Object.keys(formError).forEach((key) => {
        setError(key as keyof T as Path<T>, {
          message: formError[key as keyof T] as string,
          type: 'server'
        })
      })
    }
  }
}
