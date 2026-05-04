'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore, Task, Bid } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { StatusBadge, CategoryBadge, LevelBadge } from './TaskCard'
import { useToast } from '@/hooks/use-toast'
import {
  ArrowLeft, DollarSign, Clock, Star, Users, MessageSquare,
  Send, FileText, AlertTriangle, CheckCircle, XCircle, RotateCcw, Shield
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

export function TaskDetailView() {
  const { selectedTaskId, currentUser, setSelectedTask } = useAppStore()
  const router = useRouter()
  const { toast } = useToast()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [bidForm, setBidForm] = useState({ proposedPrice: '', deliveryDays: '', message: '' })
  const [deliverableContent, setDeliverableContent] = useState('')
  const [messageText, setMessageText] = useState('')
  const [disputeReason, setDisputeReason] = useState('')
  const [reviewRating, setReviewRating] = useState('5')
  const [reviewComment, setReviewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!selectedTaskId) return
    setLoading(true)
    fetch(`/api/tasks/${selectedTaskId}`)
      .then(res => res.json())
      .then(data => { setTask(data); setSelectedTask(data) })
      .catch(() => toast({ title: 'Error', description: 'Failed to load task', variant: 'destructive' }))
      .finally(() => setLoading(false))
  }, [selectedTaskId])

  const refreshTask = async () => {
    if (!selectedTaskId) return
    const res = await fetch(`/api/tasks/${selectedTaskId}`)
    const data = await res.json()
    setTask(data)
    setSelectedTask(data)
  }

  if (loading || !task) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.push('/marketplace')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="mt-8 text-center text-muted-foreground">Loading task details...</div>
      </div>
    )
  }

  const isPoster = currentUser?.id === task.posterId
  const acceptedBid = task.bids?.find(b => b.status === 'ACCEPTED')
  const pendingBids = task.bids?.filter(b => b.status === 'PENDING') || []
  const hasBid = task.bids?.some(b => b.solverId === currentUser?.id)
  const latestDeliverable = task.deliverables?.[0]
  const isSolver = acceptedBid?.solverId === currentUser?.id

  const handlePlaceBid = async () => {
    if (!currentUser || !bidForm.proposedPrice || !bidForm.deliveryDays || !bidForm.message) {
      toast({ title: 'Missing fields', description: 'Please fill in all bid fields', variant: 'destructive' })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, solverId: currentUser.id, ...bidForm })
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      toast({ title: 'Bid placed!', description: 'Your bid has been submitted' })
      setBidForm({ proposedPrice: '', deliveryDays: '', message: '' })
      refreshTask()
    } catch (e: unknown) {
      toast({ title: 'Error', description: e instanceof Error ? e.message : 'Failed to place bid', variant: 'destructive' })
    } finally { setSubmitting(false) }
  }

  const handleAcceptBid = async (bidId: string) => {
    setSubmitting(true)
    try {
      await fetch(`/api/bids/${bidId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACCEPTED' })
      })
      toast({ title: 'Bid accepted!', description: 'The solver has been notified. Funds are in escrow.' })
      refreshTask()
    } catch {
      toast({ title: 'Error', description: 'Failed to accept bid', variant: 'destructive' })
    } finally { setSubmitting(false) }
  }

  const handleSubmitDeliverable = async () => {
    if (!currentUser || !deliverableContent) return
    setSubmitting(true)
    try {
      await fetch('/api/deliverables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, solverId: currentUser.id, content: deliverableContent })
      })
      toast({ title: 'Deliverable submitted!', description: 'The poster will review your work' })
      setDeliverableContent('')
      refreshTask()
    } catch {
      toast({ title: 'Error', description: 'Failed to submit deliverable', variant: 'destructive' })
    } finally { setSubmitting(false) }
  }

  const handleDeliverableAction = async (deliverableId: string, status: string) => {
    setSubmitting(true)
    try {
      await fetch(`/api/deliverables/${deliverableId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      const msg = status === 'APPROVED' ? 'Payment released! Task completed.' :
        status === 'REVISION_REQUESTED' ? 'Revision requested. Solver will be notified.' :
        'Deliverable rejected. Task cancelled.'
      toast({ title: msg })
      refreshTask()
    } catch {
      toast({ title: 'Error', description: 'Failed to update deliverable', variant: 'destructive' })
    } finally { setSubmitting(false) }
  }

  const handleSendMessage = async () => {
    if (!currentUser || !messageText) return
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, senderId: currentUser.id, content: messageText })
      })
      setMessageText('')
      refreshTask()
    } catch {
      toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' })
    }
  }

  const handleOpenDispute = async () => {
    if (!currentUser || !disputeReason) return
    setSubmitting(true)
    try {
      await fetch('/api/disputes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, initiatorId: currentUser.id, reason: disputeReason })
      })
      toast({ title: 'Dispute opened', description: 'An admin will review your case' })
      setDisputeReason('')
      refreshTask()
    } catch {
      toast({ title: 'Error', description: 'Failed to open dispute', variant: 'destructive' })
    } finally { setSubmitting(false) }
  }

  const handleReview = async () => {
    if (!currentUser || !reviewComment) return
    setSubmitting(true)
    try {
      const revieweeId = isPoster ? (acceptedBid?.solverId || '') : task.posterId
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, reviewerId: currentUser.id, revieweeId, rating: parseInt(reviewRating), comment: reviewComment })
      })
      toast({ title: 'Review submitted!', description: 'Thank you for your feedback' })
      setReviewComment('')
      refreshTask()
    } catch {
      toast({ title: 'Error', description: 'Failed to submit review', variant: 'destructive' })
    } finally { setSubmitting(false) }
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">
      {/* Back button + header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.push('/marketplace')} className="mt-1">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <StatusBadge status={task.status} />
            <CategoryBadge category={task.category} />
            <LevelBadge level={task.academicLevel} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">{task.title}</h1>
        </div>
      </div>

      {/* Task overview */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{task.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">${task.budgetMin} – ${task.budgetMax}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Due {format(new Date(task.deadline), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{task.bids?.length || 0} bids</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>{(task.platformFee * 100).toFixed(0)}% fee</span>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs">{task.poster?.avatar || task.poster?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{task.poster?.name}</p>
              <p className="text-xs text-muted-foreground">Posted {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
            </div>
            {task.poster?.rating ? (
              <Badge variant="outline" className="text-xs ml-auto">
                <Star className="h-3 w-3 mr-0.5 fill-yellow-400 text-yellow-400" /> {task.poster.rating}
              </Badge>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Progress indicator for in-progress tasks */}
      {['IN_PROGRESS', 'REVIEW'].includes(task.status) && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Task Progress</span>
              <span className="text-xs text-muted-foreground">
                {task.status === 'REVIEW' ? 'Awaiting Review' : `Revision ${task.revisionCount}/3`}
              </span>
            </div>
            <Progress value={
              task.status === 'REVIEW' ? 80 :
              task.revisionCount === 0 ? 40 : 40 + (task.revisionCount * 15)
            } className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Main content tabs */}
      <Tabs defaultValue="bids">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="bids" className="gap-1.5">
            <Users className="h-3.5 w-3.5" /> Bids ({task.bids?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="deliverables" className="gap-1.5">
            <FileText className="h-3.5 w-3.5" /> Deliverables ({task.deliverables?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="messages" className="gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" /> Messages ({task.messages?.length || 0})
          </TabsTrigger>
        </TabsList>

        {/* BIDS TAB */}
        <TabsContent value="bids" className="space-y-3 mt-3">
          {/* Bid form for solvers */}
          {currentUser && currentUser.role !== 'ADMIN' && !isPoster && !hasBid && (task.status === 'OPEN' || task.status === 'BIDDING') && (
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Place Your Bid</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Your Price ($)</Label>
                    <Input type="number" placeholder="e.g., 120" value={bidForm.proposedPrice} onChange={(e) => setBidForm(p => ({ ...p, proposedPrice: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Delivery (days)</Label>
                    <Input type="number" placeholder="e.g., 3" value={bidForm.deliveryDays} onChange={(e) => setBidForm(p => ({ ...p, deliveryDays: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Proposal Message</Label>
                  <Textarea placeholder="Why are you the best solver for this task?" rows={3} value={bidForm.message} onChange={(e) => setBidForm(p => ({ ...p, message: e.target.value }))} />
                </div>
                <Button onClick={handlePlaceBid} disabled={submitting} size="sm">Submit Bid</Button>
              </CardContent>
            </Card>
          )}

          {/* Accepted bid highlight */}
          {acceptedBid && (
            <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Accepted Bid</span>
                </div>
                <div className="flex items-start gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-sm">{acceptedBid.solver?.avatar || acceptedBid.solver?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{acceptedBid.solver?.name}</span>
                      <Badge variant="outline" className="text-xs">
                        <Star className="h-3 w-3 mr-0.5 fill-yellow-400 text-yellow-400" /> {acceptedBid.solver?.rating}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{acceptedBid.solver?.completedTasks} completed</Badge>
                    </div>
                    <p className="text-sm mt-1">{acceptedBid.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="font-semibold text-primary text-sm">${acceptedBid.proposedPrice}</span>
                      <span>{acceptedBid.deliveryDays} days delivery</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pending bids */}
          {pendingBids.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">Pending Bids ({pendingBids.length})</h3>
              {pendingBids.map(bid => (
                <Card key={bid.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{bid.solver?.avatar || bid.solver?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{bid.solver?.name}</span>
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-3 w-3 mr-0.5 fill-yellow-400 text-yellow-400" /> {bid.solver?.rating}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{bid.solver?.completedTasks} done</Badge>
                          {bid.solver?.onTimeRate ? (
                            <Badge variant="outline" className="text-xs">{(bid.solver.onTimeRate * 100).toFixed(0)}% on-time</Badge>
                          ) : null}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{bid.message}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="font-semibold text-sm">${bid.proposedPrice}</span>
                          <span className="text-xs text-muted-foreground">{bid.deliveryDays} days</span>
                          {isPoster && (task.status === 'OPEN' || task.status === 'BIDDING') && (
                            <Button size="sm" variant="default" className="ml-auto" onClick={() => handleAcceptBid(bid.id)} disabled={submitting}>
                              Accept Bid
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {task.bids?.filter(b => b.status === 'REJECTED').length ? (
            <div className="text-xs text-muted-foreground">
              {task.bids.filter(b => b.status === 'REJECTED').length} rejected bid(s)
            </div>
          ) : null}
        </TabsContent>

        {/* DELIVERABLES TAB */}
        <TabsContent value="deliverables" className="space-y-3 mt-3">
          {/* Submit deliverable (for solver) */}
          {isSolver && (task.status === 'IN_PROGRESS') && (
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Submit Deliverable</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea placeholder="Paste your deliverable content here..." rows={6} value={deliverableContent} onChange={(e) => setDeliverableContent(e.target.value)} />
                <Button onClick={handleSubmitDeliverable} disabled={submitting || !deliverableContent} size="sm">
                  <FileText className="h-4 w-4 mr-1" /> Submit for Review
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Deliverables list */}
          {task.deliverables?.map(del => (
            <Card key={del.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Version {del.version}</span>
                    <Badge variant={
                      del.status === 'APPROVED' ? 'default' :
                      del.status === 'REVISION_REQUESTED' ? 'secondary' :
                      del.status === 'REJECTED' ? 'destructive' : 'outline'
                    } className="text-xs">
                      {del.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(del.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap bg-muted/50 rounded-lg p-3 max-h-64 overflow-y-auto">
                  {del.content}
                </div>
                {/* Poster actions */}
                {isPoster && del.status === 'SUBMITTED' && task.status === 'REVIEW' && (
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="default" onClick={() => handleDeliverableAction(del.id, 'APPROVED')} disabled={submitting}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Approve & Release Payment
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeliverableAction(del.id, 'REVISION_REQUESTED')} disabled={submitting || task.revisionCount >= 3}>
                      <RotateCcw className="h-4 w-4 mr-1" /> Request Revision ({3 - task.revisionCount} left)
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeliverableAction(del.id, 'REJECTED')} disabled={submitting}>
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {(!task.deliverables || task.deliverables.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-8">No deliverables yet</p>
          )}
        </TabsContent>

        {/* MESSAGES TAB */}
        <TabsContent value="messages" className="space-y-3 mt-3">
          <div className="max-h-80 overflow-y-auto space-y-2">
            {task.messages?.map(msg => {
              const isOwn = msg.senderId === currentUser?.id
              return (
                <div key={msg.id} className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="text-xs">{msg.sender?.avatar || msg.sender?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[70%] rounded-lg p-2.5 text-sm ${isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p className="text-xs font-medium mb-0.5">{msg.sender?.name}</p>
                    <p>{msg.content}</p>
                    <p className={`text-[10px] mt-1 ${isOwn ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })}
            {(!task.messages || task.messages.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-8">No messages yet</p>
            )}
          </div>

          {/* Send message */}
          {currentUser && (isPoster || isSolver) && task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
            <div className="flex gap-2">
              <Input placeholder="Type a message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && messageText) handleSendMessage() }} />
              <Button size="icon" onClick={handleSendMessage} disabled={!messageText}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reviews section */}
      {task.reviews && task.reviews.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4" /> Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {task.reviews.map(rev => (
              <div key={rev.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px]">{rev.reviewer?.avatar || rev.reviewer?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">{rev.reviewer?.name}</span>
                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{rev.comment}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Review form for completed tasks */}
      {task.status === 'COMPLETED' && currentUser && (isPoster || isSolver) && !task.reviews?.some(r => r.reviewerId === currentUser.id) && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Leave a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-xs">Rating:</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setReviewRating(String(n))}>
                    <Star className={`h-5 w-5 ${n <= parseInt(reviewRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} cursor-pointer`} />
                  </button>
                ))}
              </div>
            </div>
            <Textarea placeholder="Share your experience..." rows={2} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} />
            <Button size="sm" onClick={handleReview} disabled={submitting || !reviewComment}>Submit Review</Button>
          </CardContent>
        </Card>
      )}

      {/* Dispute section */}
      {currentUser && (isPoster || isSolver) && ['IN_PROGRESS', 'REVIEW'].includes(task.status) && !task.disputes?.some(d => d.status === 'OPEN') && (
        <Card className="border-rose-200 dark:border-rose-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-rose-600">
              <AlertTriangle className="h-4 w-4" /> Open Dispute
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">If there&apos;s an issue that can&apos;t be resolved, you can open a dispute for admin review.</p>
            <Textarea placeholder="Describe the issue..." rows={2} value={disputeReason} onChange={(e) => setDisputeReason(e.target.value)} />
            <Button size="sm" variant="destructive" onClick={handleOpenDispute} disabled={submitting || !disputeReason}>
              Open Dispute
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Show existing disputes */}
      {task.disputes?.filter(d => d.status === 'OPEN' || d.status === 'UNDER_REVIEW').map(d => (
        <Card key={d.id} className="border-rose-200 dark:border-rose-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium text-sm">Dispute: {d.status}</span>
            </div>
            <p className="text-sm">{d.reason}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
