'use client'

import { useAppStore } from '@/store/app-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Star, DollarSign, CheckCircle, Clock, TrendingUp,
  Mail, Award
} from 'lucide-react'

export function ProfileView() {
  const { currentUser } = useAppStore()

  if (!currentUser) {
    return <div className="p-6 text-center text-muted-foreground">Please select a user to view profile.</div>
  }

  const roleColors: Record<string, string> = {
    STUDENT: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
    SOLVER: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    ADMIN: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

      {/* Profile card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">{currentUser.avatar || currentUser.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className={`text-xs ${roleColors[currentUser.role] || ''}`}>
                  {currentUser.role}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {currentUser.email}
                </span>
              </div>
              {currentUser.bio && <p className="text-sm text-muted-foreground mt-2">{currentUser.bio}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{currentUser.rating || '—'}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{currentUser.completedTasks}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">${currentUser.totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Earnings</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-cyan-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{currentUser.onTimeRate ? `${(currentUser.onTimeRate * 100).toFixed(0)}%` : '—'}</div>
              <div className="text-xs text-muted-foreground">On-Time</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reputation Section */}
      {currentUser.role === 'SOLVER' && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-4 w-4" /> Reputation Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Completion Rate</span>
                <span className="font-medium">{currentUser.completedTasks > 0 ? '95%' : 'N/A'}</span>
              </div>
              <Progress value={currentUser.completedTasks > 0 ? 95 : 0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>On-Time Delivery</span>
                <span className="font-medium">{currentUser.onTimeRate ? `${(currentUser.onTimeRate * 100).toFixed(0)}%` : 'N/A'}</span>
              </div>
              <Progress value={currentUser.onTimeRate * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Rating</span>
                <span className="font-medium">{currentUser.rating}/5.0</span>
              </div>
              <Progress value={(currentUser.rating / 5) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Member since</span>
              <span className="font-medium text-foreground">{new Date(currentUser.createdAt).toLocaleDateString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Posted Tasks</span>
              <span className="font-medium text-foreground">{currentUser._count?.postedTasks || 0}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Placed Bids</span>
              <span className="font-medium text-foreground">{currentUser._count?.bids || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
