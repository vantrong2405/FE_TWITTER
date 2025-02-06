import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import QueryProvider from './providers'
import { ToastContainer } from 'react-toastify'
import AuthGuard from './guard-layout'
import { Suspense } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import NProgressHandler from '@/components/common/nro-progress'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <QueryProvider>
          <Suspense>
            <AuthGuard>
              <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                <div className='text-black dark:text-white dark:bg-black min-h-screen transition-colors duration-300'>
                  {children}
                </div>
              </ThemeProvider>
            </AuthGuard>
          </Suspense>
        </QueryProvider>
        <ToastContainer />
        <NProgressHandler />
      </body>
    </html>
  )
}
