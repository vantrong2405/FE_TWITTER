import authApi from '@/app/apis/auth.api'
import { IValidateLogout } from '@/app/schemas/logout.schema'
import { getRefreshTokenFromLS, clearLS, handleError } from '@/app/utils/utils'
import { useMutation } from '@tanstack/react-query'

export function useLogout() {
  const { mutate: mutateLogout, isPending: isPendingLogout } = useMutation({
    mutationFn: (body: IValidateLogout) => {
      const refresh_token = getRefreshTokenFromLS() || ''
      return authApi.logoutAccount({ ...body, refresh_token })
    },
    onSuccess: () => {
      clearLS()
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
