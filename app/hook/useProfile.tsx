import { useQuery } from '@tanstack/react-query'
import authApi from '../apis/auth.api'
import { setProfileToLS } from '../utils/utils'

export function useProfile() {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await authApi.getMe()
      if (response?.data?.result) {
        setProfileToLS(response.data.result)
      }
      return response
    }
  })

  return { data, refetch, isLoading, error }
}
