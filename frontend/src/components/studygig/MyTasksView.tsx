'use client'

import { useEffect, useState } from 'react'
import { useAppStore, Task } from '@/store/app-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge, CategoryBadge } from './TaskCard'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ListTodo, Clock, DollarSign, Star, FileText,
  CheckCircle, XCircle, RotateCcw, Eye
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

export function MyTasksView() {
  const { currentUser, setSelectedTaskId, setCurrentView } = useAppStore()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    if (!currentUser) return
    setLoading(true)
    try {
      const res = await fetch(`/api/tasks?posterId=${currentUser.id}`)
      const data = await res.json()
      setTasks(data.tasks || [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [currentUser])

  if (!currentUser) {
    return <div className="p-6 text-center text-muted-foreground">Please select a user to view your tasks.</div>
  }

  const openTasks = tasks.filter(t => ['OPEN', 'BIDDING'].includes(t.status))
  const activeTasks = tasks.filter(t => ['IN_PROGRESS', 'REVIEW'].includes(t.status))
  const completedTasks = tasks.filter(t => ['COMPLETED', 'CANCELLED', 'DISPUTED'].includes(t.status))

  const TaskRow = ({ task }: { task: Task }) => (
    <div
      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => { setSelectedTaskId(task.id); setCurrentView('task-detail') }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium truncate">{task.title}</span>
          <StatusBadge status={task.status} />
          <CategoryBadge category={task.category} />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />${task.budgetMin}–${task.budgetMax}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{format(new Date(task.deadline), 'MMM d')}</span>
          <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{task._count?.bids || 0} bids</span>
        </div>
      </div>
      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
    </div>
  )

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Posted Tasks</h1>
        <p className="text-sm text-muted-foreground">Track and manage your assignment listings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-primary">{openTasks.length}</div>
            <div className="text-xs text-muted-foreground">Open</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-amber-600">{activeTasks.length}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-emerald-600">{completedTasks.filter(t => t.status === 'COMPLETED').length}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
        </div>
      ) : (
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active" className="gap-1">
              <RotateCcw className="h-3.5 w-3.5" /> Active ({activeTasks.length})
            </TabsTrigger>
            <TabsTrigger value="open" className="gap-1">
              <ListTodo className="h-3.5 w-3.5" /> Open ({openTasks.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Done ({completedTasks.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-2 mt-3">
            {activeTasks.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No active tasks</p> :
              activeTasks.map(t => <TaskRow key={t.id} task={t} />)}
          </TabsContent>
          <TabsContent value="open" className="space-y-2 mt-3">
            {openTasks.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No open tasks</p> :
              openTasks.map(t => <TaskRow key={t.id} task={t} />)}
          </TabsContent>
          <TabsContent value="completed" className="space-y-2 mt-3">
            {completedTasks.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No completed tasks</p> :
              completedTasks.map(t => <TaskRow key={t.id} task={t} />)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
