import { Button } from '@/components/ui/button'
import { Icons } from './ui/icon'
import Link from 'next/link'
import { pathUrl } from '@/app/constant/path'
import { HelpCircle, LogOut, MoreHorizontal, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { getFirstLetter } from '@/app/utils/utils'
import { User } from '@/app/type/user.type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'

export function Sidebar({ className, profile }: { className?: string; profile: User | null }) {
  return (
    <aside className={className}>
      <nav className='space-y-2'>
        <Link href={pathUrl.home}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.home className='h-5 w-5 mr-2' />
            Home
          </Button>
        </Link>
        <Link href={pathUrl.explore}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.hash className='h-5 w-5 mr-2' />
            Explore
          </Button>
        </Link>
        <Link href={pathUrl.notifications}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.bell className='h-5 w-5 mr-2' />
            Notifications
          </Button>
        </Link>
        <Link href={pathUrl.message}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.mail className='h-5 w-5 mr-2' />
            Messages
          </Button>
        </Link>
        <Link href={pathUrl.bookmarks}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.bookmark className='h-5 w-5 mr-2' />
            Bookmarks
          </Button>
        </Link>
        <Link href={pathUrl.business}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.briefcase className='h-5 w-5 mr-2' />
            Business
          </Button>
        </Link>
        <Link href={pathUrl.community}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.users className='h-5 w-5 mr-2' />
            Community
          </Button>
        </Link>
        <Link href={pathUrl.grok}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.bot className='h-5 w-5 mr-2' />
            Grok
          </Button>
        </Link>
        <Link href={pathUrl.lists}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.list className='h-5 w-5 mr-2' />
            Lists
          </Button>
        </Link>
        <Link href={pathUrl.profile + profile?.username}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.user className='h-5 w-5 mr-2' />
            Profile
          </Button>
        </Link>
        <Link href={pathUrl.more}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.moreHorizontal className='h-5 w-5 mr-2' />
            More
          </Button>
        </Link>
      </nav>
      <Button className='w-full mt-4' variant={'outline'}>
        <Icons.penSquare className='h-5 w-5 mr-2' />
        Tweet
      </Button>
    </aside>
  )
}
