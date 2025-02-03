'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X, UserPlus, Users } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectItem } from '../ui/select'

interface AddMemberDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddMembers: (members: string[]) => void
}

const sampleNames = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'Diana Ross',
  'Ethan Hunt',
  'Fiona Apple',
  'George Clooney',
  'Hannah Montana'
]

export function AddMemberDialog({ isOpen, onClose, onAddMembers }: AddMemberDialogProps) {
  const [newMember, setNewMember] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const handleAddMember = () => {
    if (newMember.trim() && !selectedMembers.includes(newMember.trim())) {
      setSelectedMembers([...selectedMembers, newMember.trim()])
      setNewMember('')
    }
  }

  const handleRemoveMember = (member: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member))
  }

  const handleRemoveAllMembers = () => {
    setSelectedMembers([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMembers.length > 0) {
      onAddMembers(selectedMembers)
      setSelectedMembers([])
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] bg-zinc-900 border-zinc-800'>
        <DialogHeader className='pb-4'>
          <DialogTitle className='text-xl font-semibold flex items-center gap-2 text-zinc-100'>
            <Users className='w-5 h-5' />
            Add Members to Chat
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <Select
                name='member'
                setValue={(name: string, value: string) => setNewMember(value)}
                value={newMember}
                classNameTrigger='w-full bg-zinc-800 border-zinc-700 text-zinc-100'
                classNameContent='bg-zinc-800 border-zinc-700'
              >
                {sampleNames.map((name) => (
                  <SelectItem key={name} value={name} className='text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100'>
                    {name}
                  </SelectItem>
                ))}
              </Select>
              <Button
                type='button'
                onClick={handleAddMember}
                variant='outline'
                size='icon'
                className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 hover:text-zinc-100'
              >
                <UserPlus className='h-4 w-4' />
              </Button>
            </div>
            {selectedMembers.length > 0 && (
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label className='text-sm font-medium text-zinc-400'>Selected Members:</Label>
                  <Button
                    type='button'
                    onClick={handleRemoveAllMembers}
                    variant='ghost'
                    size='sm'
                    className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                  >
                    <X className='h-4 w-4 mr-1' />
                    Remove All
                  </Button>
                </div>
                <ScrollArea className='h-[100px] w-full rounded-md border border-zinc-700 bg-zinc-800 p-2'>
                  <div className='flex flex-wrap gap-2'>
                    {selectedMembers.map((member) => (
                      <Badge
                        key={member}
                        variant='secondary'
                        className='flex items-center gap-1 pl-2 pr-1 py-1 text-sm bg-zinc-700/50 text-zinc-100'
                      >
                        {member}
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='h-4 w-4 p-0 hover:bg-red-400/10 hover:text-red-400'
                          onClick={() => handleRemoveMember(member)}
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white'
              disabled={selectedMembers.length === 0}
            >
              Add {selectedMembers.length} Member{selectedMembers.length !== 1 ? 's' : ''}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
