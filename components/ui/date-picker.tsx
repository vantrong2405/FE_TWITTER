'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { UseFormSetValue } from 'react-hook-form'
import { cn } from '@/app/utils/utils'

interface IProps {
  name: string
  setValue: UseFormSetValue<any>
  rules?: any
  errorMessage?: string
  className?: string
}

export function DatePicker({ name, setValue, errorMessage, className }: IProps) {
  const [selectedDate, setSelectedDate] = React.useState<string | undefined>()

  const handleDateChange = (date: Date | undefined) => {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : ''
    setSelectedDate(formattedDate)
    setValue(name, formattedDate, { shouldValidate: true })
  }

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn('w-full justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {selectedDate || <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={selectedDate ? new Date(selectedDate) : undefined}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errorMessage && <div className='text-sm text-red-500'>{errorMessage}</div>}
    </div>
  )
}
