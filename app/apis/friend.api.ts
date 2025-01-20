import http from '../../lib/http'

const friendApi = {
  getFriend() {
    return http.get('/users/get-friend')
  }
}

export default friendApi
