import httpService from '@/lib/https'
import { IValidateUpdateProfile } from '../schemas/updateProfile.schema'

export const userApi = {
  changePassword(body: { old_password: string; new_password: string; confirm_new_password: string }) {
    return httpService.post('/users/change-password', body)
  },
  getMe() {
    return httpService.get('/users/me')
  },
  updateProfile(body: IValidateUpdateProfile) {
    return httpService.patch('/users/me', body)
  },
  getProfile(username: string) {
    return httpService.get(`/users/${username}`)
  }
}
