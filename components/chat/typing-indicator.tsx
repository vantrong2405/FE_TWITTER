export function TypingIndicator() {
  return (
    <div className='flex items-center gap-2 text-xs text-muted-foreground'>
      <div className='flex gap-1'>
        <span className='animate-bounce delay-0 h-1.5 w-1.5 rounded-full bg-purple-500'></span>
        <span className='animate-bounce delay-150 h-1.5 w-1.5 rounded-full bg-purple-500'></span>
        <span className='animate-bounce delay-300 h-1.5 w-1.5 rounded-full bg-purple-500'></span>
      </div>
      <span>Someone is typing...</span>
    </div>
  )
}
