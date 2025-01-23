import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from './rules'

export type IValidateUpdateProfile = {
  name: string
  website: string
  bio: string
  cover_photo: string
  location?: 'Hà nội' | 'Đà nẵng' | 'Hồ chí minh'
  date_of_birth?: string
}

export const updateProfileSchema = userSchema.pick([
  'name',
  'date_of_birth',
  'bio',
  'location',
  'website',
  'cover_photo'
])

export const useUpdateProfileFormSchema = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<IValidateUpdateProfile>({
    resolver: yupResolver(updateProfileSchema)
  })

  return {
    register,
    handleSubmit,
    setError,
    setValue,
    errors
  }
}
