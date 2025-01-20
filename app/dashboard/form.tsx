'use client'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { TweetComposer } from '@/components/tweet-composer'
import { TweetList } from '@/components/tweet-list'
import { WhoToFollow } from '@/components/ui/who-to-follow'
import { UserProfile } from '@/components/ui/user-profile'
import { NewsCarousel } from '@/components/ui/news-carousel'
import { TrendingTopics } from '@/components/ui/trending-topics'
import { useProfile } from '../hook/useProfile'
import { useMutation } from '@tanstack/react-query'
import authApi from '../apis/auth.api'
import { clearLS, getRefreshTokenFromLS, handleError } from '../utils/utils'
import { TypeFormLogout } from '../schemas/type.schema'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { pathUrl } from '../constant/path'
import { useGetFriends } from '../hook/useGetFriends'
import ChatBoxReal from '@/components/ui/chat'

export default function FormDashBoard() {
  const { data: profile } = useProfile()
  const { data: friends } = useGetFriends()
  console.log('🚀 ~ FormDashBoard ~ friends:', friends)
  const [isLogin, setIsLogin] = useState(false)
  const { handleSubmit, setError } = useForm<TypeFormLogout>()

  const logoutAccountMutation = useMutation({
    mutationFn: (body: TypeFormLogout) => {
      const refresh_token = getRefreshTokenFromLS() || ''
      const data = { ...body, refresh_token }
      return authApi.logoutAccount(data)
    }
  })

  const onSubmit = handleSubmit((data) => {
    logoutAccountMutation.mutate(data, {
      onSuccess: (data) => {
        clearLS()
        setIsLogin(true)
      },
      onError: (error) => handleError(error, setError, {} as TypeFormLogout)
    })
  })

  useEffect(() => {
    if (isLogin) {
      setIsLogin(false)
      redirect(pathUrl.home)
    }
  }, [isLogin])

  return (
    <div className='min-h-screen bg-gray-50 '>
      <Header profile={profile?.data.result} handleLogout={onSubmit} />
      <div className='container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6'>
        <Sidebar className='hidden lg:block lg:w-1/4' />
        <main className='flex-grow max-w-2xl w-full mx-auto lg:mx-0'>
          <UserProfile profile={profile?.data.result} />
          <TweetComposer />
          <NewsCarousel />
          <TweetList />
        </main>
        <aside className='hidden xl:block w-1/4 space-y-6'>
          <TrendingTopics />
          <WhoToFollow friends={friends?.data.result} />
        </aside>
        <ChatBoxReal />
      </div>
    </div>
  )
}
