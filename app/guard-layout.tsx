'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'
import { getAccessTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from './utils/utils'
import { pathUrl } from './constant/path'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const access_token = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')
    if (access_token && refresh_token) {
      setAccessTokenToLS(access_token)
      setRefreshTokenToLS(refresh_token)
      redirect(pathUrl.home)
    }
    const token = getAccessTokenFromLS()
    if (!token && !pathname.startsWith('/auth/') && pathname !== pathUrl.login_register && pathname !== '/') {
      redirect(pathUrl.login_register)
    } else if (token && pathname === pathUrl.login_register) {
      redirect(pathUrl.home)
    }
  }, [pathname, redirect])

  return <>{children}</>
}
