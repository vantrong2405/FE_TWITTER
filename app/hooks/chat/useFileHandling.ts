import { useState, useRef } from 'react'
import { useUploadImage } from '@/app/hooks/medias/useUploadImage'
import { useUploadVideo } from '@/app/hooks/medias/useUploadVideo'
import { MessageType, typePreView } from '@/app/types/chat.i'

export const useFileHandling = () => {
  const [filePreview, setFilePreview] = useState<typePreView>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const { uploadImage, isUploadingImage } = useUploadImage()
  const { uploadVideo, isUploadingVideo } = useUploadVideo()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, type: MessageType) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (type === 'image' && !file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (type === 'video' && !file.type.startsWith('video/')) {
      alert('Please select a video file')
      return
    }

    const url = URL.createObjectURL(file)
    setFilePreview({
      url,
      type,
      file,
      name: file.name,
      size: file.size
    })
  }

  const removeFilePreview = () => {
    if (filePreview?.url) {
      URL.revokeObjectURL(filePreview.url)
    }
    setFilePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (videoInputRef.current) videoInputRef.current.value = ''
  }

  return {
    filePreview,
    fileInputRef,
    videoInputRef,
    handleFileSelect,
    removeFilePreview,
    isUploadingImage,
    isUploadingVideo,
    uploadImage,
    uploadVideo
  }
}
