import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const suggestedUsers = [
  { id: 1, name: 'Alice Johnson', handle: '@alice', avatar: '/placeholder-avatar.jpg' },
  { id: 2, name: 'Bob Williams', handle: '@bob', avatar: '/placeholder-avatar.jpg' },
  { id: 3, name: 'Carol Davis', handle: '@carol', avatar: '/placeholder-avatar.jpg' }
]

export function WhoToFollow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-4'>
          {suggestedUsers.map((user) => (
            <li key={user.id} className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{user.name}</p>
                  <p className='text-sm text-gray-500'>{user.handle}</p>
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
