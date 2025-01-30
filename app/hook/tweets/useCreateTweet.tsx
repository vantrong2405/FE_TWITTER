import authApi from '@/app/apis/auth.api'
import { tweetApi } from '@/app/apis/tweet.api'
import { queryKey } from '@/app/constant/query-key'
import { IValidateLogin } from '@/app/schemas/login.schema'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/app/utils/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTweet() {
  const queryClient = useQueryClient()

  const { mutateAsync: createTweet, isPending: isCreatingTweet } = useMutation({
    mutationFn: async (body: {
      type: number
      audience: number
      content: string
      parent_id: string
      hashtags: string[]
      mentions: string[]
      medias: { url: string; type: number }[]
    }) => {
      return await tweetApi.createTweet(body)
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [queryKey.TWEETS] })
    },
    onError: (error) => {
      console.error('Tweet creation error:', error)
    }
  })

  return { createTweet, isCreatingTweet }
}
