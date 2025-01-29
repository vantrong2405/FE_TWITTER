import httpService from '@/lib/https'

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
    return httpService.post(`/tweet/`, body)
  },
  getTweets(limit: number, page: number) {
    return httpService.get(`/tweet/`, {
      params: {
        limit,
        page
      }
    })
  },
  deleteTweet(tweet_id: string) {
    return httpService.delete(`/tweet/${tweet_id}`)
  },
  likeTweet(body: { tweet_id: string }) {
    return httpService.post('/likes/tweet/', body)
  },
  unlikeTweet(tweet_id: string) {
    return httpService.delete(`/likes/tweet/${tweet_id}`)
  }
}
