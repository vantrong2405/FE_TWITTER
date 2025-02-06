'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Icons } from '@/components/ui/icon'
import { useForgotPassword } from '@/app/hooks/auth/useForgotPassword'
import { pathUrl } from '@/app/constant/path'
import { useForgotPasswordFormSchema } from '@/app/schemas/forgotPassword.schema'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, errors } = useForgotPasswordFormSchema()
  const { mutateForgotPassword, isPendingForgotPassword } = useForgotPassword({ setIsSubmitted })
  const onSubmit = handleSubmit((data) => mutateForgotPassword(data))

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='flex justify-center mb-4'>
            <Icons.lock className='h-12 w-12 text-blue-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>Forgot Password</CardTitle>
          <CardDescription className='text-center'>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={onSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Input
                  type='email'
                  className='mt-8'
                  placeholder='Enter your email'
                  register={register}
                  name='email'
                  errorMessage={errors.email?.message}
                />
              </div>
              <Button type='submit' className='w-full' variant={'outline'} disabled={isLoading}>
                {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className='text-center space-y-4'>
              <Icons.mailCheck className='h-12 w-12 text-green-500 mx-auto' />
              <p className='text-lg font-semibold'>Check Your Email</p>
              <p>
                We&apos;ve sent a password reset link to {email}. Please check your inbox and follow the instructions to
                reset your password.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Link href={pathUrl.login_register} className='text-sm text-blue-500 hover:underline'>
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
