'use client'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { TweetComposer } from '@/components/tweet-composer'
import { TweetList } from '@/components/tweet-list'
import { useQuery } from '@tanstack/react-query'
import authApi from '../apis/auth.api'
import { WhoToFollow } from '@/components/ui/who-to-follow'
import { UserProfile } from '@/components/ui/user-profile'
import { NewsCarousel } from '@/components/ui/news-carousel'
import { TrendingTopics } from '@/components/ui/trending-topics'

export default function FormDashBoard() {
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getMe
  })
  const profile = profileData?.data
  console.log('🚀 ~ HomePage ~ profile:', profile)
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Header />
      <div className='container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6'>
        <Sidebar className='hidden lg:block lg:w-1/4' />
        <main className='flex-grow max-w-2xl w-full mx-auto lg:mx-0'>
          <UserProfile />
          <TweetComposer />
          <NewsCarousel />
          <TweetList />
        </main>
        <aside className='hidden xl:block w-1/4 space-y-6'>
          <TrendingTopics />
          <WhoToFollow />
        </aside>
      </div>
    </div>
  )
}
