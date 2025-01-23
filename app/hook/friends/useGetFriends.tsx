import { useQuery } from '@tanstack/react-query'
import friendApi from '../../apis/friend.api'
import { queryKey } from '@/app/constant/query-key'

export function useGetFriends() {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [queryKey.friends],
    queryFn: friendApi.getFriend
  })

  return { data, refetch, isLoading, error }
}
