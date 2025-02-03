'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '../ui/icon'
import type { User } from '@/app/types/user.i'
import { formatDate, getFirstLetter, validateUrl } from '@/app/utils/utils'
import { EditProfileDialog } from '@/app/dashboard/home/dialog'

export function UserProfile({ profile }: { profile: User | null }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  return (
    <>
      <Card className='mb-6 overflow-hidden shadow-lg'>
        <div className='relative h-64'>
          <Image
            src={validateUrl(
              profile?.cover_photo ||
                'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
            )}
            alt='Profile banner'
            fill
            className='transition-opacity duration-300 ease-in-out object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        </div>
        <CardContent className='relative px-6 pb-6'>
          <div className='flex flex-col md:flex-row md:items-end md:justify-between'>
            <div className='flex flex-col md:flex-row md:items-end'>
              <Avatar className='h-32 w-32 border-4 border-white shadow-lg -mt-16 md:-mt-20 md:mr-6'>
                {profile?.avatar ? (
                  <AvatarImage src={profile?.avatar ?? ''} alt={profile?.name || '@johndoe'} />
                ) : (
                  <AvatarFallback>{getFirstLetter(profile?.name ?? 'Anonymous')}</AvatarFallback>
                )}
              </Avatar>

              <div className='mt-4 md:mt-0'>
                <h2 className='text-3xl font-bold '>{profile?.name ?? ''}</h2>
                <p className=''>@{profile?.username ?? ''}</p>
              </div>
            </div>
          </div>
          <div>
            <p className='mt-6 '>{profile?.bio ?? ''}</p>
            <div className='mt-4 flex flex-wrap gap-4 text-sm'>
              <span className='flex items-center'>
                <Icons.mapPin className='mr-2 h-4 w-4' />
                {profile?.location ?? ''}
              </span>
              <span className='flex items-center'>
                <Icons.link className='mr-2 h-4 w-4' />
                <a href={profile?.website} className='hover:text-blue-500 hover:underline transition-colors'>
                  {profile?.website ?? ''}
                </a>
              </span>
              <span className='flex items-center'>
                <Icons.calendar className='mr-2 h-4 w-4' />
                {formatDate(profile?.date_of_birth ?? '')}
              </span>
            </div>
            <div className='mt-6 flex space-x-6'>
              <span className='font-semibold'>
                1,234 <span className='font-normal'>Following</span>
              </span>
              <span className='font-semibold'>
                5,678 <span className='font-normal'>Followers</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <EditProfileDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} user={profile} />
    </>
  )
}
