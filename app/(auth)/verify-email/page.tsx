'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icon'

export default function VerifyEmailPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='flex justify-center mb-4'>
            <Icons.mail className='h-12 w-12 text-blue-500' />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>Verify Email Success</CardTitle>
          <CardDescription className='text-center'>
            You have successfully verified your email, we hope the application will give you a great experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-center space-y-4'>
            <Icons.checkCircle className='h-12 w-12 text-green-500 mx-auto' />
            <p className='text-lg font-semibold'>Email Verified Successfully!</p>
            <Button className='w-full' onClick={() => (window.location.href = '/')}>
              Continue to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
