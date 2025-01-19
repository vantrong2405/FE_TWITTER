'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Icons } from './ui/icon'

const initialTweets = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      handle: '@johndoe',
      avatar: '/placeholder-avatar.jpg'
    },
    content: 'Just launched my new portfolio website! Check it out at https://johndoe.com 🚀 #WebDev #Portfolio',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    replies: 3,
    retweets: 5,
    likes: 10
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      handle: '@janesmith',
      avatar: '/placeholder-avatar.jpg'
    },
    content:
      'Excited to start my new job as a Senior React Developer next week! Any tips for the first day? 😊 #NewJob #ReactJS',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    replies: 8,
    retweets: 2,
    likes: 15
  }
  // Add more tweets as needed
]

export function TweetList() {
  const [tweets, setTweets] = useState(initialTweets)

  const handleLike = (id: number) => {
    setTweets(tweets.map((tweet) => (tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet)))
  }

  const handleRetweet = (id: number) => {
    setTweets(tweets.map((tweet) => (tweet.id === id ? { ...tweet, retweets: tweet.retweets + 1 } : tweet)))
  }

  return (
    <div className='space-y-4'>
      {tweets.map((tweet) => (
        <Card key={tweet.id} className='hover:shadow-md transition-shadow duration-200'>
          <CardContent className='p-4'>
            <div className='flex space-x-4'>
              <Avatar>
                <AvatarImage src={tweet.user.avatar} alt={tweet.user.handle} />
                <AvatarFallback>{tweet.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className='flex-grow'>
                <div className='flex items-center space-x-2'>
                  <span className='font-bold hover:underline cursor-pointer'>{tweet.user.name}</span>
                  <span className='text-gray-500'>{tweet.user.handle}</span>
                  <span className='text-gray-500'>·</span>
                  <span className='text-gray-500 hover:underline cursor-pointer'>
                    {formatDistanceToNow(tweet.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className='mt-2 text-gray-900 dark:text-gray-100 whitespace-pre-wrap'>{tweet.content}</p>
                <div className='flex justify-between mt-4 text-gray-500'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900'
                  >
                    <Icons.messageCircle className='h-4 w-4 mr-1' />
                    {tweet.replies}
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900'
                    onClick={() => handleRetweet(tweet.id)}
                  >
                    <Icons.repeat className='h-4 w-4 mr-1' />
                    {tweet.retweets}
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900'
                    onClick={() => handleLike(tweet.id)}
                  >
                    <Icons.heart className='h-4 w-4 mr-1' />
                    {tweet.likes}
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900'
                  >
                    <Icons.share className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
