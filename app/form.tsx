'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { pathUrl } from './constant/path'
import { getOauthGoogleUrl } from './hooks/auth/useLoginOathGoogle'
import { useStoreLocal } from './stores/useStoreLocal'

export default function GetStarted() {
  const oauthURL = getOauthGoogleUrl()
  const { profile } = useStoreLocal()

  return (
    <div className='flex min-h-screen flex-col  lg:flex-row'>
      <div className='flex items-center justify-center p-4 lg:flex-1 lg:p-8'>
        <div className='w-[200px] sm:w-[300px] lg:w-[380px]'>
          <svg viewBox='0 0 24 24' aria-hidden='true' className='h-full w-full ' fill='currentColor'>
            <g>
              <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'></path>
            </g>
          </svg>
        </div>
      </div>
      <div className='flex flex-1 flex-col justify-center p-4 lg:p-8'>
        <div className='mx-auto w-full max-w-[450px] space-y-6 lg:space-y-8'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>Happening now</h1>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold sm:text-3xl'>Join today.</h2>
            <div className='space-y-3'>
              {profile && profile.email ? (
                <Link href={pathUrl.home}>
                  <Button variant='outline' className='relative w-full justify-center'>
                    Get started - <b>{profile.email}</b>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href={oauthURL}>
                    <Button variant='outline' className='relative w-full justify-center'>
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
                      Sign in with Google
                    </Button>
                  </Link>
                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <span className='w-full border-t border-gray-800'></span>
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                      <span className='k px-2 text-gray-400'>or</span>
                    </div>
                  </div>
                  <Link href={pathUrl.login_register}>
                    <Button className='w-full bg-[#1d9bf0]  hover:bg-[#1a8cd8]'>Create account</Button>
                  </Link>
                </>
              )}
              <p className='text-xs text-gray-400'>
                By signing up, you agree to the{' '}
                <Link href='#' className='text-[#1d9bf0] hover:underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='#' className='text-[#1d9bf0] hover:underline'>
                  Privacy Policy
                </Link>
                , including{' '}
                <Link href='#' className='text-[#1d9bf0] hover:underline'>
                  Cookie Use
                </Link>
                .
              </p>
            </div>
          </div>
          <div className='space-y-4'>
            <h3 className='text-gray-400'>Already have an account?</h3>
            <Link href={pathUrl.login_register}>
              <Button variant='outline' className='w-full border-gray-800 text-[#1d9bf0] hover:bg-[#031018]'>
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <footer className='mt-8 w-full lg:fixed lg:bottom-0'>
        <nav className='flex flex-wrap justify-center gap-2 p-4 text-xs text-gray-500 sm:gap-4'>
          {[
            'About',
            'Download the X app',
            'Help Center',
            'Terms of Service',
            'Privacy Policy',
            'Cookie Policy',
            'Accessibility',
            'Ads info',
            'Blog',
            'Careers',
            'Brand Resources',
            'Advertising',
            'Marketing',
            'X for Business',
            'Developers',
            'Directory',
            'Settings'
          ].map((item) => (
            <Link key={item} href='#' className='hover:underline'>
              {item}
            </Link>
          ))}
          <span>© 2024 X Corp.</span>
        </nav>
      </footer>
    </div>
  )
}
