'use client'

import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getAccessTokenFromLS, getProfileFromLS } from '@/app/utils/utils'
import socket from '@/app/utils/socket'
import { Button } from './button'
import { SendHorizontal } from 'lucide-react'
import { Input } from './input'
import { User } from '@/app/type/user.type'

const LIMIT = 10
const PAGE = 1

type ChatBoxProps = {
  receiver: User
  onClose: () => void
}

export default function ChatBoxReal({ receiver, onClose }: ChatBoxProps) {
  const profile = getProfileFromLS() // Lấy thông tin người dùng hiện tại
  const accessToken = getAccessTokenFromLS() // Lấy access token
  const [value, setValue] = useState('')
  const [conversations, setConversations] = useState<
    { _id: string; content: string; sender_id: string; receiver_id: string }[]
  >([])
  const [pagination, setPagination] = useState({ page: PAGE, total_page: 0 })

  // Lọc tin nhắn liên quan đến người dùng hiện tại và người nhận
  const relevantMessages = conversations.filter(
    (message) =>
      (message.sender_id === profile?._id && message.receiver_id === receiver._id) ||
      (message.sender_id === receiver._id && message.receiver_id === profile?._id)
  )

  // Gửi tin nhắn
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return

    const conversation = {
      content: value,
      sender_id: profile?._id ?? '',
      receiver_id: receiver?._id ?? ''
    }

    socket.emit('send_message', { payload: conversation })

    setConversations((prev) => [
      {
        ...conversation,
        _id: new Date().getTime().toString() // ID tạm để hiển thị ngay
      },
      ...prev
    ])

    setValue('')
  }

  // Kết nối socket và xử lý sự kiện
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

  // Lấy danh sách tin nhắn từ API khi receiver thay đổi
  useEffect(() => {
    if (receiver?._id) {
      axios
        .get(`/conversations/receiver/${receiver._id}`, {
          baseURL: process.env.VITE_API_URL,
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

  return (
    <div className='relative w-[330px] h-[440px] bg-white border rounded-xl shadow-md'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b'>
        <div className='flex items-center'>
          {receiver?.avatar ? (
            <img className='w-10 h-10 rounded-full' src={receiver.avatar} alt={receiver.name || 'User avatar'} />
          ) : (
            <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
              <span className='text-gray-500 text-sm font-bold'>{receiver?.name?.charAt(0).toUpperCase() || '?'}</span>
            </div>
          )}
          <div className='ml-4'>
            <p className='text-sm font-medium'>{receiver?.name || 'Unknown User'}</p>
            <p className='text-xs text-gray-500'>{receiver?.email || 'No email provided'}</p>
          </div>
        </div>
        <button onClick={onClose} className='text-gray-500 hover:text-red-500 focus:outline-none'>
          X
        </button>
      </div>

      {/* Nội dung chat */}
      <div className='flex-1 overflow-auto p-4'>
        {relevantMessages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${message.sender_id === profile?._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.sender_id === profile?._id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className='text-sm'>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className='flex items-center p-4 border-t'>
        <Input
          className='mr-2 flex-1'
          placeholder='Type your message...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className='ml-2 w-10 h-10' type='submit'>
          <SendHorizontal size={15} strokeWidth={2} />
        </Button>
      </form>
    </div>
  )
}
