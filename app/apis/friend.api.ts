import http from '@/lib/https'

const friendApi = {
  getFriends() {
    return http.get('/users/get-friend')
  },
  getSuggestFriends(limit: number, page: number) {
    return http.get(`/users/suggest-friends`, {
      params: {
        limit,
        page
      }
    })
  },
  followFriend(body: { followed_user_id: string }) {
    return http.post(`/users/follow`, body)
  },
  unfollowFriend(user_id: string) {
    return http.get(`/users/follow${user_id}`)
  }
}

export default friendApi
