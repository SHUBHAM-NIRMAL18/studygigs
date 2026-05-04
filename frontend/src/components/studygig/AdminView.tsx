'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Shield, Users, FileText, DollarSign, TrendingUp, AlertTriangle,
  CheckCircle, XCircle, Eye, BarChart3
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Stats {
  totalTasks: number
  openTasks: number
  completedTasks: number
  inProgressTasks: number
  disputedTasks: number
  totalUsers: number
  totalBids: number
  totalRevenue: number
  categoryBreakdown: { category: string; count: number }[]
  levelBreakdown: { level: string; count: number }[]
}

interface DisputeInfo {
  id: string
  taskId: string
  initiatorId: string
  reason: string
  status: string
  resolution: string | null
  createdAt: string
}

export function AdminView() {
  const { currentUser, setSelectedTaskId } = useAppStore()
  const router = useRouter()
  const { toast } = useToast()
  const [stats, setStats] = useState<Stats | null>(null)
  const [disputes, setDisputes] = useState<DisputeInfo[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAdminData = async () => {
    if (currentUser?.role !== 'ADMIN') return
    setLoading(true)
    try {
      const [statsData, tasksData] = await Promise.all([
        fetch('/api/stats').then(r => r.json()),
        fetch('/api/tasks?limit=100').then(r => r.json())
      ])
      setStats(statsData)
      const allDisputes: DisputeInfo[] = []
      for (const task of tasksData.tasks || []) {
        if (task.disputes?.length) {
          for (const d of task.disputes) {
            allDisputes.push({ ...d, taskId: task.id })
          }
        }
      }
      setDisputes(allDisputes)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [currentUser])

  if (currentUser?.role !== 'ADMIN') {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <Shield className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p className="font-medium">Admin Access Required</p>
        <p className="text-sm mt-1">Switch to an admin user to access this panel</p>
      </div>
    )
  }

  const handleResolveDispute = async (disputeId: string, resolution: string) => {
    try {
      await fetch(`/api/disputes/${disputeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'RESOLVED', resolution })
      })
      toast({ title: 'Dispute resolved', description: 'The task has been marked as completed' })
      // Refresh
      const res = await fetch('/api/tasks?limit=100')
      const data = await res.json()
      const allDisputes: DisputeInfo[] = []
      for (const task of data.tasks || []) {
        if (task.disputes?.length) {
          for (const d of task.disputes) {
            allDisputes.push({ ...d, taskId: task.id })
          }
        }
      }
      setDisputes(allDisputes)
      const statsRes = await fetch('/api/stats')
      setStats(await statsRes.json())
    } catch {
      toast({ title: 'Error', description: 'Failed to resolve dispute', variant: 'destructive' })
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-6 w-6" /> Admin Panel
        </h1>
        <p className="text-sm text-muted-foreground">Platform overview and dispute management</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats?.totalTasks || 0}</div>
                  <div className="text-xs text-muted-foreground">Total Tasks</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">${stats?.totalRevenue || 0}</div>
                  <div className="text-xs text-muted-foreground">Revenue (12% fee)</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
                  <div className="text-xs text-muted-foreground">Users</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats?.disputedTasks || 0}</div>
                  <div className="text-xs text-muted-foreground">Disputes</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Status Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> Task Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Open / Bidding', value: stats?.openTasks || 0, color: 'bg-yellow-500' },
                  { label: 'In Progress / Review', value: stats?.inProgressTasks || 0, color: 'bg-blue-500' },
                  { label: 'Completed', value: stats?.completedTasks || 0, color: 'bg-emerald-500' },
                  { label: 'Disputed', value: stats?.disputedTasks || 0, color: 'bg-rose-500' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm flex-1">{item.label}</span>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Category Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stats?.categoryBreakdown.map(c => (
                  <div key={c.category} className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{c.category}</Badge>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/60 rounded-full"
                        style={{ width: `${(c.count / (stats.totalTasks || 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium w-6 text-right">{c.count}</span>
                  </div>
                )) || <p className="text-sm text-muted-foreground">No data</p>}
              </CardContent>
            </Card>
          </div>

          {/* Disputes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-500" /> Open Disputes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {disputes.filter(d => d.status === 'OPEN' || d.status === 'UNDER_REVIEW').length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No open disputes 🎉</p>
              ) : (
                <div className="space-y-3">
                  {disputes.filter(d => d.status === 'OPEN' || d.status === 'UNDER_REVIEW').map(d => (
                    <div key={d.id} className="flex items-start gap-3 p-3 rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20">
                      <AlertTriangle className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{d.status}</Badge>
                          <span className="text-xs text-muted-foreground">Task: {d.taskId.slice(0, 8)}...</span>
                        </div>
                        <p className="text-sm">{d.reason}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="default" onClick={() => handleResolveDispute(d.id, 'Resolved in favor of poster - payment refunded')}>
                            <CheckCircle className="h-3 w-3 mr-1" /> Refund Poster
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleResolveDispute(d.id, 'Resolved in favor of solver - payment released')}>
                            <DollarSign className="h-3 w-3 mr-1" /> Pay Solver
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
