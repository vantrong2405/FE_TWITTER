'use client'

import { useEffect, useState } from 'react'
import type { User } from '@/app/types/user.i'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectItem } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { useUpdateProfile } from '@/app/hooks/user/useUpdateProfile'
import { useUpdateProfileFormSchema } from '@/app/schemas/updateProfile.schema'
import { formatDate } from '@/app/utils/utils'
import { Icons } from '@/components/ui/icon'

interface EditProfileDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export function EditProfileDialog({ isOpen, onClose, user }: EditProfileDialogProps) {
  const [formData, setFormData] = useState<Partial<User>>({})
  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const { register, handleSubmit, setValue, errors } = useUpdateProfileFormSchema()
  const { mutateUpdateProfile, isPendingUpdateProfile } = useUpdateProfile()
  const onSubmit = handleSubmit((data) => {
    mutateUpdateProfile(data)
    onClose()
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                <Icons.userIcon className='h-4 w-4 mr-2 inline-block' />
                Name
              </Label>
              <Input
                type='text'
                className='col-span-3'
                placeholder='enter your name'
                register={register}
                name='name'
                errorMessage={errors.name?.message}
                defaultValue={formData.name || ''}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='bio' className='text-right'>
                <Icons.pill className='h-4 w-4 mr-2 inline-block' />
                Bio
              </Label>
              <Textarea
                id='bio'
                className='col-span-3'
                placeholder='enter your bio'
                register={register}
                name='bio'
                errorMessage={errors.bio?.message}
                defaultValue={formData.bio || ''}
                classNameTextarea={'min-h-[100px]'}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                <Icons.userIcon className='h-4 w-4 mr-2 inline-block' />
                <span>Cover Photo</span>
              </Label>
              <Input
                className='col-span-3'
                placeholder='enter your cover_photo'
                register={register}
                name='cover_photo'
                errorMessage={errors.cover_photo?.message}
                defaultValue={formData.cover_photo || ''}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='website' className='text-right'>
                <Icons.globe className='h-4 w-4 mr-2 inline-block' />
                Website
              </Label>
              <Input
                className='col-span-3'
                placeholder='enter your website'
                register={register}
                name='website'
                errorMessage={errors.website?.message}
                defaultValue={formData.website || ''}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='location' className='text-right'>
                <Icons.mapPin className='h-4 w-4 mr-2 inline-block' />
                Location
              </Label>
              <Select
                className='col-span-3'
                register={register}
                name='location'
                errorMessage={errors.location?.message}
                defaultValue={formData.location || ''}
                setValue={setValue}
              >
                <SelectItem value='Hà nội'>Hà Nội</SelectItem>
                <SelectItem value='Đà nẵng'>Đà Nẵng</SelectItem>
                <SelectItem value='Hồ chí minh'>Hồ Chí Minh</SelectItem>
              </Select>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='date_of_birth' className='col-span-1 text-right'>
                <Icons.calendarIcon className='h-4 w-4 mr-2 inline-block' />
                Birthday
              </Label>
              <div className='col-span-3'>
                <DatePicker
                  name='date_of_birth'
                  setValue={setValue}
                  errorMessage={errors.date_of_birth?.message}
                  className='w-full'
                  defaultValue={formatDate(formData.date_of_birth) || ''}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              variant={'outline'}
              disabled={isPendingUpdateProfile}
              isLoading={isPendingUpdateProfile}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
