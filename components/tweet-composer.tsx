'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from './ui/icon'

export function TweetComposer() {
  const [tweet, setTweet] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tweet submitted:', tweet)
    setTweet('')
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4'>
      <div className='flex space-x-4'>
        <Avatar>
          <AvatarImage src='/placeholder-avatar.jpg' alt='@username' />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className='flex-grow'>
          <Textarea
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            className='w-full min-h-[100px] text-lg'
          />
          <div className='flex justify-between items-center mt-4'>
            <div className='flex space-x-2'>
              <Button type='button' size='sm' variant='ghost'>
                <Icons.image className='h-5 w-5 text-blue-500' />
              </Button>
              <Button type='button' size='sm' variant='ghost'>
                <Icons.smile className='h-5 w-5 text-blue-500' />
              </Button>
              <Button type='button' size='sm' variant='ghost'>
                <Icons.calendar className='h-5 w-5 text-blue-500' />
              </Button>
            </div>
            <Button type='submit' disabled={tweet.trim().length === 0}>
              Tweet
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
