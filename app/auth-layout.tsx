'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessTokenFromLS } from './utils/utils'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const token = getAccessTokenFromLS()
    const currentPath = window.location.pathname

    if (!token) {
      if (!currentPath.startsWith('/login&register')) {
        router.push('/login&register')
      }
    } else {
      if (currentPath.startsWith('/login&register')) {
        router.push('/')
      }
    }
  }, [router])

  return <>{children}</>
}
