import { Button } from '@/components/ui/button'
import { Icons } from './ui/icon'
import Link from 'next/link'
import { pathUrl } from '@/app/constant/path'

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={className}>
      <nav className='space-y-2'>
        <Button variant='ghost' className='w-full justify-start'>
          <Icons.home className='h-5 w-5 mr-2' />
          Home
        </Button>
        <Button variant='ghost' className='w-full justify-start'>
          <Icons.hash className='h-5 w-5 mr-2' />
          Explore
        </Button>
        <Button variant='ghost' className='w-full justify-start'>
          <Icons.bell className='h-5 w-5 mr-2' />
          Notifications
        </Button>
        <Link href={pathUrl.message}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.mail className='h-5 w-5 mr-2' />
            Messages
          </Button>
        </Link>
        <Button variant='ghost' className='w-full justify-start'>
          <Icons.bookmark className='h-5 w-5 mr-2' />
          Bookmarks
        </Button>
        <Button variant='ghost' className='w-full justify-start'>
          <Icons.list className='h-5 w-5 mr-2' />
          Lists
        </Button>
        <Link href={pathUrl.profile}>
          <Button variant='ghost' className='w-full justify-start'>
            <Icons.user className='h-5 w-5 mr-2' />
            Profile
          </Button>
        </Link>
        <Button variant='ghost' className='w-full justify-start'>
          <Icons.moreHorizontal className='h-5 w-5 mr-2' />
          More
        </Button>
      </nav>
      <Button className='w-full mt-4'>Tweet</Button>
    </aside>
  )
}
