import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SendHorizontal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useStoreLocal } from '@/app/hook/useStore'

export default function ChatBox() {
  const [inputValue, setInputValue] = useState('')
  const { chat } = useStoreLocal()
  return (
    <>
      {chat && (
        <div className='fixed bottom-0 right-3 mt-5 h-[440px] w-[330px] translate-y-[-60px] justify-between rounded-2xl border bg-card text-card-foreground shadow-sm'>
          <div className='flex flex-row items-center space-y-1.5 p-6'>
            <div className='flex items-center space-x-4'>
              <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png'
                  alt=''
                />
              </span>
              <div>
                <p className='text-sm font-medium leading-none'>Meta Mask</p>
                <p className='text-sm text-muted-foreground'>m@example.com</p>
              </div>
            </div>
          </div>
          <div className='h-[64%] p-6 pt-0'>
            <div className='space-y-4'>
              <div className='dark:#303030 flex w-max max-w-[75%] flex-col gap-2 rounded-3xl bg-muted px-3 py-2 text-sm'>
                Hi, how can I help you today?
              </div>
              {/* Add more chat messages here */}
            </div>
          </div>
          <div className='mb-2 mt-1 flex items-center p-6 pt-0'>
            <Input
              className='mr-2 h-10 rounded-xl'
              placeholder='Type your message...'
              value={inputValue} // Set input value
              onChange={(e) => setInputValue(e.target.value)} // Handle input change
            />
            <Button className='ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-orange-500 text-sm font-medium outline-gray-600 hover:bg-orange-500/90'>
              <p className='text-xl'>
                <SendHorizontal size={15} strokeWidth={2} />
              </p>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
