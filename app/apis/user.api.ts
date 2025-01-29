import http from '@/lib/https'
import { IValidateUpdateProfile } from '../schemas/updateProfile.schema'

export const userApi = {
  changePassword(body: { old_password: string; new_password: string; confirm_new_password: string }) {
    return http.post('/users/change-password', body)
  },
  getMe() {
    return http.get('/users/me')
  },
  updateProfile(body: IValidateUpdateProfile) {
    return http.patch('/users/me', body)
  },
  getProfile(username: string) {
    return http.get(`/users/${username}`)
  }
}
