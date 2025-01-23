import { cn } from '@/app/utils/utils'
import * as React from 'react'
import { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends React.ComponentProps<'textarea'> {
  errorMessage?: string
  classNameTextarea?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, register, rules, errorMessage, classNameTextarea, name, ...props }, ref) => {
    const registerResult = register && name ? register(name, rules) : {}

    return (
      <div className={className}>
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            classNameTextarea
          )}
          ref={ref}
          {...registerResult}
          {...props}
        />
        {errorMessage && registerResult && <div className='text-red-500 text-sm'>{errorMessage}</div>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
