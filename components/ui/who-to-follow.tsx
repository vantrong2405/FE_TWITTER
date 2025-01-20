import { useStoreLocal } from '@/app/hook/useStore'
import { User } from '@/app/type/user.type'
import { getFirstLetter } from '@/app/utils/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function WhoToFollow({ friends }: { friends: User[] }) {
  const { chat, setChat, setcurrentIdChatReceiver } = useStoreLocal()
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
                key={user._id}
                className='flex items-center justify-between'
                onClick={() => {
                  setChat()
                  setcurrentIdChatReceiver(user)
                }}
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
                <Button variant='outline' size='sm'>
                  Follow
                </Button>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  )
}
