'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { AppLayout } from '@/components/studygig/AppLayout'
import { useAppStore } from '@/store/app-store'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { setCurrentUser, setIsAuthenticated, isAuthenticated, setTasks } = useAppStore()

  useEffect(() => {
    if (status === 'unauthenticated') {
      setIsAuthenticated(false)
      router.replace('/login')
    } else if (status === 'authenticated' && session?.user) {
      // Fetch user data
      fetch(`/api/users`)
        .then(res => res.json())
        .then(users => {
          const currentUser = users.find((u: { id: string }) => u.id === session.user.id)
          if (currentUser) {
            setCurrentUser(currentUser)
            setIsAuthenticated(true)
          }
        })
        .catch(() => { })
    }
  }, [status, session, router, setCurrentUser, setIsAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) return
    fetch('/api/tasks?limit=100')
      .then(res => res.json())
      .then(data => setTasks(data.tasks || []))
      .catch(() => { })
  }, [isAuthenticated, setTasks])

  if (status === 'loading' || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm text-muted-foreground">Loading StudyGig...</p>
        </div>
      </div>
    )
  }

  return <AppLayout>{children}</AppLayout>
}
