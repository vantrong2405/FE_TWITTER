'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { pathUrl } from '@/app/constant/path'
import { useLoginFormSchema } from '@/app/schemas/login.schema'
import { useLogin } from '@/app/hook/auth/useLogin'

export function FormSignIn() {
  const { register, handleSubmit, errors } = useLoginFormSchema()
  const { mutateLogin, isPendingLogin } = useLogin()
  const onSubmit = handleSubmit((data) => mutateLogin(data))

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
      <Button type='submit' className='w-full' variant={'outline'} isLoading={isPendingLogin} disabled={isPendingLogin}>
        Sign In
      </Button>
      <Link href={pathUrl.forgot_password} className='text-end font-normal hover:underline block'>
        Forgot password?
      </Link>
    </form>
  )
}
