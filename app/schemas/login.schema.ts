import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './rules'

export interface IValidateLogin {
  email: string
  password: string
}

export const loginSchema = schema.pick(['email', 'password'])
export const useLoginFormSchema = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<IValidateLogin>({
    resolver: yupResolver(loginSchema)
  })

  return {
    register,
    handleSubmit,
    setError,
    setValue,
    errors
  }
}
