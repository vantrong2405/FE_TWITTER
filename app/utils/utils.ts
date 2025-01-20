import { User } from '../type/user.type'
import { Path, UseFormSetError } from 'react-hook-form'
import axios from 'axios'
import { HttpStatusCode } from '../constant/httpStatusCode.enum'
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export const isClient = typeof window !== 'undefined'

export const getAccessTokenFromLS = () => (isClient ? localStorage.getItem('access_token') : null)
export const getRefreshTokenFromLS = () => (isClient ? localStorage.getItem('refresh_token') : null)
export const getProfileFromLS = (): User | null => {
  if (!isClient) return null

  const userInfo = localStorage.getItem('profile')

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstLetter(userName: string): string {
  return userName ? userName.trim().charAt(0).toUpperCase() : ''
}

export function formatDate(date: Date | undefined | string): string {
  try {
    if (!date) return ''
    const parsedDate = typeof date === 'string' ? new Date(date) : date
    return format(parsedDate, 'yyyy-MM-dd')
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}
