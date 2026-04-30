'use client'

import { useEffect, useState } from 'react'
import { useAppStore, Bid } from '@/store/app-store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Gavel, DollarSign, Clock, Eye, CheckCircle, XCircle,
  Hourglass, Star, TrendingUp
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const bidStatusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  ACCEPTED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  WITHDRAWN: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
}

export function MyBidsView() {
  const { currentUser, setSelectedTaskId, setCurrentView } = useAppStore()
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBids = async () => {
    if (!currentUser) return
    setLoading(true)
    try {
      const res = await fetch('/api/tasks?limit=100')
      const data = await res.json()
      const myBids: Bid[] = []
      for (const task of data.tasks || []) {
        for (const bid of task.bids || []) {
          if (bid.solverId === currentUser.id) {
            myBids.push({
              ...bid,
              task: { id: task.id, title: task.title, status: task.status }
            })
          }
        }
      }
      setBids(myBids)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBids()
  }, [currentUser])

  if (!currentUser) {
    return <div className="p-6 text-center text-muted-foreground">Please select a solver user to view your bids.</div>
  }

  const pendingBids = bids.filter(b => b.status === 'PENDING')
  const acceptedBids = bids.filter(b => b.status === 'ACCEPTED')
  const rejectedBids = bids.filter(b => b.status === 'REJECTED')
  const totalValue = acceptedBids.reduce((s, b) => s + b.proposedPrice, 0)

  const BidRow = ({ bid }: { bid: Bid }) => (
    <div
      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => {
        if (bid.task?.id) {
          setSelectedTaskId(bid.task.id)
          setCurrentView('task-detail')
        }
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium truncate">{bid.task?.title || 'Unknown Task'}</span>
          <Badge variant="secondary" className={`text-[10px] ${bidStatusColors[bid.status] || ''}`}>
            {bid.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{bid.message}</p>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-semibold text-primary">
            <DollarSign className="h-3 w-3" />${bid.proposedPrice}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />{bid.deliveryDays} days
          </span>
          <span>{formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true })}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
    </div>
  )

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Bids</h1>
        <p className="text-sm text-muted-foreground">Track your bids and their status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold">{bids.length}</div>
            <div className="text-xs text-muted-foreground">Total Bids</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingBids.length}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-emerald-600">{acceptedBids.length}</div>
            <div className="text-xs text-muted-foreground">Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-primary">${totalValue}</div>
            <div className="text-xs text-muted-foreground">Active Value</div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full" />)}</div>
      ) : bids.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Gavel className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No bids yet</p>
          <p className="text-sm mt-1">Browse the marketplace to find tasks to bid on</p>
          <Button className="mt-3" onClick={() => setCurrentView('marketplace')}>Browse Tasks</Button>
        </div>
      ) : (
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="gap-1"><Hourglass className="h-3.5 w-3.5" /> Pending ({pendingBids.length})</TabsTrigger>
            <TabsTrigger value="accepted" className="gap-1"><CheckCircle className="h-3.5 w-3.5" /> Accepted ({acceptedBids.length})</TabsTrigger>
            <TabsTrigger value="rejected" className="gap-1"><XCircle className="h-3.5 w-3.5" /> Rejected ({rejectedBids.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-2 mt-3">
            {pendingBids.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No pending bids</p> :
              pendingBids.map(b => <BidRow key={b.id} bid={b} />)}
          </TabsContent>
          <TabsContent value="accepted" className="space-y-2 mt-3">
            {acceptedBids.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No accepted bids</p> :
              acceptedBids.map(b => <BidRow key={b.id} bid={b} />)}
          </TabsContent>
          <TabsContent value="rejected" className="space-y-2 mt-3">
            {rejectedBids.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">No rejected bids</p> :
              rejectedBids.map(b => <BidRow key={b.id} bid={b} />)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
