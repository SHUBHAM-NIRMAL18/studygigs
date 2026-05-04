'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { LandingPage } from '@/components/studygig/landing/LandingPage'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    if (seeded) return
    fetch('/api/seed', { method: 'POST' })
      .then(() => setSeeded(true))
      .catch(() => setSeeded(true))
  }, [seeded])

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm text-muted-foreground">Loading StudyGig...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <LandingPage 
        onAuthClick={(mode) => {
          if (mode === 'signup') router.push('/signup')
          else router.push('/login')
        }} 
      />
    )
  }

  return null
}
