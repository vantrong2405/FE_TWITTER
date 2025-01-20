import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from './icon'
import { User } from '@/app/type/user.type'
import { formatDate, getFirstLetter } from '@/app/utils/utils'

export function UserProfile({ profile }: { profile: User }) {
  return (
    <Card className='mb-6 overflow-hidden'>
      <div className='h-32 bg-gradient-to-r from-blue-400 to-purple-500'></div>
      <CardHeader className='relative'>
        <Avatar className='absolute -top-16 left-4 h-32 w-32 border-4 border-white '>
          <AvatarImage
            src='https://png.pngtree.com/png-vector/20190811/ourlarge/pngtree-baby-animal-cute-panda-smile-png-image_1687512.jpg'
            alt='@johndoe'
          />
          <AvatarFallback>{getFirstLetter(profile?.name ?? '')}</AvatarFallback>
        </Avatar>
        <div className='flex justify-end'>
          <Button variant='outline'>Edit Profile</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-4'>
          <h2 className='text-2xl font-bold'>{profile?.name ?? ''}</h2>
          <p className='text-gray-500 '>@{profile?.username ?? ''}</p>
        </div>
        <p className='mb-4'>{profile?.bio ?? ''}</p>
        <div className='flex space-x-4 text-sm text-gray-500  mb-4'>
          <span className='flex items-center'>
            <Icons.mapPin className='mr-1 h-4 w-4' />
            {profile?.address ?? ''}
          </span>
          <span className='flex items-center'>
            <Icons.link className='mr-1 h-4 w-4' />
            <a href='#' className='hover:underline'>
              {profile?.website ?? ''}
            </a>
          </span>
          <span className='flex items-center'>
            <Icons.calendar className='mr-1 h-4 w-4' />
            {formatDate(profile?.date_of_birth ?? '')}
          </span>
        </div>
        <div className='flex space-x-4'>
          <span className='font-semibold'>
            1,234 <span className='font-normal text-gray-500 '>Following</span>
          </span>
          <span className='font-semibold'>
            5,678 <span className='font-normal text-gray-500 '>Followers</span>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
