'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore, Bid } from '@/store/app-store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Gavel, DollarSign, Clock, Eye, CheckCircle, XCircle,
  Hourglass, Star, TrendingUp, ChevronRight, Sparkles, Activity
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const bidStatusColors: Record<string, string> = {
  PENDING: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  ACCEPTED: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  REJECTED: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  WITHDRAWN: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
}

export function MyBidsView() {
  const { currentUser, setSelectedTaskId } = useAppStore()
  const router = useRouter()
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
      className="group flex items-center justify-between p-4 md:p-5 mb-3 rounded-2xl border border-muted/60 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/30 cursor-pointer transition-all duration-300"
      onClick={() => {
        if (bid.task?.id) {
          setSelectedTaskId(bid.task.id)
          router.push(`/tasks/${bid.task.id}`)
        }
      }}
    >
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${bidStatusColors[bid.status] || ''}`}>
            {bid.status}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true })}
          </span>
        </div>
        
        <h3 className="text-base md:text-lg font-bold truncate group-hover:text-primary transition-colors">
          {bid.task?.title || 'Unknown Task'}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
          "{bid.message}"
        </p>
        
        <div className="flex items-center gap-4 mt-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">
            <DollarSign className="h-3.5 w-3.5" />
            <span>${bid.proposedPrice}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Hourglass className="h-3.5 w-3.5" />
            <span>{bid.deliveryDays} Days Delivery</span>
          </div>
        </div>
      </div>
      
      <div className="hidden sm:flex h-10 w-10 shrink-0 rounded-full bg-muted items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        <ChevronRight className="h-5 w-5" />
      </div>
    </div>
  )

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header section with glass effect */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background border p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Gavel className="h-24 w-24" />
        </div>
        <div className="relative z-10 space-y-2 max-w-2xl">
          <Badge variant="secondary" className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold uppercase tracking-wider">
            Solver Dashboard
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            My <span className="text-primary">Proposals</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            Track the status of your bids, manage active proposals, and monitor your potential earnings all in one place.
          </p>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-card to-muted/20">
          <CardContent className="p-5 flex flex-col justify-center items-center text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
              <Activity className="h-5 w-5" />
            </div>
            <div className="text-3xl font-extrabold">{bids.length}</div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Bids</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-gradient-to-br from-amber-500/5 to-amber-500/10">
          <CardContent className="p-5 flex flex-col justify-center items-center text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center mb-1">
              <Hourglass className="h-5 w-5" />
            </div>
            <div className="text-3xl font-extrabold text-amber-600">{pendingBids.length}</div>
            <div className="text-xs font-medium text-amber-600/70 uppercase tracking-wider">Pending</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
          <CardContent className="p-5 flex flex-col justify-center items-center text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-1">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">{acceptedBids.length}</div>
            <div className="text-xs font-medium text-emerald-600/70 uppercase tracking-wider">Accepted</div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-5 flex flex-col justify-center items-center text-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-1">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="text-3xl font-extrabold text-primary">${totalValue}</div>
            <div className="text-xs font-medium text-primary/70 uppercase tracking-wider">Active Value</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Content */}
      <div className="pt-4">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full max-w-sm rounded-xl" />
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
          </div>
        ) : bids.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border rounded-3xl bg-card/50 border-dashed">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Gavel className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No bids yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">You haven't submitted any proposals yet. Browse the marketplace to find tasks that match your expertise.</p>
            <Button size="lg" className="rounded-md px-8 shadow-lg shadow-primary/20" onClick={() => router.push('/marketplace')}>
              Browse Available Tasks
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="h-12 w-full sm:w-auto p-1 bg-muted/50 rounded-xl mb-6">
              <TabsTrigger value="pending" className="rounded-lg h-full px-4 sm:px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <span className="flex items-center gap-2 font-medium">
                  <Hourglass className="h-4 w-4 text-amber-500" /> Pending <Badge variant="secondary" className="ml-1 bg-muted">{pendingBids.length}</Badge>
                </span>
              </TabsTrigger>
              <TabsTrigger value="accepted" className="rounded-lg h-full px-4 sm:px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-4 w-4 text-emerald-500" /> Accepted <Badge variant="secondary" className="ml-1 bg-muted">{acceptedBids.length}</Badge>
                </span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="rounded-lg h-full px-4 sm:px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <span className="flex items-center gap-2 font-medium">
                  <XCircle className="h-4 w-4 text-rose-500" /> Rejected <Badge variant="secondary" className="ml-1 bg-muted">{rejectedBids.length}</Badge>
                </span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-2 space-y-4">
              <TabsContent value="pending" className="focus-visible:outline-none">
                {pendingBids.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-card/30 rounded-2xl border border-dashed">No pending proposals</div>
                ) : (
                  pendingBids.map(b => <BidRow key={b.id} bid={b} />)
                )}
              </TabsContent>
              <TabsContent value="accepted" className="focus-visible:outline-none">
                {acceptedBids.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-card/30 rounded-2xl border border-dashed">No accepted proposals</div>
                ) : (
                  acceptedBids.map(b => <BidRow key={b.id} bid={b} />)
                )}
              </TabsContent>
              <TabsContent value="rejected" className="focus-visible:outline-none">
                {rejectedBids.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-card/30 rounded-2xl border border-dashed">No rejected proposals</div>
                ) : (
                  rejectedBids.map(b => <BidRow key={b.id} bid={b} />)
                )}
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </div>
  )
}
