'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/app/apis/auth.api'
import { DatePicker } from '@/components/ui/date-picker'
import { registerSchema } from '@/app/schemas/auth.schema'
import { TypeFormDataRegister } from '@/app/schemas/type.schema'
import { handleError } from '@/app/utils/utils'

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<TypeFormDataRegister>({
    resolver: yupResolver(registerSchema)
  })

  const logoutAccountMutation = useMutation({
    mutationFn: (body: TypeFormDataRegister) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    logoutAccountMutation.mutate(data, {
      onSuccess: () => {},
      onError: (error) => handleError(error, setError, {} as TypeFormDataRegister)
    })
  })

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          className='mt-8'
          placeholder='enter your email'
          register={register}
          name='email'
          errorMessage={errors.email?.message}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          className='mt-8'
          placeholder='enter your password'
          register={register}
          name='password'
          errorMessage={errors.password?.message}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Confirm password</Label>
        <Input
          type='password'
          className='mt-8'
          placeholder='enter your confirm password'
          register={register}
          name='confirm_password'
          errorMessage={errors.confirm_password?.message}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>User name</Label>
        <Input
          type='text'
          className='mt-8'
          placeholder='enter your user name'
          register={register}
          name='name'
          errorMessage={errors.name?.message}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Date of birth</Label>
        <DatePicker
          name='date_of_birth'
          setValue={setValue}
          errorMessage={errors.date_of_birth?.message}
          className='mt-8'
        />
      </div>
      <Button type='submit' className='w-full'>
        Sign up
      </Button>
      <a href='/forgot-password' className='text-end font-normal hover:underline block'>
        Forgot password?
      </a>
    </form>
  )
}
