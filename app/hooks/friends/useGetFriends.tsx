import { useQuery } from '@tanstack/react-query'
import friendApi from '../../apis/friend.api'
import { queryKey } from '@/app/constant/query-key'

export function useGetFriends() {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [queryKey.FRIENDS],
    queryFn: async () => {
      const response = await friendApi.getFriends()
      if (response?.data?.result) {
        return response.data.result
      }
      return response
    }
  })

  return { data, refetch, isLoading, error }
}
