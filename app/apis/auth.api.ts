import { AuthResponse } from '../type/auth.type'
import http from '../../lib/http'

const authApi = {
  registerAccount(body: { name: string; email: string; password: string }) {
    return http.post<AuthResponse>('/users/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/users/login', body)
  },
  logoutAccount() {
    return http.post('/logout')
  }
}

export default authApi
