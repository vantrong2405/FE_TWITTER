'use client'

import { type FormEvent, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getAccessTokenFromLS } from '@/app/utils/utils'
import socket from '@/app/utils/socket'
import { Button } from '@/components/ui/button'
import { Loader2, SendHorizontal, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import configProject from '@/app/config/configService'
import { User } from '@/app/types/user.i'
import { Icons } from '../ui/icon'
import Link from 'next/link'
import { pathUrl } from '@/app/constant/path'

const LIMIT = 20

type Message = {
  _id: string
  content: string
  sender_id: string
  receiver_id: string
  timestamp: Date
}

export default function ChatBox({ receiver, onClose }: { receiver: User; onClose: () => void }) {
  const { profile } = useStoreLocal()
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async (pageNum: number) => {
    if (loading || !receiver?._id) return

    setLoading(true)
    try {
      const response = await axios.get(`/conversations/receiver/${receiver._id}`, {
        baseURL: configProject.NEXT_PUBLIC_VITE_API_URL,
        headers: {
          Authorization: `Bearer ${getAccessTokenFromLS()}`
        },
        params: { limit: LIMIT, page: pageNum }
      })

      const { data: newMessages, total } = response.data
      setMessages((prev) => {
        const uniqueMessages = newMessages.filter(
          (newMsg: Message) => !prev.some((existingMsg) => existingMsg._id === newMsg._id)
        )
        const sortedMessages = [...prev, ...uniqueMessages].sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )

        if (pageNum === 1) {
          scrollToBottom()
          setTimeout(scrollToBottom, 300)
          setTimeout(scrollToBottom, 500)
        }

        return sortedMessages
      })
      setHasMore(newMessages.length === LIMIT)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching messages:', error)
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchMessages(nextPage)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim() || !profile?._id) return

    const newMessage = {
      content: value,
      sender_id: profile._id,
      receiver_id: receiver._id,
      timestamp: new Date()
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
    setTimeout(scrollToBottom, 100)
  }

  const scrollToBottom = () => {
    const scrollDiv = document.getElementById('scrollableDiv')
    if (scrollDiv) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          scrollDiv.scrollTop = scrollDiv.scrollHeight + 1000
        })
      }, 200)
    }
  }

  useEffect(() => {
    // Reset state when receiver changes
    setMessages([])
    setPage(1)
    setHasMore(true)

    // Fetch initial messages
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

  const CustomLoader = () => {
    if (messages.length === 0 || messages.length < LIMIT) {
      return null // Không hiện loading nếu không có tin nhắn hoặc ít hơn LIMIT
    }
    return (
      <div className='flex flex-col items-center justify-center py-8'>
        <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
        <p className='mt-2 text-sm text-gray-500'>Đang tải thêm tin nhắn...</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-[350px] h-[500px] rounded-lg shadow-xl overflow-hidden z-50 border bg-white dark:bg-black'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b'>
        <div className='flex items-center space-x-3'>
          <Link href={pathUrl.profile + receiver?.username}>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={receiver.avatar} alt={receiver.name || 'User'} />
              <AvatarFallback>{receiver.name?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <h3 className='font-semibold'>{receiver.name || 'Unknown User'}</h3>
            <p className='text-xs'>@{receiver.username || ''}</p>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          {/* Controls */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Video className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voice call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' onClick={onClose}>
                  <Icons.x className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Messages */}
      <div id='scrollableDiv' className='flex-1 overflow-auto p-4' style={{ display: 'flex', flexDirection: 'column' }}>
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
                  <p className='text-sm'>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className='p-4 border-t'>
        <div className='flex items-center gap-2'>
          <Input
            className='flex-1'
            placeholder='Type your message...'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type='submit' variant='outline'>
            <SendHorizontal className='h-5 w-5' />
          </Button>
        </div>
      </form>
    </div>
  )
}
