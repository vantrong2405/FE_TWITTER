import authApi from '@/app/apis/auth.api'
import { IValidateLogin } from '@/app/schemas/login.schema'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/app/utils/utils'
import { useMutation } from '@tanstack/react-query'

export function useLogin({
  setExecuted,
  setIsLogin
}: {
  setExecuted: (value: boolean) => void
  setIsLogin: (value: boolean) => void
}) {
  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (body: IValidateLogin) => {
      return authApi.loginAccount(body)
    },
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.data.result
      setAccessTokenToLS(access_token)
      setRefreshTokenToLS(refresh_token)
      setExecuted(true)
      setIsLogin(true)
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
