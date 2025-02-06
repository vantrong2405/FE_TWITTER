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
import { AvatarImage } from '@radix-ui/react-avatar'
import { useStoreLocal } from '@/app/stores/useStoreLocal'
import { useLogout } from '@/app/hooks/auth/useLogout'
import { Menu } from 'lucide-react'

export function Header() {
  const { profile } = useStoreLocal()
  const { mutateLogout, isPendingLogout } = useLogout()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSubmit = () => {
    const refresh_token = getRefreshTokenFromLS() || ''
    mutateLogout({ refresh_token })
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-14 items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Link href={pathUrl.home} className='flex items-center'>
            <Icons.twitter className='h-8 w-8 text-blue-500' />
          </Link>

          <div className='hidden md:flex items-center'>
            <Input type='search' placeholder='Search Twitter' className='w-64 transition-all duration-300' />
          </div>
        </div>

        <div className='flex items-center gap-4 md:hidden'>
          <Button variant='ghost' size='sm' onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Icons.search className='h-5 w-5' />
          </Button>

          <Button variant='ghost' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </Button>
        </div>

        {/* Mobile search overlay */}
        {isSearchOpen && (
          <div className='absolute top-0 left-0 w-full h-14 bg-background border-b md:hidden'>
            <div className='container mx-auto flex items-center h-full gap-4 px-4'>
              <Button variant='ghost' size='sm' onClick={() => setIsSearchOpen(false)} className='shrink-0'>
                <Icons.arrowLeft className='h-5 w-5' />
              </Button>

              <Input type='search' placeholder='Search Twitter' className='w-full' autoFocus />
            </div>
          </div>
        )}

        <nav
          className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex
          flex-col
          md:flex-row
          absolute
          md:relative
          top-14
          md:top-0
          left-0
          w-full
          md:w-auto
          bg-background
          md:bg-transparent
          border-b
          md:border-0
          p-4
          md:p-0
          space-y-2
          md:space-y-0
          md:space-x-6
          items-start
          md:items-center
          shadow-lg
          md:shadow-none
        `}
        >
          {/* Thêm profile section cho mobile */}
          <div className='flex items-center gap-3 w-full p-2 md:hidden'>
            <Avatar className='h-10 w-10'>
              {profile?.avatar ? (
                <AvatarImage className='object-cover' src={profile.avatar} alt={profile.name || '@johndoe'} />
              ) : (
                <AvatarFallback className='bg-muted text-muted-foreground'>
                  {getFirstLetter(profile?.name ?? 'Anonymous')}
                </AvatarFallback>
              )}
            </Avatar>
            <div className='flex flex-col'>
              <span className='font-semibold'>{profile?.name}</span>
              <span className='text-sm text-muted-foreground'>{profile?.email}</span>
            </div>
          </div>

          {/* Thêm divider cho mobile */}
          <div className='w-full h-[1px] bg-border md:hidden' />

          <Link href={pathUrl.home} className='w-full md:w-auto'>
            <Button variant='ghost' size='sm' className='w-full md:w-auto justify-start'>
              <Icons.home className='h-5 w-5' />
              <span className='ml-2'>Home</span>
            </Button>
          </Link>
          <Link href={pathUrl.notifications} className='w-full md:w-auto'>
            <Button variant='ghost' size='sm' className='w-full md:w-auto justify-start'>
              <Icons.bell className='h-5 w-5' />
              <span className='ml-2'>Notifications</span>
            </Button>
          </Link>
          <Link href={pathUrl.message} className='w-full md:w-auto'>
            <Button variant='ghost' size='sm' className='w-full md:w-auto justify-start'>
              <Icons.mail className='h-5 w-5' />
              <span className='ml-2'>Messages</span>
            </Button>
          </Link>
          <Link href={pathUrl.profile + profile?.username} className='w-full md:hidden'>
            <Button variant='ghost' size='sm' className='w-full justify-start'>
              <Icons.user className='h-5 w-5' />
              <span className='ml-2'>Profile</span>
            </Button>
          </Link>
          <div className='w-full md:w-auto'>
            <ModeToggle />
          </div>

          {/* Thêm nút logout cho mobile */}
          <Button
            variant='ghost'
            size='sm'
            className='w-full justify-start md:hidden'
            onClick={handleSubmit}
            disabled={isPendingLogout}
          >
            <Icons.logOut className='h-5 w-5' />
            <span className='ml-2'>Log out</span>
          </Button>

          {/* Profile dropdown chỉ hiển thị trên desktop */}
          <div className='hidden md:block'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full h-8 w-8 p-0'>
                  <Avatar className='h-8 w-8'>
                    {profile?.avatar ? (
                      <AvatarImage className='object-cover' src={profile.avatar} alt={profile.name || '@johndoe'} />
                    ) : (
                      <AvatarFallback className='bg-muted text-muted-foreground'>
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
          </div>
        </nav>
      </div>
    </header>
  )
}
