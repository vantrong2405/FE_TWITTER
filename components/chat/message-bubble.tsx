import { cn } from '@/app/utils/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

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
}

export function MessageBubble({ message, timestamp, isUser, avatar, name, status, reactions }: MessageBubbleProps) {
  return (
    <div className={cn('flex gap-3 max-w-[85%]', isUser ? 'ml-auto flex-row-reverse' : '')}>
      <Avatar className='h-8 w-8 border-2 border-white shadow-sm'>
        <AvatarImage src={avatar} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
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
                : 'bg-gradient-to-br from-gray-50 to-gray-100 rounded-tl-none'
            )}
          >
            <p className='leading-relaxed'>{message}</p>
            <span className={cn('text-xs mt-1 block', isUser ? 'text-indigo-100' : 'text-gray-500')}>{timestamp}</span>
          </Card>
          {reactions && reactions.length > 0 && (
            <div className='flex gap-1'>
              {reactions.map((reaction, index) => (
                <span
                  key={index}
                  className='inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs shadow-sm border'
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
