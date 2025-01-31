'use client'

import { MessageBubble } from '@/components/chat/message-bubble'
import { TypingIndicator } from '@/components/chat/typing-indicator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Smile,
  Paperclip,
  Phone,
  Video,
  Info,
  Search,
  Settings,
  Plus,
  Users,
  Hash,
  Star,
  MessageSquare
} from 'lucide-react'

export default function EnhancedChat() {
  return (
    <div className='flex h-screen'>
      {/* Enhanced Sidebar */}
      <div className='w-64 border-r shadow-sm'>
        <div className='p-4'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
              Messages
            </h1>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Settings className='h-5 w-5' />
            </Button>
          </div>
          <div className='relative mb-4'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Search chats...' className='pl-8 rounded-full' />
          </div>
        </div>

        <ScrollArea className='h-[calc(100vh-8rem)]'>
          <div className='px-4 pb-4'>
            <div className='space-y-4'>
              <div>
                <h2 className='text-sm font-semibold text-muted-foreground mb-2 px-2'>Pinned</h2>
                <div className='space-y-1'>
                  {['Design Team', 'Marketing'].map((chat) => (
                    <Button key={chat} variant='ghost' className='w-full justify-start gap-2 rounded-lg'>
                      <Star className='h-4 w-4 text-yellow-500' />
                      {chat}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h2 className='text-sm font-semibold text-muted-foreground mb-2 px-2'>Direct Messages</h2>
                <div className='space-y-1'>
                  {['Alice Smith', 'Bob Johnson', 'Carol Williams'].map((user, i) => (
                    <Button key={user} variant='ghost' className='w-full justify-start gap-2 rounded-lg'>
                      <Avatar className='h-6 w-6'>
                        <AvatarImage
                          src={`https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg`}
                        />
                        <AvatarFallback>{user.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      {user}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h2 className='text-sm font-semibold text-muted-foreground mb-2 px-2'>Channels</h2>
                <div className='space-y-1'>
                  {['general', 'random', 'ideas'].map((channel) => (
                    <Button key={channel} variant='ghost' className='w-full justify-start gap-2 rounded-lg'>
                      <Hash className='h-4 w-4' />
                      {channel}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className='flex flex-1 flex-col '>
        {/* Enhanced Header */}
        <header className='flex items-center justify-between border-b px-6 py-4  backdrop-blur-sm'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg' />
                <AvatarFallback>DT</AvatarFallback>
              </Avatar>
              <div>
                <h2 className='font-semibold'>Design Team</h2>
                <p className='text-xs text-muted-foreground'>32 members</p>
              </div>
            </div>
            <Separator orientation='vertical' className='h-6' />
            <Button variant='ghost' size='sm' className='gap-2'>
              <Users className='h-4 w-4' />
              Members
            </Button>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Phone className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Video className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Info className='h-5 w-5' />
            </Button>
          </div>
        </header>

        {/* Enhanced Messages Area */}
        <ScrollArea className='flex-1 p-6'>
          <div className='space-y-6'>
            <MessageBubble
              message="Hey team! I've just pushed the latest design updates to Figma. Could you please take a look?"
              timestamp='10:30 AM'
              avatar='https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg'
              name='Alice Smith'
              status='Design Lead'
              reactions={[
                { emoji: '👍', count: 3 },
                { emoji: '🚀', count: 2 }
              ]}
            />

            <MessageBubble
              message="Looks great! I especially love the new color palette you've chosen. Very modern and accessible."
              timestamp='10:32 AM'
              avatar='https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg'
              name='You'
              isUser={true}
              reactions={[{ emoji: '❤️', count: 1 }]}
            />

            <MessageBubble
              message="Thanks! I'll prepare the handoff documentation by EOD."
              timestamp='10:33 AM'
              avatar='https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg'
              name='Alice Smith'
            />

            <TypingIndicator />
          </div>
        </ScrollArea>

        {/* Enhanced Input Area */}
        <div className='border-t  backdrop-blur-sm p-4'>
          <Card className='flex items-center gap-2 p-2 shadow-sm'>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Plus className='h-5 w-5' />
            </Button>
            <Input
              className='rounded-full w-full border-0 bg-transparent focus-visible:ring-0'
              placeholder='Type a message...'
            />
            <div className='flex items-center gap-1'>
              <Button variant='ghost' size='icon' className='rounded-full'>
                <Paperclip className='h-5 w-5' />
              </Button>
              <Button variant='ghost' size='icon' className='rounded-full'>
                <Smile className='h-5 w-5' />
              </Button>
              <Button size='icon' className='rounded-full'>
                <MessageSquare className='h-5 w-5' />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
