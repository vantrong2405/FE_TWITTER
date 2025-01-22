import { useQuery } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { setProfileToLS } from '../../utils/utils'
import { Dispatch, SetStateAction, use, useEffect } from 'react'

export function useProfile({
  executed,
  setExecuted
}: {
  executed: boolean
  setExecuted: Dispatch<SetStateAction<boolean>>
}) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['profile'],
    enabled: executed,
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
