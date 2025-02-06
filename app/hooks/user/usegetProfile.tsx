import { useQuery } from '@tanstack/react-query'
import { setProfileToLS } from '../../utils/utils'
import { useStoreLocal } from '@/app/stores/useStoreLocal'
import { userApi } from '@/app/apis/user.api'
import { queryKey } from '@/app/constant/query-key'

export function useGetProfile(username: string) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [queryKey.PROFILE],
    queryFn: async () => {
      const response = await userApi.getProfile(username)
      return response.data
    }
  })

  return { data, refetch, isLoading, error }
}
