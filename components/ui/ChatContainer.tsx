import { useStoreLocal } from '@/app/store/useStoreLocal'
import React from 'react'
import ChatBoxReal from '../chat/chat'

export const ChatContainer = () => {
  const { openChats, removeChat } = useStoreLocal()
  console.log('🚀 ~ ChatContainer ~ openChats:', openChats)

  return (
    <div className='chat-container fixed bottom-0 right-0 flex flex-row gap-4 p-4'>
      {openChats.map((chatUser) => (
        <ChatBoxReal key={chatUser._id} receiver={chatUser} onClose={() => removeChat(chatUser._id)} />
      ))}
    </div>
  )
}
