'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/app/apis/auth.api'
import 'react-toastify/dist/ReactToastify.css'
import { loginSchema } from '@/app/schemas/auth.schema'
import { TypeFormDataLogin } from '@/app/schemas/type.schema'
import { handleError, setAccessTokenToLS, setRefreshTokenToLS } from '@/app/utils/utils'
import { useRouter, useSearchParams } from 'next/navigation'

export function SignInForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<TypeFormDataLogin>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: Omit<TypeFormDataLogin, 'confirm_password'>) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        const { access_token, refresh_token } = data.data.result
        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        router.push('/')
      },
      onError: (error) => handleError(error, setError, {} as TypeFormDataLogin)
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
      <Button type='submit' className='w-full'>
        Sign In
      </Button>
      <a href='/forgot-password' className='text-end font-normal hover:underline block'>
        Forgot password?
      </a>
    </form>
  )
}
