'use client'

import { SessionProvider } from 'next-auth/react'
import { AppContent } from '@/components/studygig/AppContent'

export default function Home() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  )
}
