import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, TypeSchema } from './rules'

export type IValidateRegister = {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export const registerSchema = schema.pick(['email', 'password', 'confirm_password', 'name', 'date_of_birth'])

export const useRegisterFormSchema = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<IValidateRegister>({
    resolver: yupResolver(registerSchema)
  })

  return {
    register,
    handleSubmit,
    setError,
    setValue,
    errors
  }
}
