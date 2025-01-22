import { useForm } from 'react-hook-form'

export interface IValidateLogout {
  refresh_token: string
}

export const useLogoutFormSchema = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<IValidateLogout>()

  return {
    register,
    handleSubmit,
    setError,
    setValue,
    errors
  }
}
