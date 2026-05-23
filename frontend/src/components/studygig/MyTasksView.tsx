'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore, Task } from '@/store/app-store'
import { getTaskPath } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge, CategoryBadge } from './TaskCard'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ListTodo, Clock, DollarSign, FileText,
  CheckCircle, RotateCcw, Eye, ClipboardList, PlusCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

/* ─── Animation Variants ─────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
} as const

/* ─── Sub-components (module scope) ─────────────── */

function EmptyState({
  label,
  cta,
  onPost,
}: {
  label: string
  cta?: string
  onPost?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center space-y-4">
      <div className="h-14 w-14 rounded-2xl bg-muted/40 flex items-center justify-center border border-border/30">
        <ClipboardList className="h-6 w-6 text-muted-foreground/30" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-foreground">{label}</p>
        {cta && <p className="text-xs text-muted-foreground font-medium">{cta}</p>}
      </div>
      {cta && onPost && (
        <Button
          size="sm"
          onClick={onPost}
          className="h-9 rounded-lg font-bold text-[10px] uppercase tracking-wider px-5 bg-primary text-primary-foreground"
        >
          <PlusCircle className="h-3.5 w-3.5 mr-1.5" /> Post New Task
        </Button>
      )}
    </div>
  )
}

function TaskRow({ task }: { task: Task }) {
  const setSelectedTaskId = useAppStore(s => s.setSelectedTaskId)
  const router = useRouter()

  return (
    <motion.div variants={itemVariants}>
      <div
        className="flex items-center gap-3.5 p-3.5 rounded-xl border border-border/40 bg-card/40 hover:bg-card/80 hover:border-primary/20 cursor-pointer transition-all duration-200 group"
        onClick={() => {
          setSelectedTaskId(task.id)
          router.push(getTaskPath(task))
        }}
      >
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
              {task.title}
            </span>
            <StatusBadge status={task.status} />
            <CategoryBadge category={task.category} />
          </div>
          <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />${task.budgetMin}–${task.budgetMax}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />{format(new Date(task.deadline), 'MMM d, yyyy')}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />{task._count?.bids || 0} bids
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg shrink-0 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all"
          tabIndex={-1}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

/* ─── Main View ──────────────────────────────────── */

export function MyTasksView() {
  const { currentUser } = useAppStore()
  const router = useRouter()
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
  }, [currentUser]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/30">
          <ClipboardList className="h-7 w-7 text-muted-foreground/30" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">Please select a user to view your tasks.</p>
      </div>
    )
  }

  const openTasks = tasks.filter(t => ['OPEN', 'BIDDING'].includes(t.status))
  const activeTasks = tasks.filter(t => ['IN_PROGRESS', 'REVIEW'].includes(t.status))
  const completedTasks = tasks.filter(t => ['COMPLETED', 'CANCELLED', 'DISPUTED'].includes(t.status))
  const doneCount = completedTasks.filter(t => t.status === 'COMPLETED').length

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto pb-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
              <ClipboardList className="h-3.5 w-3.5 text-primary" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-foreground font-display">My Posted Tasks</h1>
          </div>
          <p className="text-xs text-muted-foreground font-medium">Track and manage all your assignment listings.</p>
        </div>
        <Button
          size="sm"
          onClick={() => router.push('/post-task')}
          className="h-9 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[10px] uppercase tracking-wider px-4 shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="h-3.5 w-3.5 mr-1.5" /> New Task
        </Button>
      </motion.div>

      {/* Stat Pills */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
        {([
          { label: 'Open', value: openTasks.length, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Active', value: activeTasks.length, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Completed', value: doneCount, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ] as const).map(stat => (
          <Card key={stat.label} className="glass-premium border-border/40">
            <CardContent className="p-3.5 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                <span className={`text-sm font-black ${stat.color}`}>{stat.value}</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Task List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="active">
            <TabsList className="h-10 rounded-xl bg-card/60 border border-border/40 p-1 gap-1">
              <TabsTrigger
                value="active"
                className="rounded-lg text-[11px] font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 px-3"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Active
                <Badge className="ml-1 rounded-full text-[8px] h-4 px-1.5 bg-white/20 text-inherit border-none">
                  {activeTasks.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="open"
                className="rounded-lg text-[11px] font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 px-3"
              >
                <ListTodo className="h-3.5 w-3.5" /> Open
                <Badge className="ml-1 rounded-full text-[8px] h-4 px-1.5 bg-white/20 text-inherit border-none">
                  {openTasks.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-lg text-[11px] font-bold uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 px-3"
              >
                <CheckCircle className="h-3.5 w-3.5" /> Done
                <Badge className="ml-1 rounded-full text-[8px] h-4 px-1.5 bg-white/20 text-inherit border-none">
                  {completedTasks.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2.5">
                {activeTasks.length === 0 ? (
                  <EmptyState
                    label="No active tasks"
                    cta="Post a new assignment to get started."
                    onPost={() => router.push('/post-task')}
                  />
                ) : (
                  activeTasks.map(t => <TaskRow key={t.id} task={t} />)
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="open" className="mt-4">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2.5">
                {openTasks.length === 0 ? (
                  <EmptyState
                    label="No open tasks"
                    cta="Post a new assignment to attract solver bids."
                    onPost={() => router.push('/post-task')}
                  />
                ) : (
                  openTasks.map(t => <TaskRow key={t.id} task={t} />)
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2.5">
                {completedTasks.length === 0 ? (
                  <EmptyState label="No completed tasks yet" />
                ) : (
                  completedTasks.map(t => <TaskRow key={t.id} task={t} />)
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </motion.div>
  )
}
