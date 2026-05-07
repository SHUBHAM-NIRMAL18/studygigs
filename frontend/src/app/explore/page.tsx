'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PublicHeader } from '@/components/studygig/landing/PublicHeader'
import { PublicFooter } from '@/components/studygig/landing/PublicFooter'
import { MarketplaceView } from '@/components/studygig/MarketplaceView'
import { useAppStore } from '@/store/app-store'

export default function ExplorePage() {
  const router = useRouter()
  const { setTasks, setIsLoading } = useAppStore()

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/tasks?limit=100')
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks || [])
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false)
      })
  }, [setTasks, setIsLoading])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader 
        onLoginClick={() => router.push('/login')} 
        onSignUpClick={() => router.push('/signup')} 
      />
      
      <main className="flex-1 py-12">
        <MarketplaceView />
      </main>

      <PublicFooter />
    </div>
  )
}
