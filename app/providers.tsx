'use client'

import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function QueryProvider({ children }: React.PropsWithChildren) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') setIsBrowser(true)
  }, [])

  const [client] = useState(() => new QueryClient())

  if (!isBrowser) return null
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default QueryProvider
