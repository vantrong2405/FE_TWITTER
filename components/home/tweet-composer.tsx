'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { TweetDialog } from './tweet-dialog'

export function TweetComposer() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return (
    <Card className='mb-6 border-none shadow-lg'>
      <CardContent className='p-6'>
        <div className='flex space-x-4'>
          <Avatar className='w-12 h-12 border-2 border-blue-400'>
            <AvatarImage
              src='https://png.pngtree.com/png-vector/20190811/ourlarge/pngtree-baby-animal-cute-panda-smile-png-image_1687512.jpg'
              alt='@username'
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className='flex-grow'>
            <Textarea
              placeholder="What's happening?"
              classNameTextarea='min-h-[100px] cursor-pointer bg-transparent rounded-md'
              onClick={openDialog}
              readOnly
            />
          </div>
        </div>
        <TweetDialog isOpen={isDialogOpen} onClose={closeDialog} />
      </CardContent>
    </Card>
  )
}
