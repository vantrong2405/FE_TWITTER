'use client'

import { type FormEvent, useEffect, useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getAccessTokenFromLS } from '@/app/utils/utils'
import socket from '@/app/utils/socket'
import { Button } from '@/components/ui/button'
import { Loader2, SendHorizontal, Video, Image as ImageIcon, FileIcon, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { User } from '@/app/types/user.i'
import { ChatHeader } from './ChatHeader'
import { useStoreLocal } from '@/app/stores/useStoreLocal'
import { useFileHandling } from '@/app/hooks/chat/useFileHandling'
import { pagination } from '@/app/constant/query-config'
import { useMessages } from '@/app/hooks/chat/useMessages'
import { Message, MessageType } from '@/app/types/message.i'

export default function ChatBox({ receiver, onClose }: { receiver: User; onClose: () => void }) {
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
    <div className='flex flex-col w-[350px] h-[500px] rounded-lg shadow-xl overflow-hidden z-50 border bg-white dark:bg-black'>
      <ChatHeader receiver={receiver} onClose={onClose} />
      {/* Messages */}
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

      {/* Input with file upload */}
      <div className='p-4 border-t'>
        {filePreview && renderFilePreview()}
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
            placeholder={isUploading ? 'Uploading file...' : 'Type your message...'}
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
  )
}
