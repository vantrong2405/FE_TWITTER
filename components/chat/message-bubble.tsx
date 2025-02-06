import { cn } from '@/app/utils/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { MessageType } from '@/app/types/chat.i'
import { FileIcon, ImageIcon, VideoIcon } from 'lucide-react'

interface MessageBubbleProps {
  message: string
  timestamp: string
  isUser?: boolean
  avatar: string
  name: string
  status?: string
  reactions?: Array<{
    emoji: string
    count: number
  }>
  fileUrl?: string
  fileType?: MessageType
  fileName?: string
  fileSize?: number
}

export function MessageBubble({
  message,
  timestamp,
  isUser,
  avatar,
  name,
  status,
  reactions,
  fileUrl,
  fileType,
  fileName,
  fileSize
}: MessageBubbleProps) {
  const renderFileContent = () => {
    if (!fileUrl) return null

    switch (fileType) {
      case 'image':
        return (
          <div className='relative group cursor-pointer' onClick={() => window.open(fileUrl, '_blank')}>
            <img src={fileUrl} alt={fileName} className='max-w-[200px] rounded-lg hover:opacity-90' />
            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity'>
              <ImageIcon className='w-6 h-6 text-white' />
            </div>
          </div>
        )
      case 'video':
        return (
          <div className='relative max-w-[200px]'>
            <video src={fileUrl} controls className='rounded-lg w-full' />
            <div className='absolute top-2 right-2'>
              <VideoIcon className='w-5 h-5 text-white drop-shadow-lg' />
            </div>
          </div>
        )
      case 'file':
        return (
          <div
            className='flex items-center gap-2 p-2 bg-black/5 rounded-lg cursor-pointer hover:bg-black/10'
            onClick={() => window.open(fileUrl, '_blank')}
          >
            <FileIcon className='w-5 h-5' />
            <div>
              <div className='text-sm font-medium'>{fileName}</div>
              {fileSize && <div className='text-xs opacity-70'>{(fileSize / 1024 / 1024).toFixed(2)} MB</div>}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn('flex gap-3 max-w-[85%]', isUser ? 'ml-auto flex-row-reverse' : '')}>
      <Avatar className='h-8 w-8 border-2 shadow-sm'>
        <AvatarImage src={avatar} />
        <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium'>{name}</span>
          {status && <span className='text-xs text-muted-foreground'>{status}</span>}
        </div>
        <div className='flex flex-col gap-2'>
          <Card
            className={cn(
              'p-3 shadow-sm',
              isUser
                ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-tr-none'
                : 'bg-gradient-to-br rounded-tl-none'
            )}
          >
            {renderFileContent()}
            {message && <p className='leading-relaxed mt-2'>{message}</p>}
            <span className={cn('text-xs mt-1 block opacity-70')}>{timestamp}</span>
          </Card>
          {reactions && reactions.length > 0 && (
            <div className='flex gap-1'>
              {reactions.map((reaction, index) => (
                <span
                  key={index}
                  className='inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs shadow-sm border'
                >
                  {reaction.emoji} {reaction.count}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
