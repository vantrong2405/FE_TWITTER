'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

interface ImageViewerProps {
  images: { url: string }[]
  initialIndex: number
  open: boolean
  onClose: () => void
}

export function ImageViewer({ images, initialIndex, open, onClose }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, images.length, onClose])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-[100vw] max-h-[100vh] h-screen w-screen p-0 border-none bg-black/95 backdrop-blur-xl'>
        <DialogTitle className='sr-only'>Media Gallery</DialogTitle>
        <DialogDescription className='sr-only'>View media in full screen</DialogDescription>
        <div className='relative w-full h-full flex items-center justify-center'>
          {/* Top controls bar */}
          <div className='absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent z-10'>
            <div className='flex justify-between items-center h-full px-4'>
              <Button
                variant='ghost'
                size='icon'
                className='text-white hover:bg-white/20 transition-colors'
                onClick={onClose}
              >
                <X className='h-6 w-6' />
              </Button>
              <div className='flex gap-2'>
                <Button variant='ghost' size='icon' className='text-white hover:bg-white/20 transition-colors'>
                  <ZoomIn className='h-6 w-6' />
                </Button>
                <Button variant='ghost' size='icon' className='text-white hover:bg-white/20 transition-colors'>
                  <Maximize className='h-6 w-6' />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant='ghost'
                size='icon'
                className='absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 transition-colors w-12 h-12 rounded-full z-20'
                onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              >
                <ChevronLeft className='h-8 w-8' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 transition-colors w-12 h-12 rounded-full z-20'
                onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              >
                <ChevronRight className='h-8 w-8' />
              </Button>
            </>
          )}

          {/* Main image */}
          <div className='relative w-full h-full flex items-center justify-center p-8'>
            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin' />
              </div>
            )}
            <Image
              fill
              priority
              src={
                images[currentIndex].url ||
                'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
              }
              alt={`Image ${currentIndex + 1} of ${images.length}`}
              className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoadingComplete={() => setIsLoading(false)}
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Bottom controls bar */}
          <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent z-10'>
            <div className='flex justify-center items-center h-full'>
              {images.length > 1 && (
                <div className='px-4 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-sm'>
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
