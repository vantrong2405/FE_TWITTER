import authApi from '@/app/apis/auth.api'
import { IValidateForgotPassword } from '@/app/schemas/forgotPassword.schema'
import { useMutation } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

export function useForgotPassword({ setIsSubmitted }: { setIsSubmitted: Dispatch<SetStateAction<boolean>> }) {
  const { mutate: mutateForgotPassword, isPending: isPendingForgotPassword } = useMutation({
    mutationFn: (body: IValidateForgotPassword) => {
      return authApi.forgotAccount(body)
    },
    onSuccess: (data) => {
      setIsSubmitted(true)
    },
    onError: (error) => {}
  })

  return {
    mutateForgotPassword,
    isPendingForgotPassword
  }
}
