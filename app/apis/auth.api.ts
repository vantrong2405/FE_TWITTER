import http from '@/lib/https'

const authApi = {
  registerAccount(body: { name: string; email: string; password: string }) {
    return http.post('/users/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post('/users/login', body)
  },
  logoutAccount(body: { refresh_token: string }) {
    return http.post('/users/logout', body)
  },
  forgotAccount(body: { email: string }) {
    return http.post('/users/forgot-password', body)
  },
  verifyForgotAccount(body: { forgot_password_token: string }) {
    return http.post('/users/verify-forgot-password', body)
  },
  verifyAccount(body: { email_verify_token: string }) {
    return http.post('/users/verify-email', body)
  },
  resendVerifyAccount(body: { email_verify_token: string }) {
    return http.post('/users/resend-verify-email', body)
  },
  resetPassword(body: { password: string; confirm_password: string; forgot_password_token: string }) {
    return http.post('/users/reset-password', body)
  },
  refreshToken(body: { refresh_token: string }) {
    return http.post('/users/refresh-token', body)
  }
}

export default authApi
