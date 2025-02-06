'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageViewer } from './imageViewer'

interface ImageGridProps {
  medias: { url: string; type?: number }[]
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

  const handleMediaClick = (index: number) => {
    if (!medias[index].type || medias[index].type === 0) {
      setSelectedImageIndex(index)
    }
  }

  return (
    <>
      <div className={`grid ${getGridLayout()} gap-0.5 rounded-2xl overflow-hidden`}>
        {medias.slice(0, 6).map((media, index) => (
          <div
            key={index}
            className={`relative ${getImageHeight()} ${medias.length === 2 && index === 0 ? 'row-span-2' : ''}`}
          >
            {media.type === 1 ? (
              <video src={media.url} className='w-full h-full object-cover' controls crossOrigin='anonymous' />
            ) : (
              <Image
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                priority
                src={
                  media.url ||
                  'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                }
                alt={`Tweet media ${index + 1}`}
                className='object-cover cursor-pointer hover:opacity-90 transition-opacity'
                onClick={() => handleMediaClick(index)}
              />
            )}
            {index === 5 && medias.length > 6 && (
              <div
                className='absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer'
                onClick={() => handleMediaClick(5)}
              >
                <span className='text-white text-xl font-bold'>+{medias.length - 6}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <ImageViewer
        medias={medias}
        initialIndex={selectedImageIndex ?? 0}
        open={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
      />
    </>
  )
}
