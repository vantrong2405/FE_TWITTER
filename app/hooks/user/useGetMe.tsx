import { useQuery } from '@tanstack/react-query'
import { setProfileToLS } from '../../utils/utils'
import { useStoreLocal } from '@/app/stores/useStoreLocal'
import { userApi } from '@/app/apis/user.api'
import { queryKey } from '@/app/constant/query-key'

export function useGetMe() {
  const { setProfile } = useStoreLocal()
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [queryKey.ME],
    queryFn: async () => {
      const response = await userApi.getMe()
      if (response?.data?.result) {
        setProfileToLS(response.data.result)
        setProfile(response.data.result)
        return response.data.result
      }
      return response
    }
  })

  return { data, refetch, isLoading, error }
}
