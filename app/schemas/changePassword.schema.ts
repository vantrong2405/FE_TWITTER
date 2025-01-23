import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './rules'

export interface IValidateChangePassword {
  old_password: string
  new_password: string
  confirm_new_password: string
}

export const changePasswordSchema = schema.pick(['old_password', 'new_password', 'confirm_new_password'])

export const useChangePasswordFormSchema = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<IValidateChangePassword>({
    resolver: yupResolver(changePasswordSchema)
  })

  return {
    register,
    handleSubmit,
    setError,
    setValue,
    errors
  }
}
