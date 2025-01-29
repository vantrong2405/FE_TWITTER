'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { UseMutateFunction } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

interface TweetRemoveDialogProps {
  deleteTweet: UseMutateFunction<AxiosResponse<any, any>, Error, string, unknown>
  idTweet: string
  isDeletetingTweet: boolean
}

export function TweetRemoveDialog({ deleteTweet, idTweet, isDeletetingTweet }: TweetRemoveDialogProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    deleteTweet(idTweet)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <X className='h-5 w-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold'>Xác nhận xóa tweet</DialogTitle>
          <DialogDescription className='text-sm '>
            Bạn có chắc chắn muốn xóa tweet này không? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-end'>
          <Button type='button' variant='ghost' onClick={() => setOpen(false)} className='w-full sm:w-auto'>
            Cancel
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={handleConfirm}
            className='w-full sm:w-auto'
            disabled={isDeletetingTweet}
            isLoading={isDeletetingTweet}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
