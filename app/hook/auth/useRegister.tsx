import authApi from '@/app/apis/auth.api'
import { IValidateRegister } from '@/app/schemas/register.shema'
import { useMutation } from '@tanstack/react-query'

export function useRegister() {
  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: (body: IValidateRegister) => {
      return authApi.loginAccount(body)
    },
    onSuccess: (data) => {},
    onError: (error) => {}
  })

  return {
    mutateRegister,
    isPendingRegister
  }
}
