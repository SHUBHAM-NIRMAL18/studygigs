'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  AlertCircle,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react'

export function MainDashboardView() {
  const { currentUser, tasks } = useAppStore()
  const router = useRouter()

  // Calculate statistics
  const userTasks = tasks.filter(t => t.posterId === currentUser?.id)
  const activeTasks = userTasks.filter(t => t.status === 'OPEN' || t.status === 'ASSIGNED')
  const completedTasks = userTasks.filter(t => t.status === 'COMPLETED')
  
  // Role-based logic
  const isStudent = currentUser?.role === 'STUDENT'
  const isSolver = currentUser?.role === 'SOLVER'
  const isAdmin = currentUser?.role === 'ADMIN'

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser?.name}!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your academic tasks today.</p>
        </div>
        <div className="flex gap-3">
          {isStudent && (
            <Button onClick={() => router.push('/post-task')} className="rounded-md shadow-lg shadow-primary/20">
              <PlusCircle className="h-4 w-4 mr-2" /> Post New Task
            </Button>
          )}
          <Button variant="outline" onClick={() => router.push('/marketplace')} className="rounded-md">
            Browse Marketplace <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-border/50 shadow-sm bg-gradient-to-br from-primary/5 to-transparent hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Active Tasks</p>
                <h3 className="text-xl font-black mt-0.5">{activeTasks.length}</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-[10px] font-bold text-emerald-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>{isStudent ? 'TASKS NEEDING ATTENTION' : 'TASKS IN PROGRESS'}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Completed</p>
                <h3 className="text-xl font-black mt-0.5">{currentUser?.completedTasks || 0}</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              ACROSS ALL CATEGORIES
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{isSolver ? 'Total Earnings' : 'Total Spent'}</p>
                <h3 className="text-xl font-black mt-0.5">${currentUser?.totalEarnings || 0}</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              SECURE ESCROW PAYMENTS
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reputation</p>
                <h3 className="text-xl font-black mt-0.5">{currentUser?.rating || 5.0} / 5</h3>
              </div>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              BASED ON CLIENT FEEDBACK
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button variant="link" size="sm">View all</Button>
          </div>

          {activeTasks.length > 0 ? (
            <div className="space-y-4">
              {activeTasks.slice(0, 3).map(task => (
                <Card key={task.id} className="group hover:bg-muted/50 transition-all cursor-pointer border-muted/50 shadow-sm hover:shadow-md" onClick={() => router.push('/my-tasks')}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-bold text-sm tracking-tight">{task.title}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status: {task.status} • ${task.budgetMin}-${task.budgetMax}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed py-12">
              <CardContent className="flex flex-col items-center justify-center text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <LayoutDashboard className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">No active tasks found</p>
                  <p className="text-sm text-muted-foreground">Get started by posting your first assignment or bidding on one.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => isStudent ? router.push('/post-task') : router.push('/marketplace')}>
                   {isStudent ? 'Create Task' : 'Find Tasks'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Platform Highlights</h2>
          <Card className="bg-slate-950 text-white overflow-hidden relative border-none shadow-xl">
            <div className="absolute -right-4 -bottom-4 opacity-20 rotate-12">
              <Award className="h-20 w-20" />
            </div>
            <CardContent className="p-5 space-y-3 relative z-10">
              <h3 className="font-black text-base leading-tight uppercase tracking-tighter">Become a Top-Rated Solver</h3>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                Complete tasks on time and maintain a high rating to unlock priority benefits.
              </p>
              <Button variant="secondary" size="sm" className="w-full font-bold text-[10px] h-8 bg-white text-black hover:bg-white/90">
                LEARN MORE
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quick Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-0.5">
              <Button variant="ghost" className="w-full justify-start text-[11px] font-bold h-9 rounded-lg hover:bg-primary/5 hover:text-primary transition-all px-3" onClick={() => router.push('/profile')}>
                UPDATE PORTFOLIO
              </Button>
              <Button variant="ghost" className="w-full justify-start text-[11px] font-bold h-9 rounded-lg hover:bg-primary/5 hover:text-primary transition-all px-3" onClick={() => router.push('/profile')}>
                PAYMENT METHODS
              </Button>
              <Button variant="ghost" className="w-full justify-start text-[11px] font-bold h-9 rounded-lg hover:bg-primary/5 hover:text-primary transition-all px-3" onClick={() => router.push('/profile')}>
                NOTIFICATION PREFERENCES
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
