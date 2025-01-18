import { User } from '../type/user.type'
import { Path, UseFormSetError } from 'react-hook-form'
import axios from 'axios'
import { HttpStatusCode } from '../constant/httpStatusCode.enum'

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
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
