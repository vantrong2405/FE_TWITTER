'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from './icon'

const newsItems = [
  { id: 1, title: 'Next.js 13 released with app directory and server components', source: 'Vercel Blog' },
  { id: 2, title: 'React 18 introduces new concurrent rendering features', source: 'React Blog' },
  { id: 3, title: 'TypeScript 5.0 beta announced with exciting new features', source: 'TypeScript Blog' },
  { id: 4, title: 'Tailwind CSS v3.0 launches with JIT engine by default', source: 'Tailwind Blog' }
]

export function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
  }

  const prevNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length)
  }

  return (
    <Card className='mb-6'>
      <CardContent className='p-4'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-lg font-semibold'>Latest News</h3>
          <div className='flex space-x-2'>
            <Button variant='outline' size='icon' onClick={prevNews}>
              <Icons.chevronLeft className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon' onClick={nextNews}>
              <Icons.chevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <div className='relative overflow-hidden' style={{ height: '100px' }}>
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              className='absolute top-0 left-0 w-full transition-all duration-300 ease-in-out'
              style={{
                transform: `translateY(${(index - currentIndex) * 100}%)`,
                opacity: index === currentIndex ? 1 : 0
              }}
            >
              <h4 className='font-medium mb-1'>{item.title}</h4>
              <p className='text-sm text-gray-500 dark:text-gray-400'>{item.source}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
