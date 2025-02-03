'use client'

import { pathUrl } from '@/app/constant/path'
import type { User } from '@/app/types/user.i'
import { getFirstLetter } from '@/app/utils/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import Link from 'next/link'

interface IFollowFriend {
  followed_user_id: string
}

export function WhoToFollow({
  suggestFriends,
  mutateFollowFriend,
  isPendingFollowFriend
}: {
  suggestFriends: User[]
  mutateFollowFriend: UseMutateFunction<AxiosResponse<any, any>, Error, IFollowFriend, unknown>
  isPendingFollowFriend: boolean
}) {
  return (
    <Card className='h-[45.5vh] flex flex-col'>
      <CardHeader className='flex-shrink-0'>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 h-full min-h-0 pr-0 pl-0 pb-0 mb-0 mx-2'>
        <ScrollArea className='h-full'>
          <ul className='space-y-4 pr-4'>
            {suggestFriends &&
              suggestFriends.length > 0 &&
              suggestFriends.map((user) => (
                <li key={user._id} className='flex items-center justify-between py-2'>
                  <Link href={pathUrl.profile + user?.username} passHref>
                    <Button variant='ghost' className='flex items-center text-left space-x-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={user?.avatar ?? ''} alt={user?.name ?? ''} />
                        <AvatarFallback>{getFirstLetter(user?.name ?? '')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='font-medium text-sm'>{user?.name ?? ''}</p>
                        <p className='text-sm text-gray-500'>@{user?.username ?? ''}</p>
                      </div>
                    </Button>
                  </Link>

                  <Button
                    disabled={isPendingFollowFriend}
                    variant='outline'
                    size='sm'
                    onClick={(event) => {
                      event.preventDefault()
                      mutateFollowFriend({ followed_user_id: user._id })
                    }}
                  >
                    {isPendingFollowFriend ? 'Following...' : 'Follow'}
                  </Button>
                </li>
              ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
