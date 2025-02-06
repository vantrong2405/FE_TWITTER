import authApi from '@/app/apis/auth.api'
import { pathUrl } from '@/app/constant/path'
import { IValidateLogin } from '@/app/schemas/login.schema'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/app/utils/utils'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const router = useRouter()
  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (body: IValidateLogin) => {
      return authApi.loginAccount(body)
    },
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.data.result
      setAccessTokenToLS(access_token)
      setRefreshTokenToLS(refresh_token)
      router.push(pathUrl.home)
    },
    onError: (error) => {
      console.error('Logout error:', error)
    }
  })

  return {
    mutateLogin,
    isPendingLogin
  }
}
