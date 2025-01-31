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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Icons } from './ui/icon'
import { getFirstLetter, getRefreshTokenFromLS } from '@/app/utils/utils'
import { ModeToggle } from './ui/toggle'
import Link from 'next/link'
import { pathUrl } from '@/app/constant/path'
import { useLogout } from '@/app/hook/auth/useLogout'
import { useStoreLocal } from '@/app/store/useStoreLocal'
import { AvatarImage } from '@radix-ui/react-avatar'

export function Header() {
  const { profile } = useStoreLocal()
  const { mutateLogout, isPendingLogout } = useLogout()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const handleSubmit = () => {
    const refresh_token = getRefreshTokenFromLS() || ''
    mutateLogout({ refresh_token })
  }

  return (
    <header className='shadow-sm sticky top-0 z-20 bg-background'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link href={pathUrl.home}>
            <Icons.twitter className='h-8 w-8 text-blue-500' />
          </Link>
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
          <Link href={pathUrl.home}>
            <Button variant='ghost' size='sm'>
              <Icons.home className='h-5 w-5' />
              <span className='hidden md:inline ml-2'>Home</span>
            </Button>
          </Link>
          <Link href={pathUrl.notifications}>
            <Button variant='ghost' size='sm'>
              <Icons.bell className='h-5 w-5' />
              <span className='hidden md:inline ml-2'>Notifications</span>
            </Button>
          </Link>
          <Link href={pathUrl.message}>
            <Button variant='ghost' size='sm'>
              <Icons.mail className='h-5 w-5' />
              <span className='hidden md:inline ml-2'>Messages</span>
            </Button>
          </Link>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon' className='rounded-full'>
                <Avatar>
                  {profile?.avatar ? (
                    <AvatarImage
                      className='cursor-pointer hover:opacity-70 border overflow-hidden rounded-full'
                      src={profile.avatar}
                      alt={profile.name || '@johndoe'}
                    />
                  ) : (
                    <AvatarFallback className='cursor-pointer hover:opacity-70 border overflow-hidden rounded-full'>
                      {getFirstLetter(profile?.name ?? 'Anonymous')}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>{profile?.email ?? ''}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={pathUrl.profile + profile?.username}>
                <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem className='cursor-pointer'>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer' onClick={handleSubmit} disabled={isPendingLogout}>
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
