import { useQuery } from '@tanstack/react-query'
import { queryKey } from '@/app/constant/query-key'
import friendApi from '@/app/apis/friend.api'

export function useGetSuggestFriends(limit: number, page: number) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [queryKey.FRIENDS, page],
    queryFn: async () => {
      const response = await friendApi.getSuggestFriends(limit, page)
      if (response?.data?.result) {
        return response.data.result
      }
      return response
    }
  })

  return { data, refetch, isLoading, error }
}
