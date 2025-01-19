'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { redirect } from 'next/navigation'
import { getAccessTokenFromLS } from './utils/utils'
import { pathUrl } from './constant/path'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const token = getAccessTokenFromLS()
    if (!token && !pathname.startsWith('/auth/') && pathname !== pathUrl.login_register) {
      redirect(pathUrl.login_register)
    } else if (token && pathname === pathUrl.login_register) {
      redirect(pathUrl.home)
    }
  }, [pathname])

  return <>{children}</>
}
