'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { PublicHeader } from '@/components/studygig/landing/PublicHeader'
import { PublicFooter } from '@/components/studygig/landing/PublicFooter'
import { MarketplaceView } from '@/components/studygig/MarketplaceView'
import { useAppStore } from '@/store/app-store'

export default function ExplorePage() {
  const router = useRouter()
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const { setTasks, setIsLoading } = useAppStore()

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/tasks?limit=100')
      .then(async res => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to fetch tasks')
        return data
      })
      .then(data => {
        setTasks(data.tasks || [])
      })
      .catch((err) => {
        setTasks([])
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [setTasks, setIsLoading])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader 
        onLoginClick={() => router.push('/login')} 
        onSignUpClick={() => router.push('/signup')} 
        isAuthenticated={isAuthenticated}
      />
      
      <main className="flex-1 py-12">
        <MarketplaceView />
      </main>

      <PublicFooter />
    </div>
  )
}
