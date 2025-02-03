'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal, Search, User2, User2Icon, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { User } from '@/app/types/user.i'

interface ContactsSidebarProps {
  contacts: User[]
  addChat: (user: User) => void
}

export function ContactsSidebar({ contacts, addChat }: ContactsSidebarProps) {
  return (
    <Card className='h-[37vh] flex flex-col'>
      <CardHeader className='flex-shrink-0 px-4 py-3 flex flex-row items-center justify-between space-y-0'>
        <h3 className='font-semibold '>Contact person</h3>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' className='h-8 w-8 hover:bg-background rounded-full'>
            <UserPlus className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8 hover:bg-background rounded-full'>
            <Search className='h-4 w-4 ' />
          </Button>
          <Button variant='ghost' size='icon' className='h-8 w-8 hover:bg-background rounded-full'>
            <MoreHorizontal className='h-4 w-4 ' />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='flex-1 min-h-0 p-0'>
        <ScrollArea className='h-full'>
          <div className='space-y-1 px-2'>
            {contacts.map((contact) => (
              <Button
                key={contact._id}
                variant='ghost'
                className='w-[96%] flex justify-start items-center gap-3 px-2 py-2 rounded-lg transition-colors'
                onClick={() => addChat(contact)}
              >
                <div className='relative'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name}</AvatarFallback>
                  </Avatar>
                  <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white' />
                </div>
                <span className='text-sm font-medium '>{contact.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
