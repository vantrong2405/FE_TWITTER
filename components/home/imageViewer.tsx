'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

interface Media {
  url: string
  type?: number // làm cho type là optional
}

interface ImageViewerProps {
  medias: Media[]
  initialIndex: number
  open: boolean
  onClose: () => void
}

export function ImageViewer({ medias, initialIndex, open, onClose }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoading, setIsLoading] = useState(true)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + medias.length) % medias.length)
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % medias.length)
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, medias.length, onClose])

  useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  useEffect(() => {
    if (!open) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [open])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.5, 1)
    setScale(newScale)

    // Reset position về giữa khi scale về 1
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const renderMedia = () => {
    const currentMedia = medias[currentIndex]

    if (currentMedia.type === 1) {
      // Video
      return (
        <div className='w-full h-full flex items-center justify-center'>
          <video
            ref={videoRef}
            src={currentMedia.url}
            className='max-h-[calc(90vh-4rem)] w-auto'
            controls
            autoPlay
            crossOrigin='anonymous'
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={() => setIsLoading(false)}
          />
        </div>
      )
    }

    // Image with zoom and drag
    return (
      <div
        className='relative w-full h-full overflow-hidden cursor-move'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Image
          fill
          sizes='100vw'
          priority
          src={
            currentMedia.url ||
            'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
          }
          alt={`Media ${currentIndex + 1} of ${medias.length}`}
          className={`object-contain transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} 
            ${isDragging ? 'transition-none' : ''}`}
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transformOrigin: 'center',
            willChange: 'transform'
          }}
          onLoad={() => setIsLoading(false)}
          draggable={false}
        />
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className='max-w-[90vw] h-[90vh] mx-auto my-auto p-0 border-none bg-black/95 backdrop-blur-xl rounded-lg'
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <DialogTitle className='sr-only'>Media Gallery</DialogTitle>
        <DialogDescription className='sr-only'>View media in full screen</DialogDescription>
        <div className='relative w-full h-full flex items-center justify-center'>
          {/* Top controls bar */}
          <div className='absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent z-10 rounded-t-lg'>
            <div className='flex justify-end items-center h-full px-4 gap-2'>
              {medias[currentIndex].type !== 1 && (
                <>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-white hover:bg-white/20 transition-colors'
                    onClick={handleZoomIn}
                    disabled={scale >= 3}
                  >
                    <ZoomIn className='h-6 w-6' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-white hover:bg-white/20 transition-colors'
                    onClick={handleZoomOut}
                    disabled={scale <= 1}
                  >
                    <ZoomOut className='h-6 w-6' />
                  </Button>
                  <Button variant='ghost' size='icon' className='text-white hover:bg-white/20 transition-colors'>
                    <Maximize className='h-6 w-6' />
                  </Button>
                </>
              )}
              <Button
                variant='ghost'
                size='icon'
                className='text-white hover:bg-white/20 transition-colors'
                onClick={onClose}
              >
                <X className='h-6 w-6' />
              </Button>
            </div>
          </div>

          {/* Navigation buttons */}
          {medias.length > 1 && (
            <>
              <Button
                variant='ghost'
                size='icon'
                className='absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 transition-colors w-12 h-12 rounded-full z-20'
                onClick={() => setCurrentIndex((prev) => (prev - 1 + medias.length) % medias.length)}
              >
                <ChevronLeft className='h-8 w-8' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 transition-colors w-12 h-12 rounded-full z-20'
                onClick={() => setCurrentIndex((prev) => (prev + 1) % medias.length)}
              >
                <ChevronRight className='h-8 w-8' />
              </Button>
            </>
          )}

          {/* Main media */}
          <div className='relative w-full h-full flex items-center justify-center'>
            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin' />
              </div>
            )}
            {renderMedia()}
          </div>

          {/* Bottom controls bar */}
          <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent z-10 rounded-b-lg'>
            <div className='flex justify-center items-center h-full'>
              {medias.length > 1 && (
                <div className='px-4 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-sm'>
                  {currentIndex + 1} / {medias.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
