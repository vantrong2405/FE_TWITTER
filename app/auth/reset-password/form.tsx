'use client'

import { use, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Lock, KeyRound, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { TypeFormResetPassword } from '@/app/schemas/type.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetSchema } from '@/app/schemas/auth.schema'
import { useMutation } from '@tanstack/react-query'
import authApi from '@/app/apis/auth.api'
import { handleError } from '@/app/utils/utils'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import imgTweet from '../../assets/images/twitter.png'
export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<TypeFormResetPassword>({
    resolver: yupResolver(resetSchema)
  })

  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''

  const resetAccountMutation = useMutation({
    mutationFn: (body: TypeFormResetPassword) => {
      const payload = {
        ...body,
        forgot_password_token: token
      }
      return authApi.resetPassword(payload)
    }
  })

  const onSubmit = handleSubmit((data) => {
    resetAccountMutation.mutate(data, {
      onSuccess: (data) => {},
      onError: (error) => handleError(error, setError, {} as TypeFormResetPassword)
    })
  })

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-center text-blue-500'>
            <Image src={imgTweet} alt='logo' width={100} height={100} className='mb-2 mx-auto' />
            <div>Reset your password</div>
          </CardTitle>
          <CardDescription className='text-center text-gray-600'>
            Strong passwords include numbers, letters, and punctuation marks.
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className='space-y-4'>
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
          </CardContent>
          <CardFooter>
            <Button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-200'
              isLoading={resetAccountMutation.isPending}
              disabled={resetAccountMutation.isPending}
            >
              Reset password
              <ArrowRight className='ml-2' size={18} />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
