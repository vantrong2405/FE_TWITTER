import authApi from '@/app/apis/auth.api'
import { tweetApi } from '@/app/apis/tweet.api'
import { IValidateLogin } from '@/app/schemas/login.schema'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/app/utils/utils'
import { useMutation } from '@tanstack/react-query'

export function useUnLikeTweet() {
  const { mutate: unLikeTweet, isPending: isUnLiketingTweet } = useMutation({
    mutationFn: (tweet_id: string) => {
      return tweetApi.unlikeTweet(tweet_id)
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Logout error:', error)
    }
  })

  return {
    unLikeTweet,
    isUnLiketingTweet
  }
}
