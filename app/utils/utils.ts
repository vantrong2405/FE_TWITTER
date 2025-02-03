import { Path, UseFormSetError } from 'react-hook-form'
import axios from 'axios'
import { HttpStatusCode } from '../constant/httpStatusCode.enum'
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { User } from '../types/user.i'

export const isClient = typeof window !== 'undefined'

export const getAccessTokenFromLS = () => {
  if (!isClient) return null
  return localStorage.getItem('access_token') || null
}

export const getRefreshTokenFromLS = () => {
  if (!isClient) return null
  return localStorage.getItem('refresh_token') || null
}

export const getProfileFromLS = (): User | null => {
  if (!isClient) return null

  const userInfo = localStorage.getItem('profile')
  if (!userInfo) return null

  try {
    return JSON.parse(userInfo) as User
  } catch (error) {
    console.error('Failed to parse userInfo from localStorage:', error)
    return null
  }
}

export const setAccessTokenToLS = (access_token: string) => {
  if (isClient) localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  if (isClient) localStorage.setItem('refresh_token', refresh_token)
}

export const setProfileToLS = (profile: User) => {
  if (isClient) localStorage.setItem('profile', JSON.stringify(profile))
}

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
  return userName?.trim().charAt(0).toUpperCase() || ''
}

export function formatDate(date: Date | undefined | string): string {
  try {
    if (!date) return ''
    const parsedDate = date instanceof Date ? date : new Date(date)
    if (isNaN(parsedDate.getTime())) throw new Error('Invalid date format')
    return format(parsedDate, 'yyyy-MM-dd')
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

export const validateUrl = (url: string): string => {
  try {
    return new URL(url).toString()
  } catch {
    return 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
  }
}
