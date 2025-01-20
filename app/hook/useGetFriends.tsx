import { useQuery } from '@tanstack/react-query'
import friendApi from '../apis/friend.api'

export function useGetFriends() {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['friends'],
    queryFn: friendApi.getFriend
  })

  return { data, refetch, isLoading, error }
}
