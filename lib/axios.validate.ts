import { AxiosError, isAxiosError } from 'axios'
import { HttpStatusCode } from '../app/constant/httpStatusCode.enum'
import { SuccessResponse } from '@/app/types/utils.i'

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError(error: unknown): boolean {
  return (
    (
      error as AxiosError<{
        data: {
          name: string
        }
      }>
    ).response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export function isAxiosUnprocessableEntityError<UnprocessableEntityError>(
  error: unknown
): error is AxiosError<UnprocessableEntityError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>
