import { useQuery } from '@tanstack/react-query'
import { queryKey } from '@/app/constant/query-key'
import { tweetApi } from '@/app/apis/tweet.api'

export function useGetTweets(limit: number, page: number) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [queryKey.TWEETS, page],
    queryFn: async () => {
      const response = await tweetApi.getTweets(limit, page)
      if (response?.data?.result) {
        return response.data.result
      }
      return response
    }
  })

  return { data, refetch, isLoading, error }
}
