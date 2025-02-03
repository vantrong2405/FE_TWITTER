'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { UseFormSetValue } from 'react-hook-form'
import { cn, formatDate } from '@/app/utils/utils'

interface IProps {
  name: string
  setValue: UseFormSetValue<any>
  rules?: any
  errorMessage?: string
  className?: string
  defaultValue?: string
  value?: string
}

export function DatePicker({ name, setValue, errorMessage, className, defaultValue }: IProps) {
  const [selectedDate, setSelectedDate] = React.useState<string | undefined>(defaultValue)
  const handleDateChange = (date: Date | undefined) => {
    const formattedDate = formatDate(date)
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
