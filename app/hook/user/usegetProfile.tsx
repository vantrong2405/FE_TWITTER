import { useQuery } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { setProfileToLS } from '../../utils/utils'
import { Dispatch, SetStateAction, use, useEffect } from 'react'
import { useStoreLocal } from '@/app/store/useStoreLocal'

export function useProfile({
  executed,
  setExecuted
}: {
  executed: boolean
  setExecuted: Dispatch<SetStateAction<boolean>>
}) {
  const { setProfile } = useStoreLocal()
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['profile'],
    enabled: executed,
    queryFn: async () => {
      const response = await authApi.getMe()
      if (response?.data?.result) {
        setProfileToLS(response.data.result)
        setProfile(response.data.result)
        return response.data.result
      }
      return response
    }
  })

  useEffect(() => {
    if (executed) {
      setExecuted(false)
    }
  }, [executed])

  return { data, refetch, isLoading, error }
}
