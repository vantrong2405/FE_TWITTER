import { AxiosError, isAxiosError } from 'axios'
import { HttpStatusCode } from '../app/constant/httpStatusCode.enum'
import { ExpiredTokenErrorData } from '../app/type/auth.type'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError(error: unknown): boolean {
  return (error as AxiosError<ExpiredTokenErrorData>).response?.data?.data?.name === 'EXPIRED_TOKEN'
}

export function isAxiosUnprocessableEntityError<UnprocessableEntityError>(
  error: unknown
): error is AxiosError<UnprocessableEntityError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
