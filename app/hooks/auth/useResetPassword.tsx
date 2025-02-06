import authApi from '@/app/apis/auth.api'
import { IValidateResetPassword } from '@/app/schemas/resetPassword.schema'
import { useMutation } from '@tanstack/react-query'

export function useResetPassword() {
  const { mutate: mutateResetPassword, isPending: isPendingResetPassword } = useMutation({
    mutationFn: (body: IValidateResetPassword) => {
      const payload = {
        ...body,
        forgot_password_token: body.forgot_password_token || ''
      }
      return authApi.resetPassword(payload)
    },
    onSuccess: (data) => {},
    onError: (error) => {}
  })

  return {
    mutateResetPassword,
    isPendingResetPassword
  }
}
