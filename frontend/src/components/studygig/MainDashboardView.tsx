'use client'

import React from 'react'
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
  const { currentUser, tasks, setCurrentView } = useAppStore()

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
            <Button onClick={() => setCurrentView('post-task')} className="rounded-full shadow-lg shadow-primary/20">
              <PlusCircle className="h-4 w-4 mr-2" /> Post New Task
            </Button>
          )}
          <Button variant="outline" onClick={() => setCurrentView('marketplace')} className="rounded-full">
            Browse Marketplace <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Tasks</p>
                <h3 className="text-2xl font-bold mt-1">{activeTasks.length}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>{isStudent ? 'Tasks needing attention' : 'Tasks in progress'}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold mt-1">{currentUser?.completedTasks || 0}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Across all categories
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{isSolver ? 'Total Earnings' : 'Total Spent'}</p>
                <h3 className="text-2xl font-bold mt-1">${currentUser?.totalEarnings || 0}</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Securely processed via Escrow
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reputation</p>
                <h3 className="text-2xl font-bold mt-1">{currentUser?.rating || 5.0} / 5</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Award className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Based on client feedback
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
                <Card key={task.id} className="hover:bg-muted/50 transition-colors cursor-pointer border-muted/50" onClick={() => setCurrentView('my-tasks')}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-muted-foreground">Status: {task.status} • Budget: ${task.budgetMin}-${task.budgetMax}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
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
                <Button variant="outline" size="sm" onClick={() => isStudent ? setCurrentView('post-task') : setCurrentView('marketplace')}>
                   {isStudent ? 'Create Task' : 'Find Tasks'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Platform Highlights</h2>
          <Card className="bg-primary text-primary-foreground overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Award className="h-24 w-24" />
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg leading-tight">Become a Top-Rated Solver</h3>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                Complete tasks on time and maintain a high rating to unlock lower platform fees and priority bidding.
              </p>
              <Button variant="secondary" size="sm" className="w-full font-semibold">
                Learn More
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quick Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setCurrentView('profile')}>
                Update Portfolio
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setCurrentView('profile')}>
                Payment Methods
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => setCurrentView('profile')}>
                Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
