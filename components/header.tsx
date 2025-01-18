import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from './ui/icon'

export function Header() {
  return (
    <header className='bg-white dark:bg-gray-800 shadow-sm'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Icons.twitter className='h-8 w-8 text-blue-500' />
          <Input type='search' placeholder='Search Twitter' className='hidden md:block w-64' />
        </div>
        <nav className='flex items-center space-x-4'>
          <Button variant='ghost'>
            <Icons.home className='h-5 w-5' />
            <span className='hidden md:inline ml-2'>Home</span>
          </Button>
          <Button variant='ghost'>
            <Icons.bell className='h-5 w-5' />
            <span className='hidden md:inline ml-2'>Notifications</span>
          </Button>
          <Button variant='ghost'>
            <Icons.mail className='h-5 w-5' />
            <span className='hidden md:inline ml-2'>Messages</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
