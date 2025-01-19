import axios, { type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from '../app/utils/utils'
import { HttpStatusCode } from '../app/constant/httpStatusCode.enum'
import { RefreshTokenResponse } from '../app/type/auth.type'
import { isAxiosExpiredTokenError } from './axios.validate'
import { pathUrl } from '@/app/constant/path'

class Http {
  instance: AxiosInstance
  private accessToken: string | null
  private refreshToken: string | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_END_POINT,
      timeout: 1000 * 10,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 120 * 60,
        'expire-refresh-token': 6000 * 60
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        const token = getAccessTokenFromLS()
        config.headers.authorization = `Bearer ${token}`
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        const data = response.data
        if (url === pathUrl.login_register) {
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          if (this.accessToken && this.refreshToken) {
            setAccessTokenToLS(this.accessToken)
            setRefreshTokenToLS(this.refreshToken)
          }
          setProfileToLS(data.data.user)
        } else if (url === pathUrl.logout) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        if (data.message) {
          toast.success(data.message)
        }
        return response
      },
      async (error) => {
        const data: { message?: string } = error.response?.data
        const message = data?.message || error.message
        if (error?.response.status !== HttpStatusCode.UnprocessableEntity) {
        }
        if (error?.response.status === HttpStatusCode.Unauthorized) {
          if (isAxiosExpiredTokenError(error)) {
            const newAccessToken = await this.handleRefreshToken()
            if (newAccessToken) {
              setAccessTokenToLS(newAccessToken)
              return Promise.reject(error)
            }
          }
          clearLS()
        }
        toast.error(message)
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken = async (): Promise<string | undefined> => {
    const res = await this.instance.post<RefreshTokenResponse>('users/refresh-token', {
      refresh_token: this.refreshToken
    })
    return res.data.result.access_token
  }
}

const http = new Http().instance

export default http
