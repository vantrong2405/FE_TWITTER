'use client'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { TweetComposer } from '@/components/tweet-composer'
import { TweetList } from '@/components/tweet-list'
import { WhoToFollow } from '@/components/ui/who-to-follow'
import { UserProfile } from '@/components/ui/user-profile'
import { NewsCarousel } from '@/components/ui/news-carousel'
import { TrendingTopics } from '@/components/ui/trending-topics'
import { useProfile } from '../../hook/user/usegetProfile'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { clearLS, getProfileFromLS, getRefreshTokenFromLS, handleError } from '../../utils/utils'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { pathUrl } from '../../constant/path'
import { useGetFriends } from '../../hook/friends/useGetFriends'
import ChatBoxReal from '@/components/chat/chat'
import { ChatContainer } from '@/components/ui/ChatContainer'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { useLogoutFormSchema } from '@/app/schemas/logout.schema'
import { useLogout } from '@/app/hook/auth/useLogout'
import { useFollowFriend } from '@/app/hook/friends/useFollowFriend'

export default function FormDashBoard() {
  // state
  const [isLogin, setIsLogin] = useState(false)
  // store local
  const { profile, addChat } = useStoreLocal()
  // useQuery
  const { data: friends } = useGetFriends()
  // hook
  const { mutateLogout, isPendingLogout } = useLogout()
  const { mutateFollowFriend, isPendingFollowFriend } = useFollowFriend()

  useEffect(() => {
    if (isLogin) {
      setIsLogin(false)
      redirect(pathUrl.login_register)
    }
  }, [isLogin])

  return (
    <div className='min-h-screen bg-gray-50  '>
      <Header profile={profile} mutateLogout={mutateLogout} isPendingLogout={isPendingLogout} />
      <div className='container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6'>
        <Sidebar className='hidden lg:block lg:w-1/4' />
        <main className='flex-grow max-w-2xl w-full mx-auto lg:mx-0'>
          <UserProfile profile={profile} />
          <TweetComposer />
          <NewsCarousel />
          <TweetList />
        </main>
        <aside className='hidden xl:block w-1/4 space-y-6'>
          <TrendingTopics />
          <WhoToFollow
            friends={friends?.data.result}
            addChat={addChat}
            mutateFollowFriend={mutateFollowFriend}
            isPendingFollowFriend={isPendingFollowFriend}
          />
        </aside>
        <ChatContainer />
      </div>
    </div>
  )
}
