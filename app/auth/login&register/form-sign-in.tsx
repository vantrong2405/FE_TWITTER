'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { pathUrl } from '@/app/constant/path'
import { useEffect, useState } from 'react'
import { useProfile } from '@/app/hook/user/usegetProfile'
import { useLogin } from '@/app/hook/auth/useLogin'
import { useLoginFormSchema } from '@/app/schemas/login.schema'

export function FormSignIn() {
  const [isLogin, setIsLogin] = useState(false)
  const [executed, setExecuted] = useState<boolean>(false)
  const { data } = useProfile({ executed, setExecuted })
  const { register, handleSubmit, errors } = useLoginFormSchema()
  const { mutateLogin, isPendingLogin } = useLogin({ setExecuted, setIsLogin })
  const onSubmit = handleSubmit((data) => mutateLogin(data))

  useEffect(() => {
    if (isLogin) {
      setIsLogin(false)
      redirect(pathUrl.home)
    }
  }, [isLogin])
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
      <Button type='submit' className='w-full' isLoading={isPendingLogin} disabled={isPendingLogin}>
        Sign In
      </Button>
      <Link href={pathUrl.login_register} className='text-end font-normal hover:underline block'>
        Forgot password?
      </Link>
    </form>
  )
}
