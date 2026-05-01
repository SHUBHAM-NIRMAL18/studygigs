'use client'

import { useAppStore } from '@/store/app-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Star, DollarSign, CheckCircle, Clock, TrendingUp,
  Mail, Award, Calendar, Bookmark, Briefcase, Sparkles, User as UserIcon
} from 'lucide-react'

export function ProfileView() {
  const { currentUser } = useAppStore()

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-4">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
          <UserIcon className="h-10 w-10 text-muted-foreground opacity-20" />
        </div>
        <p className="text-muted-foreground max-w-sm">Please select a user to view their profile details.</p>
      </div>
    )
  }

  const roleColors: Record<string, string> = {
    STUDENT: 'bg-sky-500/10 text-sky-600 border-sky-500/20',
    SOLVER: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    ADMIN: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header section with glass effect */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background border p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Sparkles className="h-24 w-24" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary uppercase">
                {currentUser.avatar || currentUser.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background border-2 border-background shadow-sm flex items-center justify-center">
              <div className="h-5 w-5 rounded-full bg-emerald-500" />
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">{currentUser.name}</h1>
                <Badge variant="outline" className={`px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${roleColors[currentUser.role] || ''}`}>
                  {currentUser.role}
                </Badge>
              </div>
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-primary" /> {currentUser.email}
              </p>
            </div>
            {currentUser.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl italic">
                "{currentUser.bio}"
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats & Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border border-muted/60 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shadow-inner">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.rating || '—'}</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Average Rating</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-muted/60 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shadow-inner">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.completedTasks}</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Tasks Completed</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-muted/60 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-inner">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">${currentUser.totalEarnings.toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Earnings</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-muted/60 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shadow-inner">
                  <Clock className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{currentUser.onTimeRate ? `${(currentUser.onTimeRate * 100).toFixed(0)}%` : '—'}</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">On-Time Delivery</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reputation Section */}
          {currentUser.role === 'SOLVER' && (
            <Card className="border border-muted/60 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-4 border-b bg-muted/20">
                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" /> Solver Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">Project Completion Rate</span>
                    <span className="text-lg font-bold text-primary">{currentUser.completedTasks > 0 ? '98%' : 'N/A'}</span>
                  </div>
                  <Progress value={currentUser.completedTasks > 0 ? 98 : 0} className="h-2 rounded-full" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">Punctuality Score</span>
                    <span className="text-lg font-bold text-cyan-600">{currentUser.onTimeRate ? `${(currentUser.onTimeRate * 100).toFixed(0)}%` : 'N/A'}</span>
                  </div>
                  <Progress value={currentUser.onTimeRate * 100} className="h-2 rounded-full" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">Quality Rating</span>
                    <span className="text-lg font-bold text-yellow-500">{currentUser.rating}/5.0</span>
                  </div>
                  <Progress value={(currentUser.rating / 5) * 100} className="h-2 rounded-full" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Information & Activity */}
        <div className="space-y-6">
          <Card className="border border-muted/60 bg-card/50 backdrop-blur-sm h-fit">
            <CardHeader className="pb-4 border-b bg-muted/20">
              <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-5 text-sm font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" /> Member Since
                  </span>
                  <span className="text-foreground">{new Date(currentUser.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                </div>
                <Separator className="opacity-50" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Bookmark className="h-3.5 w-3.5" /> Posted Tasks
                  </span>
                  <span className="text-foreground font-bold">{currentUser._count?.postedTasks || 0}</span>
                </div>
                <Separator className="opacity-50" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5" /> Placed Bids
                  </span>
                  <span className="text-foreground font-bold">{currentUser._count?.bids || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-muted/60 bg-card/50 backdrop-blur-sm p-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm">Growth Mindset</h3>
              <p className="text-xs text-muted-foreground">Keep completing tasks to reach the next tier!</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
