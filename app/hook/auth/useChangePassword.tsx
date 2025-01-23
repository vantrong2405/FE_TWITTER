import authApi from '@/app/apis/auth.api'
import { userApi } from '@/app/apis/user.api'
import { IValidateChangePassword } from '@/app/schemas/changePassword.schema'
import { useMutation } from '@tanstack/react-query'

export function useChangePassword(onOpenChange: (open: boolean) => void) {
  const { mutate: mutateChangePassword, isPending: isPendingChangePassword } = useMutation({
    mutationFn: (body: IValidateChangePassword) => {
      return userApi.changePassword(body)
    },
    onSuccess: (data) => {
      onOpenChange(false)
    },
    onError: (error) => {}
  })

  return {
    mutateChangePassword,
    isPendingChangePassword
  }
}
