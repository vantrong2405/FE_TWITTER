import { tweetApi } from '@/app/apis/tweet.api'
import { queryKey } from '@/app/constant/query-key'
import { CreateTweetBody } from '@/app/types/tweet.i'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTweet() {
  const queryClient = useQueryClient()

  const { mutateAsync: createTweet, isPending: isCreatingTweet } = useMutation({
    mutationFn: async (body: CreateTweetBody) => {
      return await tweetApi.createTweet(body)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.TWEETS] })
    },
    onError: (error) => {
      console.error('Tweet creation error:', error)
    }
  })

  return { createTweet, isCreatingTweet }
}
