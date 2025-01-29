'use client'

import { type FormEvent, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getAccessTokenFromLS } from '@/app/utils/utils'
import socket from '@/app/utils/socket'
import { Button } from '@/components/ui/button'
import { SendHorizontal, X, MoreVertical, Phone, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { User } from '@/app/type/user.type'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import configProject from '@/app/config/configService'

const LIMIT = 10
const PAGE = 1

type ChatBoxProps = {
  receiver: User
  onClose: () => void
}

export default function ChatBox({ receiver, onClose }: ChatBoxProps) {
  const { profile } = useStoreLocal()
  const accessToken = getAccessTokenFromLS()
  const [value, setValue] = useState('')
  const [conversations, setConversations] = useState<
    { _id: string; content: string; sender_id: string; receiver_id: string; timestamp: Date }[]
  >([])
  const [pagination, setPagination] = useState({ page: PAGE, total_page: 0 })
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const relevantMessages = conversations.filter(
    (message) =>
      (message.sender_id === profile?._id && message.receiver_id === receiver._id) ||
      (message.sender_id === receiver._id && message.receiver_id === profile?._id)
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return

    const conversation = {
      content: value,
      sender_id: profile?._id ?? '',
      receiver_id: receiver?._id ?? '',
      timestamp: new Date()
    }

    socket.emit('send_message', { payload: conversation })

    setConversations((prev) => [
      {
        ...conversation,
        _id: new Date().getTime().toString()
      },
      ...prev
    ])

    setValue('')
  }

  useEffect(() => {
    if (!accessToken) {
      console.error('Access token is missing')
      return
    }

    socket.auth = {
      Authorization: `Bearer ${accessToken}`
    }

    socket.connect()

    socket.on('receive_message', (data) => {
      const { payload } = data

      if (
        (payload.sender_id === profile?._id && payload.receiver_id === receiver?._id) ||
        (payload.sender_id === receiver._id && payload.receiver_id === profile?._id)
      ) {
        setConversations((prev) => [payload, ...prev])
      }
    })

    socket.on('connect_error', (err) => {
      console.error(err || 'Socket connection error')
    })

    return () => {
      socket.disconnect()
    }
  }, [accessToken, receiver])

  useEffect(() => {
    if (receiver?._id) {
      axios
        .get(`/conversations/receiver/${receiver._id}`, {
          baseURL: configProject.NEXT_PUBLIC_VITE_API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          params: { limit: LIMIT, page: PAGE }
        })
        .then((response) => {
          const { data: conversations, page, total } = response.data
          setConversations(conversations)
          setPagination({ page, total_page: total })
        })
        .catch((error) => {
          console.error('Error fetching conversations:', error)
        })
    }
  }, [receiver])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [conversations])

  return (
    <div className='flex flex-col w-[350px] h-[500px]  rounded-lg shadow-xl overflow-hidden z-50 border bg-white dark:bg-black'>
      {/* Header */}
      <div className='flex items-center justify-between p-4  border-b'>
        <div className='flex items-center space-x-3'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={receiver.avatar} alt={receiver.name || 'User'} />
            <AvatarFallback>{receiver.name?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-semibold '>{receiver.name || 'Unknown User'}</h3>
            <p className='text-xs '>@{receiver.username || ''}</p>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' className=''>
                  <Phone className='h-5 w-5' />
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
                <Button variant='ghost' size='icon' className=''>
                  <Video className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Video call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' className=''>
                  <MoreVertical className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More options</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant='ghost' size='icon' className='' onClick={onClose}>
                  <X className='h-5 w-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Chat content */}
      <ScrollArea className='flex-1 p-4' ref={scrollAreaRef}>
        <div className='space-y-4'>
          {relevantMessages.map((message, index) => (
            <div key={index} className={`flex ${message.sender_id === profile?._id ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.sender_id === profile?._id ? 'bg-blue-500' : ' text-gray-900'
                }`}
              >
                <p className='text-sm'>{message.content}</p>
                <p className='text-xs mt-1 opacity-70'>
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className='flex items-center p-4  border-t'>
        <Input
          className='flex-1 '
          placeholder='Type your message...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className='ml-2' type='submit' variant={'outline'}>
          <SendHorizontal className='h-5 w-5' />
        </Button>
      </form>
    </div>
  )
}
