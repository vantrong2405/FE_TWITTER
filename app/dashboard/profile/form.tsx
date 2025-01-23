'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChangePasswordDialog } from './dialog'
import { Icons } from '@/components/ui/icon'

export default function ProfilePage() {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)

  return (
    <div className='container mx-auto p-4'>
      <Card className='w-full'>
        <CardContent className='p-0'>
          <div className='relative h-48 sm:h-64 overflow-hidden rounded-t-lg'>
            <Image src='/placeholder.svg?height=256&width=1024' alt='Profile cover' className='object-cover' fill />
            <Button size='icon' variant='secondary' className='absolute top-4 right-4 rounded-full'>
              <Icons.camera className='h-4 w-4' />
            </Button>
          </div>
          <div className='px-4 pb-4 pt-16 sm:px-6 sm:pb-6'>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
              <div className='flex flex-col items-center sm:items-start mb-4 sm:mb-0'>
                <div className='relative -mt-24 mb-4'>
                  <Avatar className='w-32 h-32 border-4 border-background'>
                    <AvatarImage src='/placeholder.svg?height=128&width=128' alt='@janedoe' />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button size='icon' variant='secondary' className='absolute bottom-0 right-0 rounded-full'>
                    <Icons.pencil className='h-4 w-4' />
                  </Button>
                </div>
                <h1 className='text-2xl font-bold'>Jane Doe</h1>
                <p className='text-muted-foreground'>@janedoe</p>
              </div>
              <div className='flex flex-wrap justify-center sm:justify-end gap-2'>
                <Button variant='outline'>
                  <Icons.messageCircle className='mr-2 h-4 w-4' />
                  Message
                </Button>
                <Button>
                  <Icons.userPlus className='mr-2 h-4 w-4' />
                  Follow
                </Button>
                <Button variant='secondary' onClick={() => setIsPasswordDialogOpen(true)}>
                  <Icons.lock className='mr-2 h-4 w-4' />
                  Change Password
                </Button>
              </div>
            </div>
            <div className='mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center'>
                <Icons.mapPin className='mr-1 h-4 w-4' />
                New York, USA
              </div>
              <div className='flex items-center'>
                <Icons.linkIcon className='mr-1 h-4 w-4' />
                <a href='https://example.com' className='hover:underline'>
                  example.com
                </a>
              </div>
              <div className='flex items-center'>
                <Icons.calendarDays className='mr-1 h-4 w-4' />
                Joined March 2020
              </div>
            </div>
            <p className='mt-4'>
              Passionate designer and developer. Creating beautiful and functional web experiences. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className='mt-4 flex space-x-2'>
              <Badge variant='secondary'>
                <Icons.user className='mr-1 h-4 w-4' />
                1.5k followers
              </Badge>
              <Badge variant='secondary'>500 following</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue='posts' className='mt-6'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='posts'>Posts</TabsTrigger>
          <TabsTrigger value='media'>Media</TabsTrigger>
          <TabsTrigger value='likes'>Likes</TabsTrigger>
        </TabsList>
        <TabsContent value='posts' className='mt-6 space-y-4'>
          {[1, 2, 3].map((post) => (
            <Card key={post}>
              <CardContent className='pt-6'>
                <div className='flex items-start space-x-4'>
                  <Avatar>
                    <AvatarImage src='/placeholder.svg?height=40&width=40' alt='@janedoe' />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-semibold'>Jane Doe</h3>
                      <p className='text-sm text-muted-foreground'>1h ago</p>
                    </div>
                    <p className='mt-2 text-muted-foreground'>
                      This is a sample post content. It can be much longer and contain more details. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit.
                    </p>
                    <div className='mt-4 flex items-center space-x-4'>
                      <Button variant='ghost' size='sm'>
                        <Icons.messageCircle className='mr-2 h-4 w-4' />
                        Comment
                      </Button>
                      <Button variant='ghost' size='sm'>
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value='media' className='mt-6'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((media) => (
              <div key={media} className='aspect-square relative rounded-md overflow-hidden group'>
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Media ${media}`}
                  alt={`Media ${media}`}
                  fill
                  className='object-cover transition-transform group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center'>
                  <Button
                    variant='secondary'
                    className='opacity-0 group-hover:opacity-100 transition-opacity'
                    size='sm'
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value='likes' className='mt-6'>
          <div className='grid gap-4'>
            {[1, 2, 3].map((like) => (
              <Card key={like}>
                <CardContent className='pt-6'>
                  <div className='flex items-start space-x-4'>
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=User ${like}`} alt={`User ${like}`} />
                      <AvatarFallback>U{like}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className='font-semibold'>User {like}</h3>
                      <p className='text-sm text-muted-foreground'>Liked your post</p>
                      <p className='mt-2'>"Great content! Keep it up!"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ChangePasswordDialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen} />
    </div>
  )
}
