'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChangePasswordDialog } from './dialog'
import { Icons } from '@/components/ui/icon'
import { useParams } from 'next/navigation'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { EditProfileDialog } from '../../home/dialog'
import { getFirstLetter, validateUrl } from '@/app/utils/utils'
import { useGetProfile } from '@/app/hook/user/usegetProfile'
import { EditImageDialog } from './EditImageDialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useUpdateProfile } from '@/app/hook/user/useUpdateProfile'

export default function ProfilePage() {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { username } = useParams()
  const { addChat, profile } = useStoreLocal()
  const { data: currentUser, isLoading } = useGetProfile(username as string)
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
  const [isCoverDialogOpen, setIsCoverDialogOpen] = useState(false)
  const { mutateUpdateProfile, isPendingUpdateProfile } = useUpdateProfile()
  const [isTab, setIsTab] = useState<'url' | 'upload'>('upload')
  const handleAvatarSave = async (imageFile: File | null, imageUrl: string) => {
    try {
      if (isTab === 'upload' && imageFile) {
        mutateUpdateProfile({ avatar: imageUrl })
      } else if (isTab === 'url' && imageUrl) {
        mutateUpdateProfile({ avatar: imageUrl })
      } else {
        console.warn('No valid image selected.')
        return
      }

      console.log('Updating avatar with:', isTab, imageUrl)
    } catch (error) {
      console.error('Failed to update avatar:', error)
    }
  }

  const handleCoverSave = async (imageFile: File | null, imageUrl: string) => {
    try {
      if (isTab === 'upload' && imageFile) {
        mutateUpdateProfile({ cover_photo: imageUrl })
      } else if (isTab === 'url' && imageUrl) {
        imageUrl = imageUrl
        mutateUpdateProfile({ cover_photo: imageUrl })
      } else {
        console.warn('No valid cover photo selected.')
        return
      }

      console.log('Updating cover photo with:', isTab, imageUrl)
    } catch (error) {
      console.error('Failed to update cover photo:', error)
    }
  }

  const isOwner = profile?.username === currentUser?.username

  return (
    <div className='container mx-auto p-4'>
      <Card className='w-full overflow-hidden'>
        <CardContent className='p-0'>
          {/* Cover Photo */}
          <div className='relative h-48 sm:h-64 overflow-hidden'>
            {isLoading ? (
              <Skeleton className='h-full w-full' />
            ) : (
              <Image
                fill
                src={validateUrl(
                  currentUser?.cover_photo ||
                    'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                )}
                alt='Profile cover'
                className='object-cover'
                priority
              />
            )}
            {isOwner && (
              <Button
                size='icon'
                variant='secondary'
                className='absolute top-4 right-4 rounded-full'
                onClick={() => setIsCoverDialogOpen(true)}
              >
                <Icons.camera className='h-4 w-4' />
              </Button>
            )}
          </div>
          {/* Profile Info */}
          <div className='px-4 pb-4 pt-16 sm:px-6 sm:pb-6'>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
              {/* Avatar and Details */}
              <div className='flex flex-col items-center sm:items-start mb-4 sm:mb-0'>
                <div className='relative -mt-24 mb-4'>
                  {isLoading ? (
                    <Skeleton className='w-32 h-32 rounded-full' />
                  ) : (
                    <Avatar className='w-32 h-32 border-4 border-background'>
                      {currentUser?.avatar ? (
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name || '@johndoe'} />
                      ) : (
                        <AvatarFallback>{getFirstLetter(currentUser?.name ?? 'Anonymous')}</AvatarFallback>
                      )}
                    </Avatar>
                  )}
                  {isOwner && (
                    <Button
                      size='icon'
                      variant='secondary'
                      className='absolute bottom-0 right-0 rounded-full'
                      onClick={() => setIsAvatarDialogOpen(true)}
                    >
                      <Icons.pencil className='h-4 w-4' />
                    </Button>
                  )}
                </div>
                {isLoading ? (
                  <div className='space-y-2'>
                    <Skeleton className='h-8 w-40' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                ) : (
                  <>
                    <h1 className='text-2xl font-bold'>{currentUser?.name ?? 'Unknown User'}</h1>
                    <p className='text-muted-foreground'>@{currentUser?.username ?? 'unknown'}</p>
                  </>
                )}
              </div>
              {/* Buttons */}
              <div className='flex flex-wrap justify-center sm:justify-end gap-2'>
                {!isOwner ? (
                  <>
                    <Button variant='outline' onClick={() => addChat(currentUser)}>
                      <Icons.messageCircle className='mr-2 h-4 w-4' />
                      Message
                    </Button>
                    <Button variant='primary'>
                      <Icons.userPlus className='mr-2 h-4 w-4' />
                      Follow
                    </Button>
                  </>
                ) : (
                  <Fragment>
                    <Button variant='outline' onClick={() => setIsEditDialogOpen(true)} className='mt-4 md:mt-0'>
                      Edit Profile
                    </Button>
                    <Button variant='secondary' onClick={() => setIsPasswordDialogOpen(true)}>
                      <Icons.lock className='mr-2 h-4 w-4' />
                      Change Password
                    </Button>
                  </Fragment>
                )}
              </div>
            </div>
            {/* Additional Info */}
            {isLoading ? (
              <div className='mt-4 space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </div>
            ) : (
              <>
                <div className='mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground'>
                  <div className='flex items-center'>
                    <Icons.mapPin className='mr-1 h-4 w-4' />
                    {currentUser?.location ?? 'Unknown Location'}
                  </div>
                  {currentUser?.website && (
                    <div className='flex items-center'>
                      <Icons.link className='mr-1 h-4 w-4' />
                      <a
                        href={currentUser.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:underline'
                      >
                        {currentUser.website}
                      </a>
                    </div>
                  )}
                  <div className='flex items-center'>
                    <Icons.calendarDays className='mr-1 h-4 w-4' />
                    Joined {new Date(currentUser?.createdAt ?? '').toLocaleDateString() ?? 'Unknown Date'}
                  </div>
                </div>
                <p className='mt-4'>{currentUser?.bio ?? 'No bio available.'}</p>
                <div className='mt-4 flex space-x-2'>
                  <Badge variant='secondary'>
                    <Icons.user className='mr-1 h-4 w-4' />
                    {currentUser?.twitter_circles?.length ?? 0} followers
                  </Badge>
                  <Badge variant='secondary'>500 following</Badge>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue='posts' className='mt-6'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='posts'>Posts</TabsTrigger>
          <TabsTrigger value='media'>Media</TabsTrigger>
          <TabsTrigger value='likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent value='posts' className='mt-6 space-y-4'>
          {/* Sample Posts */}
          {[1, 2, 3].map((post) => (
            <Card key={post}>
              <CardContent className='pt-6'>
                <div className='flex items-start space-x-4'>
                  <Avatar>
                    <AvatarImage
                      src='https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                      alt='@janedoe'
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-semibold'>{currentUser?.name ?? 'Unknown User'}</h3>
                      <p className='text-sm text-muted-foreground'>1h ago</p>
                    </div>
                    <p className='mt-2 text-muted-foreground'>This is a sample post. Add actual post content here.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        {/* Media */}
        <TabsContent value='media' className='mt-6'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((media) => (
              <div key={media} className='aspect-square relative rounded-md overflow-hidden'>
                <Image
                  fill
                  src={`https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg?text=Media ${media}`}
                  alt={`Media ${media}`}
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        </TabsContent>
        {/* Likes */}
        <TabsContent value='likes' className='mt-6'>
          <div className='grid gap-4'>
            {[1, 2, 3].map((like) => (
              <Card key={like}>
                <CardContent>
                  <p>User {like} liked your post!</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ChangePasswordDialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen} />
      <EditProfileDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} user={currentUser} />
      <EditImageDialog
        isOpen={isAvatarDialogOpen}
        onClose={() => setIsAvatarDialogOpen(false)}
        onSave={handleAvatarSave}
        title='Edit Avatar'
        currentImageUrl={currentUser?.avatar}
        setIsTab={setIsTab}
        isPendingUpdateProfile={isPendingUpdateProfile}
      />

      <EditImageDialog
        isOpen={isCoverDialogOpen}
        onClose={() => setIsCoverDialogOpen(false)}
        onSave={handleCoverSave}
        title='Edit Cover Photo'
        currentImageUrl={currentUser?.cover_photo}
        setIsTab={setIsTab}
        isPendingUpdateProfile={isPendingUpdateProfile}
      />
    </div>
  )
}
