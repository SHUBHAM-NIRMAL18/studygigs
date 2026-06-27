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
  Send, FileText, AlertTriangle, CheckCircle, XCircle, RotateCcw, Shield,
  Paperclip, Trash2, Loader2, Lock, CreditCard, Wallet
} from 'lucide-react'
import { formatSafe, formatDistanceToNowSafe } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'

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

  // Acceptance & Escrow Modal states
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [selectedBidForAccept, setSelectedBidForAccept] = useState<Bid | null>(null)
  const [academicIntegrityChecked, setAcademicIntegrityChecked] = useState(false)
  const [posterBalance, setPosterBalance] = useState(0)
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [processingState, setProcessingState] = useState<'idle' | 'authorizing' | 'securing' | 'success'>('idle')

  const handleCardNumberChange = (value: string) => {
    const clean = value.replace(/\D/g, '')
    const formatted = clean.match(/.{1,4}/g)?.join(' ') || ''
    if (formatted.length <= 19) setCardNumber(formatted)
  }

  const handleExpiryChange = (value: string) => {
    let clean = value.replace(/\D/g, '')
    if (clean.length > 2) {
      clean = clean.slice(0, 2) + '/' + clean.slice(2, 4)
    }
    if (clean.length <= 5) setCardExpiry(clean)
  }

  const handleCvvChange = (value: string) => {
    const clean = value.replace(/\D/g, '')
    if (clean.length <= 4) setCardCvv(clean)
  }

  // Deliverables & Chat Attachments states
  const [deliverableAttachments, setDeliverableAttachments] = useState<{ name: string; url: string }[]>([])
  const [deliverableUploading, setDeliverableUploading] = useState(false)
  const [messageAttachments, setMessageAttachments] = useState<{ name: string; url: string }[]>([])
  const [messageUploading, setMessageUploading] = useState(false)

  useEffect(() => {
    if (!selectedTaskId) return
    setLoading(true)
    fetch(`/api/tasks/${selectedTaskId}`)
      .then(async res => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to load task')
        return data
      })
      .then(data => { setTask(data); setSelectedTask(data) })
      .catch((err) => {
        setTask(null)
        toast({ title: 'Error', description: err.message || 'Failed to load task', variant: 'destructive' })
      })
      .finally(() => setLoading(false))
  }, [selectedTaskId])

  const refreshTask = async () => {
    if (!selectedTaskId) return
    try {
      const res = await fetch(`/api/tasks/${selectedTaskId}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to refresh task')
      setTask(data)
      setSelectedTask(data)
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to refresh task', variant: 'destructive' })
    }
  }

  if (loading || !task) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.push('/marketplace')} className="w-fit h-8 rounded-xl hover:bg-[#8B5E3C]/10 text-[#6B4226] hover:text-[#5C3D2A] transition-all px-3 text-xs font-bold uppercase tracking-wider border border-[#6B4226]/10 bg-[#FFFDF8] shadow-sm cursor-pointer">
          <ArrowLeft className="h-3 w-3 mr-1.5" /> Back to Marketplace
        </Button>
        <div className="mt-12 text-center text-[#8B5E3C] font-medium flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-[#6B4226]" />
          <span>Loading task details...</span>
        </div>
      </div>
    )
  }

  const isPoster = currentUser?.id === task.posterId
  const acceptedBid = task.bids?.find(b => b.status === 'ACCEPTED')
  const pendingBids = task.bids?.filter(b => b.status === 'PENDING') || []
  const hasBid = task.bids?.some(b => b.solverId === currentUser?.id)
  const latestDeliverable = task.deliverables?.[0]
  const isSolver = acceptedBid?.solverId === currentUser?.id
  const isAdmin = currentUser?.role === 'ADMIN'

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

  const openAcceptModal = async (bid: Bid) => {
    setSelectedBidForAccept(bid)
    setAcademicIntegrityChecked(false)
    setLoadingBalance(true)
    setIsAcceptModalOpen(true)
    setIsCheckoutOpen(false)
    setCardNumber('')
    setCardName('')
    setCardExpiry('')
    setCardCvv('')
    setProcessingState('idle')

    try {
      const res = await fetch('/api/wallet')
      if (res.ok) {
        const data = await res.json()
        setPosterBalance(data.balance)
      }
    } catch (err) {
      console.error('Failed to fetch wallet info', err)
    } finally {
      setLoadingBalance(false)
    }
  }

  const handleAcceptBid = async (bidId: string) => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/bids/${bidId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACCEPTED' })
      })
      if (!res.ok) throw new Error('Failed to accept bid')
      toast({ title: 'Bid accepted!', description: 'The solver has been notified. Funds are in escrow.' })
      setIsAcceptModalOpen(false)
      setSelectedBidForAccept(null)
      refreshTask()
    } catch {
      toast({ title: 'Error', description: 'Failed to accept bid', variant: 'destructive' })
    } finally { setSubmitting(false) }
  }

  const handleDepositAndAcceptBid = async (bidId: string, depositAmountNeeded: number) => {
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      toast({ title: 'Missing card details', description: 'Please fill in all credit card fields.', variant: 'destructive' })
      return
    }

    setSubmitting(true)
    setProcessingState('authorizing')

    setTimeout(() => {
      setProcessingState('securing')

      setTimeout(async () => {
        try {
          const depositIdempotencyKey = crypto.randomUUID()
          const depositRes = await fetch('/api/wallet/deposit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: depositAmountNeeded, idempotencyKey: depositIdempotencyKey })
          })

          if (!depositRes.ok) {
            const err = await depositRes.json()
            throw new Error(err.error || 'Failed to deposit difference amount')
          }

          const res = await fetch(`/api/bids/${bidId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'ACCEPTED' })
          })

          if (!res.ok) {
            const err = await res.json()
            throw new Error(err.error || 'Failed to accept bid after funding wallet')
          }

          setProcessingState('success')
          toast({ title: 'Escrow funded and bid accepted!', description: 'Your wallet has been credited and funds are in escrow.' })

          setTimeout(() => {
            setIsAcceptModalOpen(false)
            setSelectedBidForAccept(null)
            setProcessingState('idle')
            setIsCheckoutOpen(false)
            setSubmitting(false)
            refreshTask()
          }, 1500)

        } catch (err: any) {
          setProcessingState('idle')
          setSubmitting(false)
          toast({ title: 'Transaction Failed', description: err.message || 'Failed to complete transaction', variant: 'destructive' })
        }
      }, 1500)
    }, 1200)
  }

  const handleDeliverableFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDeliverableUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      setDeliverableAttachments((prev) => [...prev, data]);
      toast({ title: 'Success', description: `File "${file.name}" uploaded successfully` });
    } catch {
      toast({ title: 'Upload error', description: 'Failed to upload attachment', variant: 'destructive' });
    } finally {
      setDeliverableUploading(false);
    }
  };

  const handleMessageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessageUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      setMessageAttachments((prev) => [...prev, data]);
      toast({ title: 'Success', description: `File "${file.name}" uploaded successfully` });
    } catch {
      toast({ title: 'Upload error', description: 'Failed to upload attachment', variant: 'destructive' });
    } finally {
      setMessageUploading(false);
    }
  };

  const handleSubmitDeliverable = async () => {
    if (!currentUser || !deliverableContent) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/deliverables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, solverId: currentUser.id, content: deliverableContent, attachments: deliverableAttachments })
      })
      if (!res.ok) throw new Error('Failed to submit deliverable')
      toast({ title: 'Deliverable submitted!', description: 'The poster will review your work' })
      setDeliverableContent('')
      setDeliverableAttachments([])
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
    if (!currentUser || (!messageText && messageAttachments.length === 0)) return
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, senderId: currentUser.id, content: messageText, attachments: messageAttachments })
      })
      setMessageText('')
      setMessageAttachments([])
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
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Back button + header */}
      <div className="flex flex-col gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push('/marketplace')} 
          className="w-fit h-8 rounded-xl hover:bg-[#8B5E3C]/10 text-[#6B4226] hover:text-[#5C3D2A] transition-all px-3 text-xs font-bold uppercase tracking-wider border border-[#6B4226]/10 bg-[#FFFDF8] shadow-sm cursor-pointer animate-fade-in-up"
        >
          <ArrowLeft className="h-3 w-3 mr-1.5" /> Back to Marketplace
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={task.status} />
              <CategoryBadge category={task.category} />
              <LevelBadge level={task.academicLevel} />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-[#2C1810]">
              {task.title}
            </h1>
          </div>
          
          <div className="flex flex-col items-start md:items-end shrink-0 bg-[#6B4226]/5 border border-[#6B4226]/10 px-4 py-2.5 rounded-2xl">
            <div className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-widest">BUDGET RANGE</div>
            <div className="text-xl md:text-2xl font-black text-[#6B4226]">${task.budgetMin} – ${task.budgetMax}</div>
          </div>
        </div>
      </div>

      {/* Task overview */}
      <Card className="bg-[#FFFDF8] border border-[#A0643A]/15 shadow-md shadow-[#6B4226]/5 overflow-hidden rounded-2xl">
        <CardContent className="p-0">
          <div className="p-5 md:p-6 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#8B5E3C] uppercase tracking-widest">DESCRIPTION</div>
              <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed font-medium text-[#4A3225]">
                {task.description}
              </p>
              
              {/* Task File Attachments display */}
              <FileAttachmentsList attachmentsJson={task.attachments} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-[#A0643A]/10">
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-widest">DEADLINE</p>
                <p className="text-sm font-extrabold text-[#2C1810] flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#6B4226]" /> {formatSafe(task.deadline, 'MMM d, yyyy')}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-widest">BIDS RECEIVED</p>
                <p className="text-sm font-extrabold text-[#2C1810] flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#6B4226]" /> {task.bids?.length || 0}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-widest">ESCROW FEE</p>
                <p className="text-sm font-extrabold text-[#2C1810] flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-[#6B4226]" /> {(task.platformFee * 100).toFixed(0)}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-widest">SECURITY</p>
                <p className="text-sm font-extrabold text-emerald-700 uppercase tracking-tight flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600" /> PROTECTED
                </p>
              </div>
            </div>
          </div>
          
          <div className="px-5 py-4 bg-[#FAF7F0] border-t border-[#A0643A]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-[#A0643A]/20 shadow-sm">
                <AvatarFallback className="text-xs bg-[#6B4226] text-[#FAF7F0] font-black">
                  {task.poster?.avatar || task.poster?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-widest">POSTER</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-[#2C1810]">{task.poster?.name}</p>
                  {task.poster?.rating && (
                    <div className="flex items-center gap-0.5 text-amber-700 font-bold text-xs bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {task.poster.rating}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider">
              {formatDistanceToNowSafe(task.createdAt, { addSuffix: true })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Progress indicator for in-progress tasks */}
      {['IN_PROGRESS', 'REVIEW'].includes(task.status) && (
        <Card className="bg-[#FFFDF8] border border-[#A0643A]/15 shadow-sm rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#2C1810]">Task Progress</span>
              <span className="text-xs font-semibold text-[#8B5E3C]">
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
      <Tabs defaultValue="bids" className="w-full">
        <TabsList className="w-full h-12 justify-start bg-[#F0EAE1] p-1.5 rounded-xl border border-[#A0643A]/10">
          <TabsTrigger value="bids" className="gap-2 px-4 h-9 rounded-lg data-[state=active]:bg-[#FFFDF8] data-[state=active]:text-[#6B4226] data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-wider text-[#8B5E3C] transition-all cursor-pointer">
            <Users className="h-3.5 w-3.5" /> PROPOSALS ({task.bids?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="deliverables" className="gap-2 px-4 h-9 rounded-lg data-[state=active]:bg-[#FFFDF8] data-[state=active]:text-[#6B4226] data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-wider text-[#8B5E3C] transition-all cursor-pointer">
            <FileText className="h-3.5 w-3.5" /> WORK ({task.deliverables?.length || 0})
          </TabsTrigger>
          {(isPoster || isSolver || isAdmin) && (
            <TabsTrigger value="messages" className="gap-2 px-4 h-9 rounded-lg data-[state=active]:bg-[#FFFDF8] data-[state=active]:text-[#6B4226] data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-wider text-[#8B5E3C] transition-all cursor-pointer">
              <MessageSquare className="h-3.5 w-3.5" /> CHAT ({task.messages?.length || 0})
            </TabsTrigger>
          )}
        </TabsList>

        {/* BIDS TAB */}
        <TabsContent value="bids" className="space-y-4 mt-4">
          {/* Bid form for solvers */}
          {currentUser && currentUser.role !== 'ADMIN' && !isPoster && !hasBid && (task.status === 'OPEN' || task.status === 'BIDDING') && (
            <Card className="border border-[#C4874F]/30 bg-[#FFFDF8] rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold text-[#2C1810] flex items-center justify-between">
                  <span>Place Your Bid</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Confidentiality notice callout */}
                <div className="rounded-xl border border-[#C4874F]/20 bg-[#C4874F]/5 p-4 text-sm flex items-start gap-3">
                  <Lock className="h-5 w-5 text-[#6B4226] shrink-0 mt-0.5" />
                  <div className="text-[#5C3D2A] leading-relaxed">
                    <strong className="text-[#6B4226] font-bold">Confidential Proposal:</strong> Your proposal message, budget offer, and timeline are 100% private. Other tutors cannot view your bid, preventing undercutting.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#8B5E3C]">Your Price ($)</Label>
                    <Input type="number" placeholder="e.g., 120" value={bidForm.proposedPrice} onChange={(e) => setBidForm(p => ({ ...p, proposedPrice: e.target.value }))} className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#8B5E3C]">Delivery (days)</Label>
                    <Input type="number" placeholder="e.g., 3" value={bidForm.deliveryDays} onChange={(e) => setBidForm(p => ({ ...p, deliveryDays: e.target.value }))} className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#8B5E3C]">Proposal Message</Label>
                  <Textarea placeholder="Why are you the best solver for this task?" rows={3} value={bidForm.message} onChange={(e) => setBidForm(p => ({ ...p, message: e.target.value }))} className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl" />
                </div>
                <Button onClick={handlePlaceBid} disabled={submitting} className="btn-brown px-5 py-2.5 h-10 rounded-xl font-bold text-xs uppercase tracking-wider w-full md:w-auto cursor-pointer">Submit Bid</Button>
              </CardContent>
            </Card>
          )}

          {/* Accepted bid highlight */}
          {acceptedBid && (
            <Card className="border-2 border-emerald-600/20 bg-emerald-50/40 rounded-2xl shadow-sm p-5">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-emerald-700" />
                  <span className="text-sm font-bold text-emerald-800">Accepted Bid</span>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border border-emerald-600/20 shadow-sm">
                    <AvatarFallback className="text-xs bg-emerald-700 text-white font-bold">{acceptedBid.solver?.avatar || acceptedBid.solver?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-[#2C1810]">{acceptedBid.solver?.name}</span>
                      <div className="flex items-center gap-0.5 text-amber-700 font-bold text-xs bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {acceptedBid.solver?.rating}
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 border-emerald-600/20 bg-white">{acceptedBid.solver?.completedTasks} completed</Badge>
                    </div>
                    <p className="text-sm text-[#4A3225] mt-2 font-medium bg-white/60 p-3 rounded-xl border border-emerald-600/10 italic">"{acceptedBid.message}"</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">ACCEPTED PRICE</span>
                        <span className="font-black text-[#6B4226] text-lg">${acceptedBid.proposedPrice}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">TIMELINE</span>
                        <span className="font-bold text-[#2C1810] text-sm uppercase">{acceptedBid.deliveryDays} days delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pending bids */}
          {pendingBids.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#8B5E3C] uppercase tracking-wider">Pending Bids ({pendingBids.length})</h3>
              {pendingBids.map(bid => (
                <Card key={bid.id} className="bg-[#FFFDF8] border border-[#A0643A]/15 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border border-[#A0643A]/20 shadow-sm">
                        <AvatarFallback className="text-xs bg-[#6B4226] text-[#FAF7F0] font-bold">{bid.solver?.avatar || bid.solver?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="font-bold text-sm tracking-tight text-[#2C1810]">{bid.solver?.name}</span>
                          <div className="flex items-center gap-0.5 text-amber-700 font-bold text-xs bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {bid.solver?.rating}
                          </div>
                          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-[#6B4226] border-[#A0643A]/20 bg-[#FAF7F0]">{bid.solver?.completedTasks} DONE</Badge>
                          {bid.solver?.onTimeRate ? (
                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-[#6B4226] border-[#A0643A]/20 bg-[#FAF7F0]">{(bid.solver.onTimeRate * 100).toFixed(0)}% ON-TIME</Badge>
                          ) : null}
                        </div>
                        <p className="text-sm text-[#4A3225] font-medium leading-relaxed italic bg-[#FAF7F0]/60 p-3 rounded-xl border border-[#A0643A]/5">"{bid.message}"</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-widest">OFFER PRICE</span>
                              <span className="font-black text-[#6B4226] text-lg">${bid.proposedPrice}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-[#8B5E3C] uppercase tracking-widest">EST. DELIVERY</span>
                              <span className="font-black text-sm text-[#2C1810] uppercase">{bid.deliveryDays} DAYS</span>
                            </div>
                          </div>
                          {isPoster && (task.status === 'OPEN' || task.status === 'BIDDING') && (
                            <Button size="sm" className="btn-brown rounded-xl font-bold text-xs uppercase tracking-wider h-10 px-4 cursor-pointer" onClick={() => openAcceptModal(bid)} disabled={submitting}>
                              ACCEPT PROPOSAL
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
            <div className="text-xs font-semibold text-[#8B5E3C] italic mt-2">
              {task.bids.filter(b => b.status === 'REJECTED').length} rejected bid(s)
            </div>
          ) : null}
        </TabsContent>

        {/* DELIVERABLES TAB */}
        <TabsContent value="deliverables" className="space-y-4 mt-4">
          {/* Submit deliverable (for solver) */}
          {isSolver && (task.status === 'IN_PROGRESS') && (
            <Card className="border border-[#C4874F]/20 bg-[#FFFDF8] rounded-2xl shadow-sm p-5">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-base font-bold text-[#2C1810]">Submit Deliverable</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#8B5E3C]">Deliverable Explanation</Label>
                  <Textarea placeholder="Paste your deliverable explanations, code blocks, or links here..." rows={6} value={deliverableContent} onChange={(e) => setDeliverableContent(e.target.value)} className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl" />
                </div>

                {/* Deliverable File Upload */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-[#8B5E3C]">
                    <Paperclip className="h-3.5 w-3.5 text-[#6B4226]" /> Attach Work Files
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input id="del-file-upload" type="file" className="hidden" onChange={handleDeliverableFileUpload} disabled={deliverableUploading} />
                    <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('del-file-upload')?.click()} disabled={deliverableUploading} className="border-[#A0643A]/20 hover:bg-[#FAF7F0] text-[#6B4226] rounded-xl cursor-pointer">
                      {deliverableUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Paperclip className="h-4 w-4 mr-2" />
                          Upload File
                        </>
                      )}
                    </Button>
                    <span className="text-xs text-[#8B5E3C] font-medium">PDF, Word, Code Zip (Max 10MB)</span>
                  </div>
                  {deliverableAttachments.length > 0 && (
                    <div className="space-y-1.5 mt-2">
                      {deliverableAttachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl border border-[#A0643A]/10 bg-[#FAF7F0] hover:bg-[#F0EAE1] transition-colors">
                          <span className="truncate font-medium max-w-[240px] text-[#2C1810]">{file.name}</span>
                          <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg cursor-pointer" onClick={() => setDeliverableAttachments(prev => prev.filter((_, i) => i !== idx))}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button onClick={handleSubmitDeliverable} disabled={submitting || !deliverableContent || deliverableUploading} className="btn-brown h-10 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
                  <FileText className="h-4 w-4" /> Submit for Review
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Deliverables list */}
          {task.deliverables?.map(del => (
            <Card key={del.id} className="bg-[#FFFDF8] border border-[#A0643A]/15 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-4 md:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2C1810]">Version {del.version}</span>
                    <Badge variant={
                      del.status === 'APPROVED' ? 'default' :
                      del.status === 'REVISION_REQUESTED' ? 'secondary' :
                      del.status === 'REJECTED' ? 'destructive' : 'outline'
                    } className="text-xs rounded-lg px-2.5 py-0.5">
                      {del.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-[#8B5E3C]">
                    {formatDistanceToNowSafe(del.createdAt, { addSuffix: true })}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-wrap bg-[#FAF7F0] border border-[#A0643A]/10 rounded-xl p-4 max-h-64 overflow-y-auto font-medium text-[#4A3225] leading-relaxed">
                  {del.content}
                </div>
                
                {/* Deliverable File attachments */}
                <FileAttachmentsList attachmentsJson={del.attachments} />

                {/* Poster actions */}
                {isPoster && del.status === 'SUBMITTED' && task.status === 'REVIEW' && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button size="sm" className="btn-brown h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer" onClick={() => handleDeliverableAction(del.id, 'APPROVED')} disabled={submitting}>
                      <CheckCircle className="h-4 w-4" /> Approve & Release Payment
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#A0643A]/20 hover:bg-[#FAF7F0] text-[#6B4226] h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer" onClick={() => handleDeliverableAction(del.id, 'REVISION_REQUESTED')} disabled={submitting || task.revisionCount >= 3}>
                      <RotateCcw className="h-4 w-4" /> Request Revision ({3 - task.revisionCount} left)
                    </Button>
                    <Button size="sm" variant="destructive" className="h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer" onClick={() => handleDeliverableAction(del.id, 'REJECTED')} disabled={submitting}>
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {(!task.deliverables || task.deliverables.length === 0) && (
            <p className="text-sm font-semibold text-[#8B5E3C] text-center py-8">No deliverables yet</p>
          )}
        </TabsContent>

        {/* MESSAGES TAB */}
        <TabsContent value="messages" className="space-y-4 mt-4">
          <div className="max-h-[400px] overflow-y-auto space-y-3 p-3 bg-[#FAF7F0] rounded-2xl border border-[#A0643A]/10 shadow-inner animate-fade-in-up">
            {task.messages?.map(msg => {
              const isOwn = msg.senderId === currentUser?.id
              return (
                <div key={msg.id} className={`flex gap-2.5 ${isOwn ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 border border-[#A0643A]/20 shadow-sm shrink-0">
                    <AvatarFallback className="text-xs bg-[#6B4226] text-[#FAF7F0] font-bold">{msg.sender?.avatar || msg.sender?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${isOwn ? 'bg-[#6B4226] text-[#FAF7F0] rounded-tr-sm' : 'bg-[#FFFDF8] text-[#2C1810] border border-[#A0643A]/10 rounded-tl-sm'}`}>
                    <p className="text-[10px] font-bold mb-1 opacity-80">{msg.sender?.name}</p>
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    
                    {/* Chat Attachments display */}
                    <FileAttachmentsList attachmentsJson={msg.attachments} />

                    <p className={`text-[9px] mt-1.5 font-bold ${isOwn ? 'text-[#FAF7F0]/60' : 'text-[#8B5E3C]'}`}>
                      {formatDistanceToNowSafe(msg.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })}
            {(!task.messages || task.messages.length === 0) && (
              <p className="text-sm font-semibold text-[#8B5E3C] text-center py-8">No messages yet</p>
            )}
          </div>

          {/* Send message */}
          {currentUser && (isPoster || isSolver) && task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
            <div className="space-y-2 animate-fade-in-up">
              {messageAttachments.length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-2 bg-[#FAF7F0] rounded-xl border border-[#A0643A]/10 animate-fade-in-up">
                  {messageAttachments.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[10px] bg-white border border-[#A0643A]/10 px-2 py-0.5 rounded-lg font-bold text-[#6B4226]">
                      <span className="truncate max-w-[120px]">{file.name}</span>
                      <button type="button" className="text-rose-500 hover:text-rose-700 font-bold ml-1 cursor-pointer" onClick={() => setMessageAttachments(prev => prev.filter((_, i) => i !== idx))}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Input id="chat-file-upload" type="file" className="hidden" onChange={handleMessageFileUpload} disabled={messageUploading} />
                <Button type="button" variant="outline" size="icon" className="shrink-0 h-10 w-10 border-[#A0643A]/20 text-[#6B4226] hover:bg-[#FAF7F0] rounded-xl cursor-pointer" onClick={() => document.getElementById('chat-file-upload')?.click()} disabled={messageUploading}>
                  {messageUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-[#6B4226]" />
                  ) : (
                    <Paperclip className="h-4 w-4" />
                  )}
                </Button>
                <Input placeholder="Type a message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && (messageText || messageAttachments.length > 0)) handleSendMessage() }} className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-[#FFFDF8] rounded-xl h-10" />
                <Button size="icon" className="btn-brown h-10 w-10 shrink-0 rounded-xl cursor-pointer animate-pulse" onClick={handleSendMessage} disabled={(!messageText && messageAttachments.length === 0) || messageUploading}>
                  <Send className="h-4 w-4 text-[#FAF7F0]" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reviews section */}
      {task.reviews && task.reviews.length > 0 && (
        <Card className="bg-[#FFFDF8] border border-[#A0643A]/15 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-[#2C1810] flex items-center gap-2">
              <Star className="h-4 w-4 text-[#6B4226]" /> Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {task.reviews.map(rev => (
              <div key={rev.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F0] border border-[#A0643A]/10">
                <Avatar className="h-7 w-7 border border-[#A0643A]/20 shadow-sm shrink-0">
                  <AvatarFallback className="text-[10px] bg-[#6B4226] text-[#FAF7F0] font-bold">{rev.reviewer?.avatar || rev.reviewer?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#2C1810]">{rev.reviewer?.name}</span>
                    <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-200'}`} />
                    ))}</div>
                  </div>
                  <p className="text-sm text-[#4A3225] font-medium mt-1 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Review form for completed tasks */}
      {task.status === 'COMPLETED' && currentUser && (isPoster || isSolver) && !task.reviews?.some(r => r.reviewerId === currentUser.id) && (
        <Card className="bg-[#FFFDF8] border border-[#A0643A]/15 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-[#2C1810]">Leave a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Label className="text-xs font-bold text-[#8B5E3C]">Rating:</Label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setReviewRating(String(n))} className="cursor-pointer transition-transform hover:scale-110">
                    <Star className={`h-6 w-6 ${n <= parseInt(reviewRating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>
            <Textarea placeholder="Share your experience..." rows={2} value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl" />
            <Button size="sm" onClick={handleReview} disabled={submitting || !reviewComment} className="btn-brown h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer">Submit Review</Button>
          </CardContent>
        </Card>
      )}

      {/* Dispute section */}
      {currentUser && (isPoster || isSolver) && ['IN_PROGRESS', 'REVIEW'].includes(task.status) && !task.disputes?.some(d => d.status === 'OPEN') && (
        <Card className="border border-rose-200 bg-rose-50/20 rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2 text-rose-800">
              <AlertTriangle className="h-4 w-4" /> Open Dispute
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs font-semibold text-rose-700">If there&apos;s an issue that can&apos;t be resolved, you can open a dispute for admin review.</p>
            <Textarea placeholder="Describe the issue..." rows={2} value={disputeReason} onChange={(e) => setDisputeReason(e.target.value)} className="border-rose-200 focus-visible:ring-rose-500 bg-white rounded-xl" />
            <Button size="sm" variant="destructive" onClick={handleOpenDispute} disabled={submitting || !disputeReason} className="h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer">
              Open Dispute
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Show existing disputes */}
      {task.disputes?.filter(d => d.status === 'OPEN' || d.status === 'UNDER_REVIEW').map(d => (
        <Card key={d.id} className="border border-rose-200 bg-rose-50/30 rounded-2xl shadow-sm">
          <CardContent className="p-4 md:p-5">
            <div className="flex items-center gap-2 text-rose-700 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-bold text-sm">Dispute Status: {d.status}</span>
            </div>
            <p className="text-sm font-medium text-[#4A3225] leading-relaxed italic bg-white/60 p-3 rounded-xl border border-rose-100">"{d.reason}"</p>
          </CardContent>
        </Card>
      ))}

      {/* Agreement and Escrow Dialog */}
      <Dialog open={isAcceptModalOpen} onOpenChange={(open) => !submitting && setIsAcceptModalOpen(open)}>
        <DialogContent className="sm:max-w-md bg-[#FFFDF8] border border-[#A0643A]/20 rounded-2xl shadow-lg max-h-[90vh] overflow-y-auto">
          {processingState !== 'idle' ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
              {processingState === 'authorizing' && (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-[#6B4226]" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-[#2C1810]">Authorizing Checkout Payment</p>
                    <p className="text-xs font-semibold text-[#8B5E3C]">Connecting to secure gateway server...</p>
                  </div>
                </>
              )}
              {processingState === 'securing' && (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-[#A0643A]" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-[#2C1810]">Funding Wallet & Escrow</p>
                    <p className="text-xs font-semibold text-[#8B5E3C]">Allocating lock amount of ${selectedBidForAccept?.proposedPrice.toFixed(2)}...</p>
                  </div>
                </>
              )}
              {processingState === 'success' && (
                <>
                  <CheckCircle className="h-12 w-12 text-emerald-600 animate-bounce" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-base text-emerald-800">Escrow Funded & Accepted!</p>
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 py-1 px-3 rounded-lg">
                      Proposal Active
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-[#6B4226] font-black text-lg">
                  <Shield className="h-5 w-5 text-[#6B4226]" /> StudyGig Escrow Protection
                </DialogTitle>
                <DialogDescription className="text-xs font-semibold text-[#8B5E3C]">
                  Confirm contract parameters and academic integrity guidelines before accepting this proposal.
                </DialogDescription>
              </DialogHeader>

              {selectedBidForAccept && (
                <div className="space-y-4 my-2">
                  <div className="rounded-xl border border-[#A0643A]/15 bg-[#FAF7F0] p-4 space-y-2.5 text-sm text-[#4A3225]">
                    <div className="flex justify-between font-medium">
                      <span className="text-[#8B5E3C]">Selected Tutor:</span>
                      <span className="font-bold text-[#2C1810]">{selectedBidForAccept.solver?.name}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-[#8B5E3C]">Tutor Offer Price:</span>
                      <span className="font-extrabold text-[#6B4226]">${selectedBidForAccept.proposedPrice}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-[#8B5E3C]">Delivery Duration:</span>
                      <span className="font-bold text-[#2C1810]">{selectedBidForAccept.deliveryDays} Days</span>
                    </div>
                  </div>

                  <div className="text-xs leading-relaxed text-[#5C3D2A] space-y-2 bg-[#FAF7F0]/40 p-3 rounded-xl border border-[#A0643A]/5">
                    <p>
                      <strong>🔒 Safe Bidding Escrow:</strong> Once accepted, the proposed price (${selectedBidForAccept.proposedPrice}) will be locked in StudyGig Escrow.
                    </p>
                    <p>
                      <strong>💰 Release Payout:</strong> Tutors are paid *after* you approve their deliverables. You have 3 revision rounds to ensure quality.
                    </p>
                  </div>

                  {/* Academic Integrity Checkbox */}
                  <div className="flex items-start space-x-2 pt-1">
                    <Checkbox
                      id="integrity-check"
                      checked={academicIntegrityChecked}
                      onCheckedChange={(checked) => setAcademicIntegrityChecked(!!checked)}
                      className="border-[#A0643A]/30 data-[state=checked]:bg-[#6B4226] data-[state=checked]:text-[#FAF7F0] mt-0.5 cursor-pointer"
                    />
                    <label
                      htmlFor="integrity-check"
                      className="text-xs font-semibold leading-tight text-[#4A3225] cursor-pointer select-none"
                    >
                      I confirm that this task complies with StudyGig&apos;s Academic Integrity Guidelines. I will use the deliverables strictly for tutoring and study assistance.
                    </label>
                  </div>

                  {/* Balance details */}
                  {loadingBalance ? (
                    <div className="flex items-center gap-2 text-xs text-[#8B5E3C] py-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-[#6B4226]" />
                      <span>Checking wallet balance...</span>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-3 border-t border-[#A0643A]/10">
                      <div className="flex justify-between items-center text-xs font-bold text-[#4A3225]">
                        <span>Your Wallet Balance:</span>
                        <span className={posterBalance >= selectedBidForAccept.proposedPrice ? "text-emerald-700 font-extrabold" : "text-rose-700 font-extrabold"}>
                          ${posterBalance.toFixed(2)}
                        </span>
                      </div>

                      {posterBalance < selectedBidForAccept.proposedPrice && (
                        <div className="space-y-3">
                          {/* Warning message */}
                          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-3 text-xs text-[#6B4226] space-y-1 font-medium">
                            <p className="font-extrabold text-rose-800 flex items-center gap-1.5">
                              <AlertTriangle className="h-4 w-4 text-rose-700 shrink-0" /> Insufficient Funds
                            </p>
                            <p className="text-[11px] leading-relaxed">
                              You need an additional <strong>${(selectedBidForAccept.proposedPrice - posterBalance).toFixed(2)}</strong> to accept this bid. Enter credit card details below to fund and accept.
                            </p>
                          </div>

                          {/* Card Checkout fields directly inside */}
                          <div className="space-y-2.5 p-3 rounded-xl border border-[#A0643A]/15 bg-white shadow-inner">
                            <div className="space-y-1">
                              <Label className="text-[10px] font-bold text-[#8B5E3C]">Cardholder Name</Label>
                              <Input
                                placeholder="Enter Cardholder Name"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-lg h-8 text-xs font-semibold"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-[10px] font-bold text-[#8B5E3C]">Card Number</Label>
                              <Input
                                placeholder="4111 2222 3333 4444"
                                value={cardNumber}
                                onChange={(e) => handleCardNumberChange(e.target.value)}
                                className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-lg h-8 text-xs font-mono tracking-wider"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label className="text-[10px] font-bold text-[#8B5E3C]">Expiry Date</Label>
                                <Input
                                  placeholder="MM/YY"
                                  value={cardExpiry}
                                  onChange={(e) => handleExpiryChange(e.target.value)}
                                  className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-lg h-8 text-xs font-mono text-center"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-[10px] font-bold text-[#8B5E3C]">CVV</Label>
                                <Input
                                  placeholder="CVV"
                                  value={cardCvv}
                                  onChange={(e) => handleCvvChange(e.target.value)}
                                  type="password"
                                  className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-lg h-8 text-xs font-mono text-center"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <DialogFooter className="flex sm:justify-end gap-2 pt-2 border-t border-[#A0643A]/10">
                <Button variant="outline" size="sm" onClick={() => setIsAcceptModalOpen(false)} className="border-[#A0643A]/20 hover:bg-[#FAF7F0] text-[#6B4226] rounded-xl cursor-pointer">
                  Cancel
                </Button>
                {selectedBidForAccept && posterBalance < selectedBidForAccept.proposedPrice ? (
                  <Button
                    size="sm"
                    disabled={!academicIntegrityChecked || submitting || loadingBalance || !cardName || !cardNumber || !cardExpiry || !cardCvv}
                    onClick={() => handleDepositAndAcceptBid(selectedBidForAccept.id, selectedBidForAccept.proposedPrice - posterBalance)}
                    className="btn-brown rounded-xl px-4 py-2 cursor-pointer font-bold text-xs uppercase tracking-wider"
                  >
                    {submitting ? 'Processing...' : 'Deposit & Fund Escrow'}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    disabled={!academicIntegrityChecked || submitting || loadingBalance}
                    onClick={() => selectedBidForAccept && handleAcceptBid(selectedBidForAccept.id)}
                    className="btn-brown rounded-xl px-4 py-2 cursor-pointer font-bold text-xs uppercase tracking-wider"
                  >
                    {submitting ? 'Accepting...' : 'Confirm & Fund Escrow'}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Reusable file attachments helper component
function FileAttachmentsList({ attachmentsJson }: { attachmentsJson: any }) {
  if (!attachmentsJson) return null;
  let attachments: { name: string; url: string }[] = [];
  try {
    attachments = typeof attachmentsJson === 'string' ? JSON.parse(attachmentsJson) : attachmentsJson;
  } catch {
    return null;
  }

  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {attachments.map((file, i) => (
        <a
          key={i}
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs bg-[#FAF7F0] hover:bg-[#F0EAE1] text-[#6B4226] border border-[#A0643A]/15 px-3 py-2 rounded-xl font-bold transition-all max-w-xs truncate shadow-sm cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5 text-[#6B4226] shrink-0" />
          <span className="truncate text-[#4A3225]">{file.name}</span>
        </a>
      ))}
    </div>
  );
}
