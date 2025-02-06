'use client'

import { useState, useCallback, Dispatch, SetStateAction, use, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Upload, X, ImageIcon } from 'lucide-react'
import { Icons } from '@/components/ui/icon'
import { useUploadImage } from '@/app/hooks/medias/useUploadImage'
import { validateUrl } from '@/app/utils/utils'

interface EditImageDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (imageFile: File | null, imageUrl: string) => void
  title: string
  currentImageUrl?: string
  setIsTab: Dispatch<SetStateAction<'url' | 'upload'>>
  isPendingUpdateProfile: boolean
}

export function EditImageDialog({
  isOpen,
  onClose,
  onSave,
  title,
  currentImageUrl,
  setIsTab,
  isPendingUpdateProfile
}: EditImageDialogProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload')
  const [imageUrl, setImageUrl] = useState(currentImageUrl || '')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { uploadImage, isUploadingImage } = useUploadImage()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }, [])

  useEffect(() => {
    if (currentImageUrl) {
      setPreviewUrl(currentImageUrl)
      setImageUrl(currentImageUrl)
    }
  }, [currentImageUrl])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const handleSave = async () => {
    setIsSaving(true)
    setErrorMessage(null)

    try {
      let finalImageUrl = imageUrl
      if (activeTab === 'upload' && selectedFile) {
        const response = await uploadImage(selectedFile)
        console.log('🚀 ~ handleSave ~ response:', response)
        const uploadedImageUrl = response.data.result[0].url
        if (!uploadedImageUrl) {
          throw new Error('Upload failed')
        }
        finalImageUrl = uploadedImageUrl
        onSave(selectedFile, finalImageUrl)
      } else {
        onSave(selectedFile, imageUrl)
      }

      if (activeTab === 'url' && !imageUrl) {
        throw new Error('Invalid URL')
      }
      onClose()
    } catch (error) {
      console.error('Failed to save image:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    setSelectedFile(null)
    setImageUrl('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
          <DialogDescription>
            Choose an image to update your profile. You can upload a file or provide an image URL.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue='upload'
          className='w-full'
          onValueChange={(value) => {
            setActiveTab(value as 'upload' | 'url')
            setIsTab(value as 'upload' | 'url')
          }}
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='upload'>Upload Image</TabsTrigger>
            <TabsTrigger value='url'>Image URL</TabsTrigger>
          </TabsList>
          <TabsContent value='upload' className='mt-4'>
            <div
              {...getRootProps()}
              className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/10' : 'border-muted hover:border-muted-foreground/50'
              }`}
            >
              <input {...getInputProps()} />
              {previewUrl ? (
                <div className='relative w-full h-64'>
                  <Image
                    src={validateUrl(
                      previewUrl ||
                        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                    )}
                    alt='Preview'
                    fill
                    className='object-cover rounded-lg'
                  />
                  <Button
                    variant='destructive'
                    size='icon'
                    className='absolute top-2 right-2'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveImage()
                    }}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              ) : (
                <div className='text-muted-foreground'>
                  <Upload className='mx-auto h-12 w-12 mb-4' />
                  <p className='text-lg font-medium mb-2'>
                    {isDragActive ? 'Drop the image here' : 'Drag and drop your image here'}
                  </p>
                  <p className='text-sm'>or click to select a file</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value='url' className='mt-4'>
            <div className='space-y-2'>
              <Label htmlFor='image-url'>Image URL</Label>
              <div className='flex items-center space-x-2'>
                <Input
                  id='image-url'
                  type='url'
                  placeholder='https://example.com/your-image.jpg'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className='flex-grow'
                />
                <Button
                  type='button'
                  size='icon'
                  variant='outline'
                  onClick={() => setPreviewUrl(imageUrl)}
                  disabled={!imageUrl}
                >
                  <ImageIcon className='h-4 w-4' />
                  <span className='sr-only'>Preview URL</span>
                </Button>
              </div>
            </div>
            {imageUrl && (
              <div className='relative w-[90%] mx-auto h-64 mt-4'>
                <Image
                  src={validateUrl(
                    imageUrl ||
                      'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                  )}
                  alt='Preview'
                  fill
                  className='object-cover rounded-lg'
                />
                <Button
                  variant='destructive'
                  size='icon'
                  className='absolute top-2 right-2'
                  onClick={handleRemoveImage}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        {errorMessage && <p className='text-sm text-destructive mt-2'>{errorMessage}</p>}
        <div className='flex justify-end space-x-2 mt-6'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              (activeTab === 'upload' && !selectedFile) ||
              (activeTab === 'url' && !imageUrl) ||
              isSaving ||
              isPendingUpdateProfile ||
              isUploadingImage
            }
            isLoading={isPendingUpdateProfile || isUploadingImage}
            variant='secondary'
          >
            {isSaving ? (
              <>
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
