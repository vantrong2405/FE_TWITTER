'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Icons } from './ui/icon'

export function TweetComposer() {
  const [tweet, setTweet] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Tweet submitted:', tweet)
    setTweet('')
    setIsLoading(false)
  }

  return (
    <Card className='mb-6'>
      <CardContent className='p-4'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex space-x-4'>
            <Avatar>
              <AvatarImage
                src='https://png.pngtree.com/png-vector/20190811/ourlarge/pngtree-baby-animal-cute-panda-smile-png-image_1687512.jpg'
                alt='@username'
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's happening?"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              className='flex-grow min-h-[100px] text-lg resize-none'
              classNameTextarea={'min-h-[90px]'}
            />
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex space-x-2'>
              <Button type='button' size='sm' variant='outline'>
                <Icons.image className='h-5 w-5 text-blue-500' />
              </Button>
              <Button type='button' size='sm' variant='outline'>
                <Icons.smile className='h-5 w-5 text-blue-500' />
              </Button>
              <Button type='button' size='sm' variant='outline'>
                <Icons.mapPin className='h-5 w-5 text-blue-500' />
              </Button>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='text-sm text-gray-500'>{tweet.length}/280</div>
              <Button type='submit' disabled={tweet.trim().length === 0 || isLoading} variant='blueCol'>
                {isLoading ? (
                  <>
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                    Tweeting...
                  </>
                ) : (
                  'Tweet'
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
