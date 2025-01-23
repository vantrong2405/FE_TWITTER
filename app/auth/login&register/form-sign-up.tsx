'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import Link from 'next/link'
import { pathUrl } from '@/app/constant/path'
import { useRegisterFormSchema } from '@/app/schemas/register.shema'
import { useRegister } from '@/app/hook/auth/useRegister'

export function FormSignUp() {
  const { register, handleSubmit, setError, setValue, errors } = useRegisterFormSchema()
  const { mutateRegister, isPendingRegister } = useRegister()
  const onSubmit = handleSubmit((data) => mutateRegister(data))
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
      <Button
        type='submit'
        className='w-full'
        variant={'outline'}
        isLoading={isPendingRegister}
        disabled={isPendingRegister}
      >
        Sign up
      </Button>
      <Link href={pathUrl.forgot_password} className='text-end font-normal hover:underline block'>
        Forgot password?
      </Link>
    </form>
  )
}
