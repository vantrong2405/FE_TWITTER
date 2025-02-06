'use client'

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
import { TweetComposer } from '@/components/home/tweet-composer'
import { Tweet } from '@/app/types/tweet.i'
import { pagination } from '@/app/constant/query-config'
import { TweetDialog } from '@/components/home/tweet-dialog'
import { ContactsSidebar } from '@/components/home/contacts-slidebar'
import { motion } from 'framer-motion'
import { useStoreLocal } from '@/app/stores/useStoreLocal'
import { useGetSuggestFriends } from '@/app/hooks/friends/useGetSuggestFriend'
import { useGetFriends } from '@/app/hooks/friends/useGetFriends'
import { useGetMe } from '@/app/hooks/user/useGetMe'
import { useFollowFriend } from '@/app/hooks/friends/useFollowFriend'

export default function FormDashBoard() {
  // state
  const [isLogin, setIsLogin] = useState(false)
  const [newTweet, setNewTweet] = useState<Tweet>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)
  // store local
  const { addChat } = useStoreLocal()
  // useQuery
  const { data: suggestFriends } = useGetSuggestFriends(pagination.LIMIT, pagination.PAGE)
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6'
    >
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='hidden lg:block lg:w-1/4'
      >
        <div className='sticky top-20'>
          <Sidebar profile={profile} openDialog={openDialog} />
        </div>
      </motion.div>

      <motion.main
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className='flex-grow max-w-2xl w-full mx-auto lg:ml-1/4'
      >
        <UserProfile profile={profile} />
        <TweetComposer handleTweetCreated={handleTweetCreated} profile={profile} />
        <NewsCarousel />
        <TweetList newTweet={newTweet} />
      </motion.main>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className='hidden xl:block w-1/4'
      >
        <div className='sticky top-20 space-y-6 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
          <WhoToFollow
            suggestFriends={suggestFriends?.users || []}
            mutateFollowFriend={mutateFollowFriend}
            isPendingFollowFriend={isPendingFollowFriend}
          />
          <ContactsSidebar contacts={friends || []} addChat={addChat} />
        </div>
      </motion.div>

      <ChatContainer />
      <TweetDialog isOpen={isDialogOpen} onClose={closeDialog} onTweetCreated={handleTweetCreated} />
    </motion.div>
  )
}
