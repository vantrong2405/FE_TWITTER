'use client'

import { type FormEvent, useEffect, useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getAccessTokenFromLS } from '@/app/utils/utils'
import socket from '@/app/utils/socket'
import { useGetFriends } from '@/app/hooks/friends/useGetFriends'
import { useStoreLocal } from '@/app/stores/useStoreLocal'
import { useFileHandling } from '@/app/hooks/chat/useFileHandling'
import { useMessages } from '@/app/hooks/chat/useMessages'
import { Message, MessageType } from '@/app/types/chat.i'
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
  MessageSquare,
  X,
  ImageIcon,
  SendHorizontal,
  Loader2,
  FileIcon
} from 'lucide-react'
import { AddMemberDialog } from '@/components/chat/add-member-dialog'
import { User } from '@/app/types/user.i'
import { pagination } from '@/app/constant/query-config'

type ChatType = 'pinned' | 'direct' | 'channel'

type SelectedChat = {
  type: ChatType
  name: string
  _id?: string
}

// Thêm interface cho receiver để truyền vào useMessages
interface ChatReceiver extends User {
  type?: ChatType
  name: string
}

export default function EnhancedChat() {
  const { data: friends } = useGetFriends()
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)

  const [receiver, setReceiver] = useState<User>({
    _id: '',
    roles: 'User',
    email: '',
    name: '',
    date_of_birth: '',
    avatar: '',
    address: '',
    phone: '',
    createdAt: '',
    updatedAt: '',
    bio: '',
    location: '',
    website: '',
    username: '',
    cover_photo: '',
    __v: 0,
    verify: 0,
    twitter_circles: []
  })
  const { profile } = useStoreLocal()

  const [value, setValue] = useState('')
  const scrollDivRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<MutationObserver | null>(null)

  const scrollToBottom = () => {
    if (scrollDivRef.current) {
      const scrollDiv = scrollDivRef.current
      scrollDiv.scrollTop = scrollDiv.scrollHeight + 1000
    }
  }

  const { messages, setMessages, hasMore, loading, loadMore, fetchMessages } = useMessages(receiver, scrollToBottom)

  const {
    filePreview,
    fileInputRef,
    videoInputRef,
    handleFileSelect,
    removeFilePreview,
    isUploadingImage,
    isUploadingVideo,
    uploadImage,
    uploadVideo
  } = useFileHandling()

  const isUploading = isUploadingImage || isUploadingVideo

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if ((!value.trim() && !filePreview) || !profile?._id) return

    try {
      let fileUrl = ''
      let fileType: MessageType = 'text'
      let fileName = ''
      let fileSize = 0

      if (filePreview) {
        let uploadResponse
        switch (filePreview.type) {
          case 'image':
            uploadResponse = await uploadImage(filePreview.file)
            break
          case 'video':
            uploadResponse = await uploadVideo(filePreview.file)
            break
          default:
            throw new Error('Unsupported file type')
        }
        fileUrl = uploadResponse.data.result[0].url
        fileType = filePreview.type
        fileName = filePreview.name
        fileSize = filePreview.size
      }

      const newMessage = {
        content: value.trim(),
        sender_id: profile._id,
        receiver_id: receiver._id,
        timestamp: new Date(),
        type: fileType,
        file_url: fileUrl,
        file_name: fileName,
        file_size: fileSize
      }

      socket.emit('send_message', { payload: newMessage })

      setMessages((prev) => [
        ...prev,
        {
          ...newMessage,
          _id: Date.now().toString()
        } as Message
      ])

      setValue('')
      removeFilePreview()
      setTimeout(scrollToBottom, 0)
      setTimeout(scrollToBottom, 100)
      setTimeout(scrollToBottom, 300)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  useEffect(() => {
    setMessages([])
    fetchMessages(1)
  }, [receiver._id])

  useEffect(() => {
    const accessToken = getAccessTokenFromLS()
    if (!accessToken) return

    socket.auth = {
      Authorization: `Bearer ${accessToken}`
    }
    socket.connect()

    socket.on('receive_message', (data) => {
      const { payload } = data
      if (
        (payload.sender_id === profile?._id && payload.receiver_id === receiver._id) ||
        (payload.sender_id === receiver._id && payload.receiver_id === profile?._id)
      ) {
        setMessages((prev) => [...prev, payload])
        setTimeout(scrollToBottom, 100)
      }
    })

    return () => {
      socket.off('receive_message')
      socket.disconnect()
    }
  }, [profile?._id, receiver._id])

  useEffect(() => {
    if (scrollDivRef.current) {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new MutationObserver((mutations) => {
        scrollToBottom()
      })

      observerRef.current.observe(scrollDivRef.current, {
        childList: true,
        subtree: true
      })
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const CustomLoader = () => {
    if (messages.length === 0 || messages.length < pagination.LIMIT) {
      return null
    }
    return (
      <div className='flex flex-col items-center justify-center py-8'>
        <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
        <p className='mt-2 text-sm text-gray-500'>Đang tải thêm tin nhắn...</p>
      </div>
    )
  }

  const renderFilePreview = () => {
    if (!filePreview) return null

    return (
      <div className='relative mb-2 inline-block'>
        {filePreview.type === 'image' && (
          <img src={filePreview.url} alt='Preview' className='h-20 w-20 object-cover rounded-lg' />
        )}
        {filePreview.type === 'video' && (
          <video src={filePreview.url} className='h-20 w-20 object-cover rounded-lg' controls />
        )}
        {filePreview.type === 'file' && (
          <div className='h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center'>
            <FileIcon className='h-8 w-8 text-gray-500' />
          </div>
        )}
        <div className='text-xs mt-1 text-gray-500'>{filePreview.name}</div>
        <button
          onClick={removeFilePreview}
          className='absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600'
          disabled={isUploading}
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    )
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
                <ScrollArea className='h-40'>
                  <div className='space-y-1'>
                    {friends &&
                      friends.length > 0 &&
                      friends.map((user: User) => (
                        <Button
                          key={user._id}
                          variant='ghost'
                          className='w-[calc(100%-10px)] justify-start gap-2 rounded-md pr-2'
                          onClick={() => setReceiver(user)}
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
            <Button variant='ghost' size='sm' className='gap-2'>
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

        {/* Messages Area với InfiniteScroll */}
        <div
          ref={scrollDivRef}
          id='scrollableDiv'
          className='flex-1 overflow-auto p-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <InfiniteScroll
            dataLength={messages.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<CustomLoader />}
            scrollableTarget='scrollableDiv'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div className='space-y-4 flex-grow'>
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${message.sender_id === profile?._id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.sender_id === profile?._id ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    {message.type === 'image' ? (
                      <img
                        src={message.file_url}
                        alt='Shared image'
                        className='max-w-[200px] rounded-lg cursor-pointer hover:opacity-90'
                        onClick={() => window.open(message.file_url, '_blank')}
                      />
                    ) : message.type === 'video' ? (
                      <video src={message.file_url} className='max-w-[200px] rounded-lg' controls />
                    ) : message.type === 'file' ? (
                      <div
                        className='flex items-center space-x-2 cursor-pointer hover:opacity-80'
                        onClick={() => window.open(message.file_url, '_blank')}
                      >
                        <FileIcon className='h-5 w-5' />
                        <div>
                          <div className='text-sm'>{message.file_name}</div>
                          <div className='text-xs opacity-70'>{(message.file_size! / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      </div>
                    ) : (
                      <p className='text-sm break-words'>{message.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>

        {/* Input Area với File Upload */}
        <div className='border-t backdrop-blur-sm p-4'>
          {filePreview && (
            <div className='relative mb-2 inline-block'>
              {filePreview.type === 'image' && (
                <img src={filePreview.url} alt='Preview' className='h-20 w-20 object-cover rounded-lg' />
              )}
              {filePreview.type === 'video' && (
                <video src={filePreview.url} className='h-20 w-20 object-cover rounded-lg' controls />
              )}
              <div className='text-xs mt-1 text-gray-500'>{filePreview.name}</div>
              <button
                onClick={removeFilePreview}
                className='absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600'
                disabled={isUploading}
              >
                <X className='h-4 w-4' />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => handleFileSelect(e, 'image')}
              ref={fileInputRef}
              disabled={isUploading}
            />
            <input
              type='file'
              accept='video/*'
              className='hidden'
              onChange={(e) => handleFileSelect(e, 'video')}
              ref={videoInputRef}
              disabled={isUploading}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <ImageIcon className='h-5 w-5' />
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => videoInputRef.current?.click()}
              disabled={isUploading}
            >
              <Video className='h-5 w-5' />
            </Button>
            <Input
              className='flex-1'
              placeholder={isUploading ? 'Uploading file...' : 'Type a message...'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={isUploading}
            />
            <Button type='submit' variant='outline' disabled={isUploading}>
              {isUploading ? <Loader2 className='h-5 w-5 animate-spin' /> : <SendHorizontal className='h-5 w-5' />}
            </Button>
          </form>
        </div>
      </div>

      <AddMemberDialog
        isOpen={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        onAddMembers={(member) => {
          setIsAddMemberDialogOpen(false)
        }}
      />
    </div>
  )
}
