'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Clock,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'

export function MainDashboardView() {
  const { currentUser, tasks } = useAppStore()
  const router = useRouter()

  // Calculate statistics
  const userTasks = tasks.filter(t => t.posterId === currentUser?.id)
  const activeTasks = userTasks.filter(t => t.status === 'OPEN' || t.status === 'ASSIGNED')

  // Role-based logic
  const isStudent = currentUser?.role === 'STUDENT'
  const isSolver = currentUser?.role === 'SOLVER'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Dashboard Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Welcome back, <span className="text-gradient">{currentUser?.name}</span>!
          </h1>
          <p className="text-muted-foreground mt-2 text-lg font-medium">
            Track your progress and manage your academic tasks with ease.
          </p>
        </div>
        <div className="flex gap-4">
          {isStudent && (
            <Button
              size="lg"
              onClick={() => router.push('/post-task')}
              className="rounded-2xl shadow-xl shadow-primary/20 bg-primary h-14 px-8 font-black text-sm"
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Post Task
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push('/marketplace')}
            className="rounded-2xl glass h-14 px-8 font-black text-sm"
          >
            Browse Marketplace <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Tasks', value: activeTasks.length, icon: Clock, color: 'text-primary', bg: 'bg-primary/10', sub: 'NEEDS ACTION' },
          { label: 'Completed', value: currentUser?.completedTasks || 0, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', sub: 'GLOBAL STATS' },
          { label: isSolver ? 'Earnings' : 'Spent', value: `$${currentUser?.totalEarnings || 0}`, icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-500/10', sub: 'SECURE ESCROW' },
          { label: 'Reputation', value: `${currentUser?.rating || 5.0}/5`, icon: Award, color: 'text-amber-500', bg: 'bg-amber-500/10', sub: 'VERIFIED FEED' },
        ].map((stat, i) => (
          <Card key={i} className="glass-card border-white/5 group hover:bg-accent/5 transition-all duration-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                  <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
                </div>
                <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-[9px] font-black tracking-widest opacity-60">
                <TrendingUp className="h-3 w-3 mr-1.5" />
                <span>{stat.sub}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Feed Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight">Recent Activity</h2>
            <Button variant="link" className="font-black text-xs uppercase tracking-widest text-primary">View all Activity</Button>
          </div>

          {activeTasks.length > 0 ? (
            <div className="grid gap-4">
              {activeTasks.slice(0, 4).map(task => (
                <Card
                  key={task.id}
                  className="glass-card group hover:bg-accent/5 transition-all cursor-pointer border-white/5"
                  onClick={() => router.push('/my-tasks')}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-bold text-base leading-tight">{task.title}</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">
                          {task.status} • <span className="text-primary">${task.budgetMin}-${task.budgetMax}</span>
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="glass-card border-dashed py-20 border-border/40">
              <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-2">
                  <PlusCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold">No active tasks found</p>
                  <p className="text-muted-foreground max-w-xs mx-auto">Get started by posting your first assignment or bidding on one.</p>
                </div>
                <Button
                  className="rounded-xl font-black text-xs h-10 px-6 mt-4"
                  onClick={() => isStudent ? router.push('/post-task') : router.push('/marketplace')}
                >
                  {isStudent ? 'CREATE TASK' : 'FIND TASKS'}
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Sidebar Section */}
        <motion.div variants={itemVariants} className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight">Platform Highlights</h2>
            <Card className="bg-primary text-primary-foreground overflow-hidden relative border-none shadow-2xl premium-shadow">
              <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12">
                <Award className="h-32 w-32" />
              </div>
              <CardContent className="p-8 space-y-4 relative z-10">
                <h3 className="font-black text-xl leading-tight uppercase tracking-tighter">Become a Top-Rated Solver</h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed font-medium">
                  Complete tasks on time and maintain high ratings to unlock priority access to high-budget tasks.
                </p>
                <Button variant="secondary" className="w-full font-black text-xs h-12 rounded-xl bg-white text-primary hover:bg-white/90">
                  LEARN MORE
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-white/5">
            <div className="p-6 pb-2 border-b border-border/50">
              <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Quick Settings</h3>
            </div>
            <CardContent className="p-2 pt-4 space-y-1">
              {[
                { label: 'Update Portfolio', link: '/profile' },
                { label: 'Payment Methods', link: '/profile' },
                { label: 'Notification Preferences', link: '/profile' },
              ].map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="w-full justify-start text-[11px] font-black h-12 rounded-xl hover:bg-primary/10 hover:text-primary transition-all px-4 uppercase tracking-widest"
                  onClick={() => router.push(item.link)}
                >
                  {item.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

