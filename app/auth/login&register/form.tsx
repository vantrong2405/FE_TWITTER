'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormSignIn } from './form-sign-in'
import { FormSignUp } from './form-sign-up'
import Link from 'next/link'
import { getOauthGoogleUrl } from '@/app/hooks/auth/useLoginOathGoogle'

export default function FormAuth() {
  const oauthURL = getOauthGoogleUrl()

  return (
    <div className='min-h-screen bg-gradient-to-b  flex items-center justify-center p-4'>
      <Card className='w-full max-w-md shadow-xl'>
        <CardHeader className='space-y-1'>
          <div className='flex justify-center mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-blue-500'
            >
              <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
            </svg>
          </div>
          <CardTitle className='text-3xl font-extrabold text-center '>Welcome to Twitter</CardTitle>
          <CardDescription className='text-center text-gray-500 '>
            Login or create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className='p-6'>
          <Tabs defaultValue='login' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-6'>
              <TabsTrigger value='login' className='text-sm font-medium'>
                Login
              </TabsTrigger>
              <TabsTrigger value='register' className='text-sm font-medium'>
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value='login'>
              <FormSignIn />
            </TabsContent>
            <TabsContent value='register'>
              <FormSignUp />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4 p-6 pt-0'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span>Or continue with</span>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Button variant='outline' className='w-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='w-5 h-5 mr-2'
              >
                <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
              </svg>
              Twitter
            </Button>
            <Link href={oauthURL}>
              <Button variant='outline' className='w-full'>
                <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                  <path
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    fill='#4285F4'
                  />
                  <path
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    fill='#34A853'
                  />
                  <path
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    fill='#EA4335'
                  />
                  <path d='M1 1h22v22H1z' fill='none' />
                </svg>
                Google
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
