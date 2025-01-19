'use client'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { TweetComposer } from '@/components/tweet-composer'
import { TweetList } from '@/components/tweet-list'
import { useQuery } from '@tanstack/react-query'
import authApi from '../apis/auth.api'

export default function FormDashBoard() {
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getMe
  })
  const profile = profileData?.data
  console.log('🚀 ~ HomePage ~ profile:', profile)
  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Header />
      <div className='container mx-auto px-4 py-8 flex gap-6'>
        <Sidebar className='hidden lg:block w-1/4' />
        <main className='flex-grow max-w-2xl'>
          <TweetComposer />
          <TweetList />
        </main>
        <aside className='hidden xl:block w-1/4'></aside>
      </div>
    </div>
  )
}
