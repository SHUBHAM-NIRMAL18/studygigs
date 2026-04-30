'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useAppStore } from '@/store/app-store'
import { AppLayout } from '@/components/studygig/AppLayout'
import { AuthView } from '@/components/studygig/AuthView'
import { MarketplaceView } from '@/components/studygig/MarketplaceView'
import { PostTaskView } from '@/components/studygig/PostTaskView'
import { TaskDetailView } from '@/components/studygig/TaskDetailView'
import { MyTasksView } from '@/components/studygig/MyTasksView'
import { MyBidsView } from '@/components/studygig/MyBidsView'
import { AdminView } from '@/components/studygig/AdminView'
import { ProfileView } from '@/components/studygig/ProfileView'

export function AppContent() {
  const { data: session, status } = useSession()
  const { currentView, setCurrentUser, setTasks, isAuthenticated, setIsAuthenticated } = useAppStore()
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    if (seeded) return
    fetch('/api/seed', { method: 'POST' })
      .then(() => setSeeded(true))
      .catch(() => setSeeded(true))
  }, [seeded])

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetch(`/api/users`)
        .then(res => res.json())
        .then(users => {
          const currentUser = users.find((u: { id: string }) => u.id === session.user.id)
          if (currentUser) {
            setCurrentUser(currentUser)
            setIsAuthenticated(true)
          }
        })
        .catch(() => {})
    } else if (status === 'unauthenticated') {
      setIsAuthenticated(false)
    }
  }, [status, session, setCurrentUser, setIsAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) return
    fetch('/api/tasks?limit=100')
      .then(res => res.json())
      .then(data => setTasks(data.tasks || []))
      .catch(() => {})
  }, [isAuthenticated, setTasks])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" suppressHydrationWarning>
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm text-muted-foreground">Loading StudyGig...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || status === 'unauthenticated') {
    return <AuthView />
  }

  const renderView = () => {
    switch (currentView) {
      case 'marketplace': return <MarketplaceView />
      case 'post-task': return <PostTaskView />
      case 'task-detail': return <TaskDetailView />
      case 'my-tasks': return <MyTasksView />
      case 'my-bids': return <MyBidsView />
      case 'admin': return <AdminView />
      case 'profile': return <ProfileView />
      default: return <MarketplaceView />
    }
  }

  return (
    <AppLayout>
      {renderView()}
    </AppLayout>
  )
}
