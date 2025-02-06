'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageViewer } from './imageViewer'
import { Media } from '@/app/types/tweet.i'

interface ImageGridProps {
  medias: Media[]
}

export function ImageGrid({ medias }: ImageGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const getGridLayout = () => {
    switch (medias.length) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-2'
      case 3:
        return 'grid-cols-2'
      case 4:
        return 'grid-cols-2'
      default:
        return 'grid-cols-3'
    }
  }

  const getImageHeight = () => {
    switch (medias.length) {
      case 1:
        return 'h-[400px]'
      case 2:
        return 'h-[200px]'
      case 3:
        return 'h-[200px]'
      case 4:
        return 'h-[200px]'
      default:
        return 'h-[130px]'
    }
  }

  const renderMedia = (media: Media, index: number) => {
    if (media.type === 0) {
      // Image
      return (
        <Image
          fill
          priority
          src={media.url}
          alt={`Tweet media ${index + 1}`}
          className='object-cover cursor-pointer hover:opacity-90 transition-opacity'
          onClick={() => setSelectedImageIndex(index)}
        />
      )
    } else if (media.type === 1) {
      // Video
      return (
        <div className='relative w-full h-full'>
          <video src={media.url} className='w-full h-full object-cover' controls crossOrigin='anonymous' playsInline>
            <source src={media.url} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }
  }

  return (
    <>
      <div className={`grid ${getGridLayout()} gap-0.5 rounded-2xl overflow-hidden`}>
        {medias.slice(0, 6).map((media, index) => (
          <div
            key={index}
            className={`relative ${getImageHeight()} ${medias.length === 3 && index === 0 ? 'row-span-2' : ''}`}
          >
            {renderMedia(media, index)}
            {index === 5 && medias.length > 6 && (
              <div
                className='absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer'
                onClick={() => setSelectedImageIndex(5)}
              >
                <span className='text-white text-xl font-bold'>+{medias.length - 6}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chỉ mở ImageViewer khi click vào ảnh (type === 0) */}
      {selectedImageIndex !== null && medias[selectedImageIndex]?.type === 0 && (
        <ImageViewer
          images={medias.filter((media) => media.type === 0)} // Chỉ hiển thị ảnh trong viewer
          initialIndex={selectedImageIndex}
          open={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  )
}
