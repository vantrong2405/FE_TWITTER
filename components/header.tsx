'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from './ui/icon'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleLogout = () => {
    console.log('Logout clicked')
    // Implement logout logic here
  }

  return (
    <header className='bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Icons.twitter className='h-8 w-8 text-blue-500' />
          <Input
            type='search'
            placeholder='Search Twitter'
            className={`${isSearchOpen ? 'block' : 'hidden'} md:block w-64 transition-all duration-300`}
          />
          <Button variant='ghost' size='sm' className='md:hidden' onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Icons.search className='h-5 w-5' />
          </Button>
        </div>
        <nav className='flex items-center space-x-1 md:space-x-4'>
          <Button variant='ghost' size='sm'>
            <Icons.home className='h-5 w-5' />
            <span className='hidden md:inline ml-2'>Home</span>
          </Button>
          <Button variant='ghost' size='sm'>
            <Icons.bell className='h-5 w-5' />
            <span className='hidden md:inline ml-2'>Notifications</span>
          </Button>
          <Button variant='ghost' size='sm'>
            <Icons.mail className='h-5 w-5' />
            <span className='hidden md:inline ml-2'>Messages</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/placeholder-avatar.jpg' alt='@johndoe' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <Icons.logOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
