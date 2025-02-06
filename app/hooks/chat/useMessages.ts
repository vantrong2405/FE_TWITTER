import { useState } from 'react'
import axios from 'axios'
import { getAccessTokenFromLS } from '@/app/utils/utils'
import configProject from '@/app/config/configService'
import { User } from '@/app/types/user.i'
import { pagination } from '@/app/constant/query-config'
import { Message } from '@/app/types/chat.i'

export const useMessages = (receiver: User, scrollToBottom: () => void) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchMessages = async (pageNum: number) => {
    if (loading || !receiver?._id) return

    setLoading(true)
    try {
      const response = await axios.get(`/conversations/receiver/${receiver._id}`, {
        baseURL: configProject.NEXT_PUBLIC_VITE_API_URL,
        headers: {
          Authorization: `Bearer ${getAccessTokenFromLS()}`
        },
        params: { limit: pagination.LIMIT, page: pageNum }
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
          setTimeout(scrollToBottom, 0)
          setTimeout(scrollToBottom, 100)
          setTimeout(scrollToBottom, 300)
        }

        return sortedMessages
      })
      setHasMore(newMessages.length === pagination.LIMIT)
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

  return {
    messages,
    setMessages,
    hasMore,
    loading,
    loadMore,
    fetchMessages
  }
}
