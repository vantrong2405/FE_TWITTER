import authApi from '@/app/apis/auth.api'
import { IValidateLogin } from '@/app/schemas/login.schema'
import { setAccessTokenToLS, setRefreshTokenToLS } from '@/app/utils/utils'
import { useMutation } from '@tanstack/react-query'

export function useLogin({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (body: IValidateLogin) => {
      return authApi.loginAccount(body)
    },
    onSuccess: (data) => {
      const { access_token, refresh_token } = data.data.result
      setAccessTokenToLS(access_token)
      setRefreshTokenToLS(refresh_token)
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
