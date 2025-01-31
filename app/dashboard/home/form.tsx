'use client'

import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { TweetList } from '@/components/home/tweet-list'
import { WhoToFollow } from '@/components/home/who-to-follow'
import { UserProfile } from '@/components/home/user-profile'
import { NewsCarousel } from '@/components/ui/news-carousel'
import { TrendingTopics } from '@/components/home/trending-topics'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { pathUrl } from '../../constant/path'
import { ChatContainer } from '@/components/chat/ChatContainer'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { useFollowFriend } from '@/app/hook/friends/useFollowFriend'
import { useGetMe } from '@/app/hook/user/useGetMe'
import { useGetFriends } from '@/app/hook/friends/useGetFriends'
import { TweetComposer } from '@/components/home/tweet-composer'
import { Tweet } from '@/app/types/tweet.i'

export default function FormDashBoard() {
  // state
  const [isLogin, setIsLogin] = useState(false)
  const [newTweet, setNewTweet] = useState<Tweet>()
  // store local
  const { addChat } = useStoreLocal()
  // useQuery
  const { data: friends } = useGetFriends()
  // hook
  const { data: profile } = useGetMe()
  const { mutateFollowFriend, isPendingFollowFriend } = useFollowFriend()
  // useEffect
  useEffect(() => {
    if (isLogin) {
      setIsLogin(false)
      redirect(pathUrl.getStarted)
    }
  }, [isLogin])

  const handleTweetCreated = (tweet: Tweet) => {
    setNewTweet(tweet)
  }

  return (
    <div className='container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6'>
      <div className='hidden lg:block lg:w-1/4'>
        <div className='sticky top-20'>
          <Sidebar profile={profile} />
        </div>
      </div>
      <main className='flex-grow max-w-2xl w-full mx-auto lg:ml-1/4'>
        <UserProfile profile={profile} />
        <TweetComposer handleTweetCreated={handleTweetCreated} profile={profile} />
        <NewsCarousel />
        <TweetList newTweet={newTweet} />
      </main>
      <div className='hidden xl:block w-1/4'>
        <div className='sticky top-20 space-y-6'>
          <TrendingTopics />
          <WhoToFollow
            friends={friends?.data?.result}
            addChat={addChat}
            mutateFollowFriend={mutateFollowFriend}
            isPendingFollowFriend={isPendingFollowFriend}
          />
        </div>
      </div>
      <ChatContainer />
    </div>
  )
}
