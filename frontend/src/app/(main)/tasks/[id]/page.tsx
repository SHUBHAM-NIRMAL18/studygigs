'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { TaskDetailView } from '@/components/studygig/TaskDetailView'

export default function TaskDetailPage() {
  const params = useParams()
  const { setSelectedTaskId } = useAppStore()

  useEffect(() => {
    if (params?.id) {
      const parts = (params.id as string).split('-')
      const taskRealId = parts[parts.length - 1]
      setSelectedTaskId(taskRealId)
    }
  }, [params?.id, setSelectedTaskId])

  return <TaskDetailView />
}
