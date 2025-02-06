export type MessageType = 'text' | 'image' | 'video' | 'file'

export type Message = {
  _id: string
  content: string
  sender_id: string
  receiver_id: string
  timestamp: Date
  type?: MessageType
  file_url?: string
  file_name?: string
  file_size?: number
}
