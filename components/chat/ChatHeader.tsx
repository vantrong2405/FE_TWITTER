import { User } from '@/app/types/user.i'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Icons } from '../ui/icon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Video } from 'lucide-react'
import Link from 'next/link'
import { pathUrl } from '@/app/constant/path'

interface ChatHeaderProps {
  receiver: User
  onClose: () => void
}

export function ChatHeader({ receiver, onClose }: ChatHeaderProps) {
  return (
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
  )
}
