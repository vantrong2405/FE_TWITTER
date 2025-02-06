import http from '@/lib/https'
import { CreateTweetBody } from '../types/tweet.i'

export const tweetApi = {
  createTweet(body: CreateTweetBody) {
    return http.post('/tweet/', body)
  },
  getTweets(limit: number, page: number) {
    return http.get(`/tweet/`, {
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
