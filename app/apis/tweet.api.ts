import http from '@/lib/https'

export const tweetApi = {
  createTweet(body: {
    type: number
    audience: number
    content: string
    parent_id: string
    hashtags: string[]
    mentions: string[]
    medias: { url: string; type: number }[]
  }) {
    return http.post(`/tweet/`, body)
  },
  getTweets(limit: number, page: number) {
    return http.get(`/tweet/get-newfeed-me`, {
      params: {
        limit,
        page
      }
    })
  },
  deleteTweet(tweet_id: string) {
    return http.delete(`/tweet/${tweet_id}`)
  },
  likeTweet(body: { tweet_id: string }) {
    return http.post('/likes/tweet/', body)
  },
  unlikeTweet(tweet_id: string) {
    return http.delete(`/likes/tweet/${tweet_id}`)
  }
}
