'use client'

import { useState } from 'react'
import { useGetFriends } from '@/app/hooks/friends/useGetFriends'
import type { User } from '@/app/types/user.i'
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
import { AddMemberDialog } from '@/components/chat/add-member-dialog'

type ChatType = 'pinned' | 'direct' | 'channel'

export default function EnhancedChat() {
  const { data: friends } = useGetFriends()
  const [selectedChat, setSelectedChat] = useState<{ type: ChatType; name: string } | null>(null)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)

  const handleChatClick = (type: ChatType, name: string) => {
    setSelectedChat({ type, name })
  }

  const handleAddMember = () => {
    setIsAddMemberDialogOpen(true)
  }

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
                    <Button
                      key={chat}
                      variant='ghost'
                      className='w-full justify-start gap-2 rounded-lg'
                      onClick={() => handleChatClick('pinned', chat)}
                    >
                      <Star className='h-4 w-4 text-yellow-500' />
                      {chat}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h2 className='text-sm font-semibold text-muted-foreground mb-2 px-2'>Direct Messages</h2>
                <ScrollArea className='h-40'>
                  <div className='space-y-1'>
                    {friends &&
                      friends.length > 0 &&
                      friends.map((user: User) => (
                        <Button
                          key={user._id}
                          variant='ghost'
                          className='w-[calc(100%-10px)] justify-start gap-2 rounded-md pr-2'
                          onClick={() => user.name && handleChatClick('direct', user.name)}
                        >
                          <Avatar className='h-6 w-6'>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {user.name}
                        </Button>
                      ))}
                  </div>
                </ScrollArea>
              </div>
              <Separator />
              <div>
                <h2 className='text-sm font-semibold text-muted-foreground mb-2 px-2'>Channels</h2>
                <div className='space-y-1'>
                  {['general', 'random', 'ideas'].map((channel) => (
                    <Button
                      key={channel}
                      variant='ghost'
                      className='w-full justify-start gap-2 rounded-lg'
                      onClick={() => handleChatClick('channel', channel)}
                    >
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
      <div className='flex flex-1 flex-col'>
        {/* Enhanced Header */}
        <header className='flex items-center justify-between border-b px-6 py-4 backdrop-blur-sm'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg' />
                <AvatarFallback>{selectedChat?.name || 'Chat'}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className='font-semibold'>{selectedChat?.name || 'Select a chat'}</h2>
                <p className='text-xs text-muted-foreground'>
                  {selectedChat?.type === 'direct' ? 'Online' : selectedChat?.type === 'pinned' ? 'Team' : 'Channel'}
                </p>
              </div>
            </div>
            <Separator orientation='vertical' className='h-6' />
            <Button variant='ghost' size='sm' className='gap-2' onClick={handleAddMember}>
              <Users className='h-4 w-4' />
              {selectedChat?.type === 'pinned' ? 'Add Member' : 'Members'}
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
            {selectedChat ? (
              <MessageBubble
                message={`This is a ${selectedChat.type} chat: ${selectedChat.name}`}
                timestamp='Just now'
                avatar='https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?cs=srgb&dl=pexels-pixabay-47547.jpg&fm=jpg'
                name={selectedChat.name}
                isUser={false}
              />
            ) : (
              <p>Select a chat to start messaging</p>
            )}
            <TypingIndicator />
          </div>
        </ScrollArea>

        {/* Enhanced Input Area */}
        <div className='border-t backdrop-blur-sm p-4'>
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

      <AddMemberDialog
        isOpen={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        onAddMembers={(member) => {
          console.log('Member added:', member)
          setIsAddMemberDialogOpen(false)
        }}
      />
    </div>
  )
}
