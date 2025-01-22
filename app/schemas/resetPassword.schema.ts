import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './rules'

export interface IValidateResetPassword {
  password: string
  confirm_password: string
  forgot_password_token?: string
}

export const resetSchema = schema.pick(['password', 'confirm_password'])

export const useResetPasswordFormSchema = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<IValidateResetPassword>({
    resolver: yupResolver(resetSchema)
  })

  return {
    register,
    handleSubmit,
    setError,
    setValue,
    errors
  }
}
