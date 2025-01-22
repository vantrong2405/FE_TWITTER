'use client'
import friendApi from '@/app/apis/friend.api'
import { useFollowFriend } from '@/app/hook/friends/useFollowFriend'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { IFollowFriend } from '@/app/schemas/type.schema'
import { User } from '@/app/type/user.type'
import { getFirstLetter, handleError } from '@/app/utils/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { AxiosResponse } from 'axios'

export function WhoToFollow({
  friends,
  addChat,
  mutateFollowFriend,
  isPendingFollowFriend
}: {
  friends: User[]
  addChat: (user: User) => void
  mutateFollowFriend: UseMutateFunction<AxiosResponse<any, any>, Error, IFollowFriend, unknown>
  isPendingFollowFriend: boolean
}) {
  const handleSubmit = (followed_user_id: IFollowFriend) => {
    mutateFollowFriend(followed_user_id)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-4'>
          {friends &&
            friends.length > 0 &&
            friends.map((user) => (
              <li
                onClick={() => {
                  addChat(user)
                }}
                key={user._id}
                className='flex items-center justify-between'
              >
                <div className='flex items-center space-x-3'>
                  <Avatar>
                    <AvatarImage src={user?.avatar ?? ''} alt={user?.name ?? ''} />
                    <AvatarFallback>{getFirstLetter(user?.name ?? '')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{user?.name ?? ''}</p>
                    <p className='text-sm text-gray-500'>@{user?.username ?? ''}</p>
                  </div>
                </div>
                <Button variant='outline' size='sm' onClick={(event) => handleSubmit({ followed_user_id: user._id })}>
                  Follow
                </Button>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  )
}
