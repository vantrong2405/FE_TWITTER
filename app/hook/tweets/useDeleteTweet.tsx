import authApi from '@/app/apis/auth.api'
import { tweetApi } from '@/app/apis/tweet.api'
import { queryKey } from '@/app/constant/query-key'
import { IValidateLogin } from '@/app/schemas/login.schema'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/app/utils/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteTweet() {
  const queryClient = useQueryClient()
  const { mutate: deleteTweet, isPending: isDeletingTweet } = useMutation({
    mutationFn: (tweet_id: string) => {
      return tweetApi.deleteTweet(tweet_id)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.TWEETS] })
    },
    onError: (error) => {
      console.error('Logout error:', error)
    }
  })

  return {
    deleteTweet,
    isDeletingTweet
  }
}
