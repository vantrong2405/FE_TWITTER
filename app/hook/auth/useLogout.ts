import authApi from '@/app/apis/auth.api'
import { pathUrl } from '@/app/constant/path'
import { IValidateLogout } from '@/app/schemas/logout.schema'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { getRefreshTokenFromLS, clearLS, handleError } from '@/app/utils/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setProfile } = useStoreLocal()
  const { mutate: mutateLogout, isPending: isPendingLogout } = useMutation({
    mutationFn: (body: IValidateLogout) => {
      return authApi.logoutAccount({ ...body, refresh_token: body.refresh_token })
    },
    onSuccess: () => {
      queryClient.clear()
      clearLS()
      setProfile(null)
      router.push(pathUrl.getStarted)
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
