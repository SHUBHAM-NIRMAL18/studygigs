'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { isValidDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  CheckCircle2,
  DollarSign,
  PlusCircle,
  ArrowRight,
  Award,
  Layers,
  ChevronRight,
  Calendar,
  AlertTriangle,
  Briefcase,
  Search,
  User,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

export function MainDashboardView() {
  const { currentUser, tasks } = useAppStore()
  const router = useRouter()

  const isStudent = currentUser?.role === 'STUDENT'

  // Extract all user bids from tasks list
  const solverBids = useMemo(() => {
    if (!currentUser) return []
    const bidsList: any[] = []
    for (const t of tasks) {
      for (const b of t.bids || []) {
        if (b.solverId === currentUser.id) {
          bidsList.push({
            ...b,
            task: { id: t.id, title: t.title, status: t.status, deadline: t.deadline }
          })
        }
      }
    }
    return bidsList
  }, [tasks, currentUser])

  // Calculate statistics based on role
  const stats = useMemo(() => {
    if (!currentUser) return []

    if (isStudent) {
      const studentTasks = tasks.filter(t => t.posterId === currentUser.id)
      const openTasks = studentTasks.filter(t => ['OPEN', 'BIDDING'].includes(t.status))
      const activeTasks = studentTasks.filter(t => ['IN_PROGRESS', 'REVIEW'].includes(t.status))
      const completedTasks = studentTasks.filter(t => t.status === 'COMPLETED')
      
      const pendingBidsCount = studentTasks.reduce(
        (acc, t) => acc + (t.bids?.filter(b => b.status === 'PENDING').length || 0), 
        0
      )
      
      const escrowBalance = activeTasks.reduce((acc, t) => {
        return acc + (t.budgetMax || t.budgetMin || 0)
      }, 0)

      return [
        {
          label: 'Active Listings',
          value: openTasks.length + activeTasks.length,
          subValue: `${activeTasks.length} in progress`,
          icon: Layers,
          color: 'text-violet-500',
          bg: 'bg-violet-500/10'
        },
        {
          label: 'Pending Bids',
          value: pendingBidsCount,
          subValue: 'Awaiting review',
          icon: Clock,
          color: 'text-amber-500',
          bg: 'bg-amber-500/10'
        },
        {
          label: 'Escrow Invested',
          value: `$${escrowBalance}`,
          subValue: 'Guaranteed safe',
          icon: DollarSign,
          color: 'text-emerald-500',
          bg: 'bg-emerald-500/10'
        },
        {
          label: 'Student Rating',
          value: `${currentUser.rating || 5.0}/5`,
          subValue: `${completedTasks.length} jobs finished`,
          icon: Award,
          color: 'text-cyan-500',
          bg: 'bg-cyan-500/10'
        }
      ]
    } else {
      // Solver statistics
      const activeProjects = tasks.filter(
        t => ['IN_PROGRESS', 'REVIEW'].includes(t.status) && 
        t.bids?.some(b => b.solverId === currentUser.id && b.status === 'ACCEPTED')
      )
      const pendingBids = solverBids.filter(b => b.status === 'PENDING')
      const completedJobs = currentUser.completedTasks || 0
      
      const pendingEscrow = solverBids
        .filter(b => b.status === 'ACCEPTED' && ['IN_PROGRESS', 'REVIEW'].includes(b.task?.status || ''))
        .reduce((acc, b) => acc + b.proposedPrice, 0)

      return [
        {
          label: 'Active Projects',
          value: activeProjects.length,
          subValue: `${activeProjects.filter(t => t.status === 'REVIEW').length} in review`,
          icon: Briefcase,
          color: 'text-indigo-500',
          bg: 'bg-indigo-500/10'
        },
        {
          label: 'Active Proposals',
          value: pendingBids.length,
          subValue: 'Submitted proposals',
          icon: Award,
          color: 'text-sky-500',
          bg: 'bg-sky-500/10'
        },
        {
          label: 'Escrow Earnings',
          value: `$${pendingEscrow}`,
          subValue: 'Secured payments',
          icon: Clock,
          color: 'text-amber-500',
          bg: 'bg-amber-500/10'
        },
        {
          label: 'Total Earned',
          value: `$${currentUser.totalEarnings || 0}`,
          subValue: `${completedJobs} successful tasks`,
          icon: CheckCircle2,
          color: 'text-emerald-500',
          bg: 'bg-emerald-500/10'
        }
      ]
    }
  }, [currentUser, tasks, solverBids, isStudent])

  // Active items for the Recent Activity feed
  const activeFeedItems = useMemo(() => {
    if (isStudent) {
      return tasks
        .filter(t => t.posterId === currentUser?.id)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 4)
    } else {
      const associatedTasks = tasks.filter(t => {
        return t.bids?.some(b => b.solverId === currentUser?.id)
      })
      return associatedTasks
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 4)
    }
  }, [tasks, currentUser, isStudent])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  } as const

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  } as const

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-7xl mx-auto pb-6"
    >
      {/* 1. Header Greeting Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/40">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-display">
            Welcome back, <span className="text-gradient font-black">{currentUser?.name}</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Here's what's happening with your academic tasks today.
          </p>
        </div>
        <div>
          {isStudent ? (
            <Button
              size="sm"
              onClick={() => router.push('/post-task')}
              className="rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs uppercase tracking-wider px-4 h-9 shadow-sm"
            >
              <PlusCircle className="h-4 w-4 mr-1.5" /> Post Task
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => router.push('/my-bids')}
              className="rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs uppercase tracking-wider px-4 h-9 shadow-sm"
            >
              <Layers className="h-4 w-4 mr-1.5" /> Proposals
            </Button>
          )}
        </div>
      </motion.div>

      {/* 2. Stats Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div key={i} variants={itemVariants}>
              <Card className="glass-premium border-white/[0.04] group transition-all duration-300 card-glow shadow-sm">
                <CardContent className="p-4 flex items-start justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-black font-display tracking-tight text-foreground">
                      {stat.value}
                    </h3>
                    <p className="text-[9px] text-muted-foreground font-semibold">
                      {stat.subValue}
                    </p>
                  </div>
                  <div className={`h-9 w-9 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color} border border-white/5`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* 3. Columns Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Tasks */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-tight font-display text-foreground">Recent Activity</h2>
            <Button
              variant="link"
              onClick={() => router.push(isStudent ? '/my-tasks' : '/my-bids')}
              className="text-[11px] font-bold uppercase tracking-wider text-primary px-0 h-auto"
            >
              View All
            </Button>
          </div>

          {activeFeedItems.length > 0 ? (
            <div className="space-y-3">
              {activeFeedItems.map(task => {
                const isUnderReview = task.status === 'REVIEW'
                const isInProgress = task.status === 'IN_PROGRESS'
                const isCompleted = task.status === 'COMPLETED'
                
                let badgeClass = "bg-amber-500/10 text-amber-500 border-amber-500/20"
                if (isCompleted) badgeClass = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                if (isInProgress) badgeClass = "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                if (isUnderReview) badgeClass = "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"

                return (
                  <Card
                    key={task.id}
                    className="glass-premium hover:bg-accent/5 cursor-pointer border-white/[0.04] card-glow"
                    onClick={() => {
                      useAppStore.getState().setSelectedTaskId(task.id)
                      router.push(`/tasks/${task.id}`)
                    }}
                  >
                    <CardContent className="p-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`h-9 w-9 rounded-lg ${
                          isCompleted ? 'bg-emerald-500/10 text-emerald-500' :
                          isInProgress ? 'bg-indigo-500/10 text-indigo-500' :
                          isUnderReview ? 'bg-cyan-500/10 text-cyan-500' :
                          'bg-amber-500/10 text-amber-500'
                        } flex items-center justify-center border border-white/5 shrink-0`}>
                          {isCompleted ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Briefcase className="h-4.5 w-4.5" />}
                        </div>
                        
                        <div className="space-y-0.5 min-w-0">
                          <h3 className="font-bold text-sm text-foreground tracking-tight truncate">
                            {task.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                            <Badge variant="outline" className={`px-1.5 py-0 rounded text-[8px] font-bold border ${badgeClass}`}>
                              {task.status}
                            </Badge>
                            <span>•</span>
                            <span className="text-primary font-black">${task.budgetMin}-${task.budgetMax}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-2.5 w-2.5" />
                              {isValidDate(task.deadline)
                                ? new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="glass-premium border-dashed border-white/[0.08] py-12">
              <CardContent className="flex flex-col items-center justify-center text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-muted/45 flex items-center justify-center border border-white/5">
                  <PlusCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-0.5 max-w-xs">
                  <p className="text-sm font-bold text-foreground">No active work found</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {isStudent 
                      ? "Create an assignment listing to start receiving solver bids."
                      : "Find academic gigs in the marketplace to make proposals."
                    }
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => isStudent ? router.push('/post-task') : router.push('/marketplace')}
                  className="rounded-lg font-bold text-[10px] h-8 px-4 bg-primary text-primary-foreground tracking-wider uppercase shadow"
                >
                  {isStudent ? 'Create Task' : 'Find Tasks'}
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Right Column: Quick Links */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">
            Quick Actions
          </h3>
          
          <Card className="glass-premium border-white/[0.04]">
            <CardContent className="p-2 space-y-0.5">
              {[
                { label: 'Browse Marketplace', desc: 'Find active gigs & listings', link: '/marketplace', icon: Search },
                { label: 'Update Portfolio Profile', desc: 'Polish your public profile', link: '/profile', icon: User },
                { label: isStudent ? 'Post Assignment' : 'My Bids Tracker', desc: isStudent ? 'Create project contract' : 'Track bid proposals', link: isStudent ? '/post-task' : '/my-bids', icon: Zap },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-between items-center text-left py-4.5 px-3 rounded-lg hover:bg-primary/5 group transition-all duration-300"
                    onClick={() => router.push(item.link)}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.label}
                        </p>
                        <p className="text-[9px] text-muted-foreground font-medium truncate mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-40 group-hover:opacity-100 transition-all shrink-0" />
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
