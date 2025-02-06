'use client'

import { useState } from 'react'
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
import { useChangePassword } from '@/app/hooks/auth/useChangePassword'
import { useChangePasswordFormSchema } from '@/app/schemas/changePassword.schema'

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const { register, handleSubmit, errors } = useChangePasswordFormSchema()
  const { mutateChangePassword, isPendingChangePassword } = useChangePassword(onOpenChange)
  const onSubmit = handleSubmit((data) => mutateChangePassword(data))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[570px]'>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and a new password to change your account password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='current-password' className='text-right'>
                Current Password
              </Label>
              <Input
                type='password'
                className='col-span-3'
                placeholder='enter your old password'
                register={register}
                name='old_password'
                errorMessage={errors.old_password?.message}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='new-password' className='text-right'>
                New Password
              </Label>
              <Input
                type='password'
                className='col-span-3'
                placeholder='enter your new password'
                register={register}
                name='new_password'
                errorMessage={errors.new_password?.message}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='confirm-password' className='text-right'>
                Confirm Password
              </Label>
              <Input
                type='password'
                className='col-span-3'
                placeholder='enter your confirm password'
                register={register}
                name='confirm_new_password'
                errorMessage={errors.confirm_new_password?.message}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              variant={'outline'}
              disabled={isPendingChangePassword}
              isLoading={isPendingChangePassword}
            >
              Change Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
