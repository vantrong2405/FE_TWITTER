import type { ReactNode } from 'react'

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-background'>
      <main>{children}</main>
    </div>
  )
}
