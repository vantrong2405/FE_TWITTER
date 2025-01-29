import authApi from '@/app/apis/auth.api'
import { IValidateLogout } from '@/app/schemas/logout.schema'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { getRefreshTokenFromLS, clearLS, handleError } from '@/app/utils/utils'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

export function useLogout() {
  const { setProfile } = useStoreLocal()
  const { mutate: mutateLogout, isPending: isPendingLogout } = useMutation({
    mutationFn: (body: IValidateLogout) => {
      const refresh_token = getRefreshTokenFromLS() || ''
      return authApi.logoutAccount({ ...body, refresh_token })
    },
    onSuccess: () => {
      clearLS()
      setProfile(null)
    },
    onError: (error) => {
      console.error('Logout error:', error)
    }
  })

  return {
    mutateLogout,
    isPendingLogout
  }
}
