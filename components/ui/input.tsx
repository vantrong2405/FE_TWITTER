import * as React from 'react'
import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/axios.validate'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      type = 'text',
      register,
      onChange,
      rules,
      errorMessage,
      classNameInput,
      name,
      value,
      required,
      ...props
    },
    ref
  ) => {
    const registerResult = register && name ? register(name, rules) : {}

    return (
      <div className={className}>
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            classNameInput
          )}
          ref={ref}
          value={value}
          onChange={onChange}
          required={required}
          {...registerResult}
          {...props}
        />
        {errorMessage && <div className={`text-red-500 text-sm`}>{errorMessage}</div>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
