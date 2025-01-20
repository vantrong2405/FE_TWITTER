'use client'
import { FormEvent, MouseEvent, SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getAccessTokenFromLS, getProfileFromLS } from '@/app/utils/utils'
import socket from '@/app/utils/socket'
import { Button } from './button'
import { SendHorizontal } from 'lucide-react'
import { Input } from './input'
import { useStoreLocal } from '@/app/hook/useStore'

const LIMIT = 10
const PAGE = 1
export default function ChatBoxReal() {
  const profile = getProfileFromLS() // Lấy thông tin người dùng hiện tại
  const accessToken = getAccessTokenFromLS() // Lấy access token
  const { currentIdChatReceiver } = useStoreLocal() // Thông tin người nhận
  const [value, setValue] = useState('')
  const [conversations, setConversations] = useState<
    { _id: string; content: string; sender_id: string; receiver_id: string }[]
  >([])
  const [receiver, setReceiver] = useState(currentIdChatReceiver?._id ?? '') // ID của người nhận
  const [pagination, setPagination] = useState({ page: PAGE, total_page: 0 })

  const relevantMessages = conversations.filter(
    (message) =>
      (message.sender_id === profile?._id && message.receiver_id === receiver) ||
      (message.sender_id === receiver && message.receiver_id === profile?._id)
  )

  // Handle gửi tin nhắn
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!value.trim()) return

    const conversation = {
      content: value,
      sender_id: profile?._id ?? '',
      receiver_id: receiver
    }

    console.log('🚀 ~ handleSubmit ~ conversation:', conversation)

    socket.emit('send_message', { payload: conversation })

    setConversations((prev) => [
      {
        ...conversation,
        _id: new Date().getTime().toString() // ID tạm để render ngay
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

    console.log('Connecting to socket server')

    socket.auth = {
      Authorization: `Bearer ${accessToken}`
    }

    socket.connect()

    socket.on('receive_message', (data) => {
      const { payload } = data

      if (
        (payload.sender_id === profile?._id && payload.receiver_id === receiver) ||
        (payload.sender_id === receiver && payload.receiver_id === profile?._id)
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

  // Lấy danh sách tin nhắn ban đầu khi receiver thay đổi
  useEffect(() => {
    if (receiver) {
      axios
        .get(`/conversations/receiver/${receiver}`, {
          baseURL: process.env.VITE_API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          params: { limit: LIMIT, page: PAGE }
        })
        .then((response) => {
          const { data: conversations, page, total } = response.data

          setConversations(conversations)
          setPagination({
            page,
            total_page: total
          })
        })
        .catch((error) => {
          console.error('Error fetching conversations:', error)
        })
    }
  }, [receiver])

  // Lấy thêm tin nhắn khi cuộn
  const fetchMoreConversations = () => {
    if (receiver && pagination.page < pagination.total_page) {
      axios
        .get(`/conversations/receiver/${receiver}`, {
          baseURL: process.env.VITE_API_URL,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          params: { limit: LIMIT, page: pagination.page + 1 }
        })
        .then((response) => {
          const { data: newConversations, page, total } = response.data

          setConversations((prev) => [...prev, ...newConversations]) // Thêm tin nhắn mới vào danh sách
          setPagination({
            page,
            total_page: total
          })
        })
        .catch((error) => {
          console.error('Error fetching more conversations:', error)
        })
    }
  }

  // Cập nhật receiver khi currentIdChatReceiver thay đổi
  useEffect(() => {
    if (currentIdChatReceiver?._id && currentIdChatReceiver._id !== receiver) {
      setReceiver(currentIdChatReceiver._id) // Cập nhật ID người nhận
      setConversations([]) // Xóa tin nhắn cũ
    }
  }, [currentIdChatReceiver])
  return (
    <div className='fixed bottom-0 right-3 mt-5 h-[440px] w-[330px] justify-between rounded-2xl border bg-card text-card-foreground shadow-sm'>
      {/* Header */}
      <div className='flex flex-row items-center space-y-1.5 p-6'>
        <div className='flex items-center space-x-4'>
          <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
            <img
              src='https://png.pngtree.com/png-vector/20190811/ourlarge/pngtree-baby-animal-cute-panda-smile-png-image_1687512.jpg'
              alt=''
            />
          </span>
          <div>
            <p className='text-sm font-medium leading-none'>{currentIdChatReceiver?.name ?? ''}</p>
            <p className='text-sm text-muted-foreground'>{currentIdChatReceiver.email}</p>
            <p className='text-sm text-muted-foreground'>{currentIdChatReceiver._id}</p>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className='h-[64%] p-6 pt-0'>
        <div
          id='scrollableDiv'
          style={{
            height: '100%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse'
          }}
        >
          <InfiniteScroll
            dataLength={conversations.length}
            next={fetchMoreConversations}
            style={{
              display: 'flex',
              flexDirection: 'column-reverse'
            }}
            inverse={true}
            hasMore={pagination.page < pagination.total_page}
            loader={<h4>Loading...</h4>}
            scrollableTarget='scrollableDiv'
          >
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
          </InfiniteScroll>
        </div>
      </div>

      {/* Input Box */}
      <div className='mb-2 mt-1 flex items-center p-6 pt-0'>
        <Input
          className='mr-2 h-10 rounded-xl'
          placeholder='Type your message...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          className='ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-orange-500 text-sm font-medium outline-gray-600 hover:bg-orange-500/90'
          onClick={(e) => handleSubmit(e)}
        >
          <SendHorizontal size={15} strokeWidth={2} />
        </Button>
      </div>
    </div>
  )
}
