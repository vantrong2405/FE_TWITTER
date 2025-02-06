'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { TweetDialog } from './tweet-dialog'
import { Tweet } from '@/app/types/tweet.i'
import { User } from '@/app/types/user.i'
import { getFirstLetter } from '@/app/utils/utils'

export function TweetComposer({
  handleTweetCreated,
  profile
}: {
  handleTweetCreated: (tweet: Tweet) => void
  profile: User | null
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return (
    <Card className='mb-6 border-none shadow-lg'>
      <CardContent className='p-6'>
        <div className='flex space-x-4'>
          <Avatar className='w-12 h-12 border-2 border-blue-400'>
            {profile?.avatar ? (
              <AvatarImage src={profile?.avatar ?? ''} alt={profile?.name || '@johndoe'} />
            ) : (
              <AvatarFallback>{getFirstLetter(profile?.name ?? 'Anonymous')}</AvatarFallback>
            )}
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
        <TweetDialog isOpen={isDialogOpen} onClose={closeDialog} onTweetCreated={handleTweetCreated} />
      </CardContent>
    </Card>
  )
}
