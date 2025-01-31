'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Icons } from '../ui/icon'
import { useCreateTweet } from '@/app/hook/tweets/useCreateTweet'
import { useUploadImage } from '@/app/hook/medias/useUploadImage'
import { Tweet } from '@/app/types/tweet.i'
import { useStoreLocal } from '@/app/store/useStoreLocal'

export function TweetDialog({
  isOpen,
  onClose,
  onTweetCreated
}: {
  isOpen: boolean
  onClose: () => void
  onTweetCreated: (tweet: Tweet) => void
}) {
  const [tweet, setTweet] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { createTweet, isCreatingTweet } = useCreateTweet()
  const { profile } = useStoreLocal()

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isOpen])

  const { uploadImage, isUploadingImage } = useUploadImage()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setSelectedFiles((prev) => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const renderedFiles = useMemo(() => {
    return (
      selectedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className='grid grid-cols-2 gap-4'
        >
          {selectedFiles.map((file, index) => (
            <div key={index} className='relative group'>
              <Image
                src={
                  URL.createObjectURL(file) ||
                  'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                }
                alt={`Upload ${index + 1}`}
                width={200}
                height={200}
                className='w-full h-32 object-cover rounded-xl shadow-lg cursor-pointer'
                onClick={() => setSelectedImage(URL.createObjectURL(file))}
              />
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => removeFile(index)}
                className='absolute -top-2 -right-2 rounded-full w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20'
              >
                <Icons.x className='h-4 w-4' />
              </Button>
            </div>
          ))}
        </motion.div>
      )
    )
  }, [selectedFiles])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const hashtags = tweet.match(/#\w+/g)?.map((tag) => tag.slice(1)) || []
    const mentions = tweet.match(/@\w+/g)?.map((mention) => mention.slice(1)) || []

    try {
      let responseUpload: any[] = []

      if (selectedFiles.length > 0) {
        responseUpload = await Promise.all(
          selectedFiles.map(async (file) => {
            const res = await uploadImage(file)
            return res.data
          })
        )
      }

      const tweetData = {
        type: 2,
        audience: 0,
        content: tweet,
        parent_id: '67610a05bb0cbd53781c6b76',
        hashtags,
        mentions,
        medias:
          responseUpload.length > 0
            ? responseUpload.map((url) => {
                return {
                  url: url.result[0].url,
                  type: 1
                }
              })
            : []
      }

      const newTweet = await createTweet(tweetData)
      onTweetCreated({
        ...newTweet.data.result,
        user: profile
      })
      setTweet('')
      responseUpload = []
      setSelectedFiles([])
      onClose()
    } catch (error) {
      console.error('🚀 ~ handleSubmit ~ error:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] p-0 overflow-hidden'>
        <DialogTitle className='sr-only'>Compose Tweet</DialogTitle>
        <DialogDescription></DialogDescription>
        <form onSubmit={handleSubmit} className='space-y-4 p-6'>
          <div className='flex space-x-4'>
            <Avatar className='w-10 h-10 border-2 border-blue-400 shadow-lg'>
              <AvatarImage
                src='https://png.pngtree.com/png-vector/20190811/ourlarge/pngtree-baby-animal-cute-panda-smile-png-image_1687512.jpg'
                alt='@username'
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <Textarea
                ref={textareaRef}
                placeholder="What's happening?"
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                classNameTextarea='min-h-[200px]'
                className=' text-lg leading-relaxed w-full focus:ring-2 focus:ring-blue-400 rounded-2xl bg-transparent backdrop-blur-sm resize-none border-none'
              />
            </div>
          </div>

          <div className='relative'>
            <div className='overflow-y-auto max-h-[200px] pr-2'>
              <AnimatePresence>{renderedFiles}</AnimatePresence>
            </div>
          </div>

          <div className='flex justify-between items-center pt-4 border-t'>
            <div className='flex space-x-3'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='rounded-full transition-colors'
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Icons.image className='h-5 w-5 text-blue-500' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add images</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept='image/*'
                multiple
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='rounded-full transition-colors'
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Icons.smile className='h-5 w-5 text-blue-500' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add emoji</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type='button' variant='ghost' size='sm' className='rounded-full transition-colors'>
                      <Icons.mapPin className='h-5 w-5 text-blue-500' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add location</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='flex items-center space-x-6'>
              <div className='text-md font-medium'>
                <span className={tweet.length > 1000 ? 'text-red-500' : 'text-gray-600'}>{tweet.length}</span>
                <span className='text-gray-400'>/1000</span>
              </div>
              <Button
                type='submit'
                disabled={tweet.trim().length === 0 || tweet.length > 1000 || isCreatingTweet || isUploadingImage}
                variant='primary'
              >
                Tweet
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className='sm:max-w-[90vw] sm:max-h-[90vh] p-0'>
            <DialogTitle className='sr-only'>Compose Tweet</DialogTitle>
            <Image
              fill
              src={
                selectedImage ||
                'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
              }
              alt='Selected image'
              layout='responsive'
              width={1920}
              height={1080}
              objectFit='contain'
            />
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}
