import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from './icon'

export function UserProfile() {
  return (
    <Card className='mb-6 overflow-hidden'>
      <div className='h-32 bg-gradient-to-r from-blue-400 to-purple-500'></div>
      <CardHeader className='relative'>
        <Avatar className='absolute -top-16 left-4 h-32 w-32 border-4 border-white dark:border-gray-800'>
          <AvatarImage src='/placeholder-avatar.jpg' alt='@johndoe' />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className='flex justify-end'>
          <Button variant='outline'>Edit Profile</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-4'>
          <h2 className='text-2xl font-bold'>John Doe</h2>
          <p className='text-gray-500 dark:text-gray-400'>@johndoe</p>
        </div>
        <p className='mb-4'>Web developer, coffee enthusiast, and aspiring Twitter clone creator.</p>
        <div className='flex space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4'>
          <span className='flex items-center'>
            <Icons.mapPin className='mr-1 h-4 w-4' />
            New York, USA
          </span>
          <span className='flex items-center'>
            <Icons.link className='mr-1 h-4 w-4' />
            <a href='#' className='hover:underline'>
              johndoe.com
            </a>
          </span>
          <span className='flex items-center'>
            <Icons.calendar className='mr-1 h-4 w-4' />
            Joined June 2023
          </span>
        </div>
        <div className='flex space-x-4'>
          <span className='font-semibold'>
            1,234 <span className='font-normal text-gray-500 dark:text-gray-400'>Following</span>
          </span>
          <span className='font-semibold'>
            5,678 <span className='font-normal text-gray-500 dark:text-gray-400'>Followers</span>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
