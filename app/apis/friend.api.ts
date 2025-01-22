import http from '../../lib/http'

const friendApi = {
  getFriend() {
    return http.get('/users/get-friend')
  },
  followFriend(body: { followed_user_id: string }) {
    return http.post(`/users/follow`, body)
  },
  unfollowFriend(user_id: string) {
    return http.get(`/users/follow${user_id}`)
  }
}

export default friendApi
