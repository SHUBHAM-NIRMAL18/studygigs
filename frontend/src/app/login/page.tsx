'use client'
import { useRouter } from 'next/navigation'
import { AuthView } from '@/components/studygig/AuthView'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [status, router])

  if (status === 'loading') return null

  return <AuthView defaultTab="login" onBack={() => router.push('/')} />
}
