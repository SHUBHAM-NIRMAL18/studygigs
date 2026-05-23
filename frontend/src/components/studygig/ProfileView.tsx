'use client'

import { useAppStore } from '@/store/app-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Star, DollarSign, CheckCircle, Clock, TrendingUp,
  Mail, Award, Calendar, Bookmark, Briefcase, User as UserIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
} as const

export function ProfileView() {
  const { currentUser } = useAppStore()

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-4">
        <div className="h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/30">
          <UserIcon className="h-9 w-9 text-muted-foreground/20" />
        </div>
        <p className="text-sm text-muted-foreground font-medium max-w-xs">
          Please select a user to view their profile details.
        </p>
      </div>
    )
  }

  const roleConfig: Record<string, { label: string; color: string }> = {
    STUDENT: { label: 'Student', color: 'bg-sky-500/10 text-sky-500 border-sky-500/20' },
    SOLVER: { label: 'Solver', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    ADMIN: { label: 'Admin', color: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
  }
  const role = roleConfig[currentUser.role] ?? { label: currentUser.role, color: '' }

  const statCards = [
    {
      label: 'Avg Rating',
      value: currentUser.rating ? `${currentUser.rating}/5` : '—',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Tasks Done',
      value: currentUser.completedTasks,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total Earned',
      value: `$${currentUser.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'On-Time Rate',
      value: currentUser.onTimeRate ? `${(currentUser.onTimeRate * 100).toFixed(0)}%` : '—',
      icon: Clock,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto pb-8 space-y-6"
    >
      {/* Profile Hero */}
      <motion.div variants={itemVariants}>
        <Card className="glass-premium border-border/40 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="h-24 w-24 border-4 border-border/50 shadow-xl">
                  <AvatarFallback className="text-3xl font-black bg-primary/10 text-primary uppercase font-display">
                    {currentUser.avatar || currentUser.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-card border-2 border-border/50 flex items-center justify-center shadow">
                  <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                </div>
              </div>

              {/* Identity */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  <h1 className="text-3xl font-extrabold tracking-tight font-display text-foreground">
                    {currentUser.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className={`px-2.5 py-0.5 rounded-md text-[9px] font-black border uppercase tracking-widest ${role.color}`}
                  >
                    {role.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1.5 font-medium">
                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                  {currentUser.email}
                </p>
                {currentUser.bio && (
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl italic">
                    &ldquo;{currentUser.bio}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Stats + Performance */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stat Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            {statCards.map(stat => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="glass-premium border-border/40">
                  <CardContent className="p-4 flex items-center gap-3.5">
                    <div className={`h-11 w-11 rounded-xl ${stat.bg} flex items-center justify-center shrink-0 border border-white/5`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xl font-black font-display text-foreground">{stat.value}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>

          {/* Solver Performance */}
          {currentUser.role === 'SOLVER' && (
            <motion.div variants={itemVariants}>
              <Card className="glass-premium border-border/40 overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4 text-primary" />
                    Solver Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-5">
                  {[
                    {
                      label: 'Project Completion Rate',
                      value: currentUser.completedTasks > 0 ? 98 : 0,
                      display: currentUser.completedTasks > 0 ? '98%' : 'N/A',
                      color: 'text-primary',
                    },
                    {
                      label: 'Punctuality Score',
                      value: currentUser.onTimeRate ? currentUser.onTimeRate * 100 : 0,
                      display: currentUser.onTimeRate ? `${(currentUser.onTimeRate * 100).toFixed(0)}%` : 'N/A',
                      color: 'text-cyan-500',
                    },
                    {
                      label: 'Quality Rating',
                      value: (currentUser.rating / 5) * 100,
                      display: `${currentUser.rating}/5.0`,
                      color: 'text-amber-500',
                    },
                  ].map(item => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-foreground">{item.label}</span>
                        <span className={`text-sm font-black ${item.color}`}>{item.display}</span>
                      </div>
                      <Progress value={item.value} className="h-1.5 rounded-full" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right: Details + Growth */}
        <div className="space-y-5">
          <motion.div variants={itemVariants}>
            <Card className="glass-premium border-border/40">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  Profile Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5" /> Member Since
                  </span>
                  <span className="font-bold text-foreground text-xs">
                    {new Date(currentUser.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <Separator className="opacity-30" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Bookmark className="h-3.5 w-3.5" /> Posted Tasks
                  </span>
                  <span className="font-black text-foreground">{currentUser._count?.postedTasks || 0}</span>
                </div>
                <Separator className="opacity-30" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Briefcase className="h-3.5 w-3.5" /> Placed Bids
                  </span>
                  <span className="font-black text-foreground">{currentUser._count?.bids || 0}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-premium border-border/40">
              <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
                  <TrendingUp className="h-5.5 w-5.5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-black text-sm text-foreground font-display">Growth Mindset</h3>
                  <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                    Complete more tasks to climb the ranks and unlock premium tier status.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
