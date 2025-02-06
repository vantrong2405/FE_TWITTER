import authApi from '@/app/apis/auth.api'
import { tweetApi } from '@/app/apis/tweet.api'
import { IValidateLogin } from '@/app/schemas/login.schema'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/app/utils/utils'
import { useMutation } from '@tanstack/react-query'

export function useLikeTweet() {
  const { mutate: likeTweet, isPending: isLiketingTweet } = useMutation({
    mutationFn: (body: { tweet_id: string }) => {
      return tweetApi.likeTweet(body)
    },
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Logout error:', error)
    }
  })

  return {
    likeTweet,
    isLiketingTweet
  }
}
