import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './rules'

export interface IValidateForgotPassword {
  email: string
}

export const forgotSchema = schema.pick(['email'])

export const useForgotPasswordFormSchema = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<IValidateForgotPassword>({
    resolver: yupResolver(forgotSchema)
  })

  return {
    register,
    handleSubmit,
    setError,
    setValue,
    errors
  }
}
