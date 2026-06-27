'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Wallet, CreditCard, ArrowUpRight, ArrowDownRight, Lock, Unlock,
  RotateCcw, Percent, Loader2, CheckCircle2, TrendingUp, Info, DollarSign,
  ArrowRightLeft, Landmark
} from 'lucide-react'
import { formatDistanceToNowSafe } from '@/lib/utils'

interface DBTransaction {
  id: string
  userId: string
  taskId: string | null
  type: string
  amount: number
  status: string
  idempotencyKey: string | null
  createdAt: string
  task?: {
    id: string
    title: string
  } | null
}

export function WalletView() {
  const { currentUser, setCurrentUser } = useAppStore()
  const { toast } = useToast()

  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<DBTransaction[]>([])
  const [loading, setLoading] = useState(true)

  // Modals state
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)

  // Forms state
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  // Credit Card state
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  // Bank transfer state
  const [bankRouting, setBankRouting] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [bankAccountName, setBankAccountName] = useState('')

  // Transaction submission states
  const [processingState, setProcessingState] = useState<'idle' | 'authorizing' | 'securing' | 'success'>('idle')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/wallet')
      if (!res.ok) {
        throw new Error('Failed to load wallet data')
      }
      const data = await res.json()
      setBalance(data.balance)
      setTransactions(data.transactions)

      // Sync balance to store User if needed
      if (currentUser && currentUser.balance !== data.balance) {
        setCurrentUser({
          ...currentUser,
          balance: data.balance
        })
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to fetch wallet info',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  // Calculate locked escrow amount from history
  const lockedEscrow = useMemo(() => {
    // Sum locks minus releases and refunds
    // But since task statuses represent current database escrow holdings,
    // we can also compute this.
    // Let's filter transactions to sum up active ESCROW_LOCKS that have not been RELEASED or REFUNDED yet.
    // Actually, we can sum user's ESCROW_LOCK transactions and subtract ESCROW_REFUNDS and ESCROW_RELEASES
    // representing active locks.
    let total = 0
    transactions.forEach(tx => {
      if (tx.type === 'ESCROW_LOCK') {
        total += tx.amount
      } else if (tx.type === 'ESCROW_RELEASE' && currentUser?.role === 'STUDENT') {
        // Released locks decrease poster's locked funds
        total -= tx.amount
      } else if (tx.type === 'ESCROW_REFUND') {
        // Refunded locks decrease poster's locked funds
        total -= tx.amount
      } else if (tx.type === 'PLATFORM_FEE') {
        // Platform fee decrements the locked amount as it is released
        total -= tx.amount
      }
    })
    return Math.max(0, total)
  }, [transactions, currentUser])

  // Format Card Number (space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    const formatted = value.match(/.{1,4}/g)?.join(' ') || ''
    if (formatted.length <= 19) {
      setCardNumber(formatted)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    if (value.length <= 5) {
      setCardExpiry(value)
    }
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 4) {
      setCardCvv(value)
    }
  }

  // Handle Mock Deposit
  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = parseFloat(depositAmount)
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({ title: 'Invalid amount', description: 'Please enter a valid deposit amount.', variant: 'destructive' })
      return
    }
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      toast({ title: 'Missing details', description: 'Please fill in all credit card fields.', variant: 'destructive' })
      return
    }

    setSubmitting(true)
    setProcessingState('authorizing')

    // Simulate Stripe/Gateway processing states
    setTimeout(() => {
      setProcessingState('securing')

      setTimeout(async () => {
        try {
          const idempotencyKey = crypto.randomUUID()
          const res = await fetch('/api/wallet/deposit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: amountNum, idempotencyKey })
          })

          const data = await res.json()
          if (!res.ok) {
            throw new Error(data.error || 'Failed to complete deposit')
          }

          setProcessingState('success')
          setBalance(data.balance)
          
          if (currentUser) {
            setCurrentUser({ ...currentUser, balance: data.balance })
          }

          toast({
            title: 'Deposit Successful',
            description: `Successfully credited $${amountNum.toFixed(2)} to your wallet.`
          })

          setTimeout(() => {
            setIsDepositOpen(false)
            setDepositAmount('')
            setCardNumber('')
            setCardName('')
            setCardExpiry('')
            setCardCvv('')
            setProcessingState('idle')
            setSubmitting(false)
            fetchWalletData() // Refresh transaction history
          }, 1500)

        } catch (err: any) {
          setProcessingState('idle')
          setSubmitting(false)
          toast({
            title: 'Deposit Failed',
            description: err.message || 'Unable to authorize credit card.',
            variant: 'destructive'
          })
        }
      }, 1500)
    }, 1200)
  }

  // Handle Mock Withdrawal
  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = parseFloat(withdrawAmount)
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({ title: 'Invalid amount', description: 'Please enter a valid amount.', variant: 'destructive' })
      return
    }
    if (amountNum > balance) {
      toast({ title: 'Insufficient balance', description: 'You cannot withdraw more than your available balance.', variant: 'destructive' })
      return
    }
    if (!bankRouting || !bankAccount || !bankAccountName) {
      toast({ title: 'Missing details', description: 'Please fill in all banking fields.', variant: 'destructive' })
      return
    }

    setSubmitting(true)
    setProcessingState('authorizing')

    setTimeout(() => {
      setProcessingState('securing')

      setTimeout(async () => {
        try {
          const idempotencyKey = crypto.randomUUID()
          const res = await fetch('/api/wallet/withdraw', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: amountNum, idempotencyKey })
          })

          const data = await res.json()
          if (!res.ok) {
            throw new Error(data.error || 'Failed to complete withdrawal')
          }

          setProcessingState('success')
          setBalance(data.balance)

          if (currentUser) {
            setCurrentUser({ ...currentUser, balance: data.balance })
          }

          toast({
            title: 'Withdrawal Initiated',
            description: `Transfer of $${amountNum.toFixed(2)} to bank account has been initiated.`
          })

          setTimeout(() => {
            setIsWithdrawOpen(false)
            setWithdrawAmount('')
            setBankRouting('')
            setBankAccount('')
            setBankAccountName('')
            setProcessingState('idle')
            setSubmitting(false)
            fetchWalletData()
          }, 1500)

        } catch (err: any) {
          setProcessingState('idle')
          setSubmitting(false)
          toast({
            title: 'Withdrawal Failed',
            description: err.message || 'Unable to process withdrawal request.',
            variant: 'destructive'
          })
        }
      }, 1500)
    }, 1200)
  }

  // Map transaction type to badge and icon styles
  const getTxTypeDetails = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return {
          icon: ArrowUpRight,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30',
          sign: '+',
          label: 'Deposit'
        }
      case 'WITHDRAW':
        return {
          icon: ArrowDownRight,
          color: 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30',
          sign: '-',
          label: 'Withdrawal'
        }
      case 'ESCROW_LOCK':
        return {
          icon: Lock,
          color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30',
          sign: '-',
          label: 'Escrow Locked'
        }
      case 'ESCROW_RELEASE':
        return {
          icon: Unlock,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30',
          sign: '+',
          label: 'Escrow Released'
        }
      case 'ESCROW_REFUND':
        return {
          icon: RotateCcw,
          color: 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30',
          sign: '+',
          label: 'Escrow Refund'
        }
      case 'PLATFORM_FEE':
        return {
          icon: Percent,
          color: 'text-gray-500 bg-gray-50 border-gray-100 dark:bg-gray-800/30 dark:border-gray-700/30',
          sign: '-',
          label: 'Platform Fee'
        }
      default:
        return {
          icon: ArrowRightLeft,
          color: 'text-gray-600 bg-gray-50 border-gray-100',
          sign: '',
          label: 'Transaction'
        }
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#2C1810] flex items-center gap-2">
          <Wallet className="h-7 w-7 text-[#6B4226]" /> Secure Wallet & Escrow
        </h1>
        <p className="text-xs md:text-sm font-semibold text-[#8B5E3C]">
          Fund tasks, receive payouts, and track guaranteed escrow transactions.
        </p>
      </div>

      {/* Wallet Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Available Balance Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF8] to-[#FAF7F0] border border-[#A0643A]/20 shadow-md shadow-[#6B4226]/5 rounded-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Wallet className="h-32 w-32" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider">AVAILABLE BALANCE</span>
              <Badge className="bg-emerald-600/10 text-emerald-800 border-emerald-500/20 border text-[10px] font-black uppercase py-0.5 px-2">ACTIVE</Badge>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-black text-[#2C1810] pt-1">
              ${balance.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            <p className="text-xs text-[#5C3D2A] font-medium leading-relaxed">
              Use this balance to fund tutor proposals instantly. Solver payouts are released directly into their available balance.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Button onClick={() => setIsDepositOpen(true)} className="btn-brown rounded-xl h-10 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                <CreditCard className="h-4 w-4" /> Deposit Funds
              </Button>
              <Button onClick={() => setIsWithdrawOpen(true)} variant="outline" className="border-[#A0643A]/25 hover:bg-[#FAF7F0] text-[#6B4226] rounded-xl h-10 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer bg-white">
                <Landmark className="h-4 w-4" /> Withdraw Payout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Escrow Lock Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF8] to-[#FAF7F0] border border-[#A0643A]/20 shadow-md shadow-[#6B4226]/5 rounded-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Lock className="h-32 w-32" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider">LOCKED IN ESCROW</span>
              <Badge className="bg-amber-600/10 text-amber-800 border-amber-500/20 border text-[10px] font-black uppercase py-0.5 px-2">PROTECTED</Badge>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-black text-[#6B4226] pt-1">
              ${lockedEscrow.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            <p className="text-xs text-[#5C3D2A] font-medium leading-relaxed">
              {currentUser?.role === 'STUDENT'
                ? "Funds safely locked for your active tasks. Tutors are notified that escrow is funded, guaranteeing they get paid once you approve their deliverables."
                : "Escrow earnings locked by students. These funds will automatically release to your wallet balance once deliverables are reviewed and approved."
              }
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#8B5E3C] font-semibold bg-[#FAF7F0] border border-[#A0643A]/10 rounded-xl px-3.5 py-2.5">
              <Info className="h-4 w-4 text-[#6B4226] shrink-0" />
              <span>StudyGig Escrow safeguards all payments.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History Section */}
      <Card className="bg-[#FFFDF8] border border-[#A0643A]/15 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-[#A0643A]/10 bg-[#FAF7F0]/40 py-4 px-5">
          <CardTitle className="text-sm font-bold text-[#2C1810] flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#6B4226]" /> Ledger Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-12 text-center text-[#8B5E3C] font-medium flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-[#6B4226]" />
              <span>Loading ledger logs...</span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="py-16 text-center text-[#8B5E3C] font-medium flex flex-col items-center justify-center gap-2">
              <Info className="h-8 w-8 text-[#8B5E3C]/40 mb-1" />
              <span className="text-sm">No transaction records found</span>
              <span className="text-xs font-normal text-[#8B5E3C]/70">Your payment activity logs will display here.</span>
            </div>
          ) : (
            <div className="divide-y divide-[#A0643A]/10 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FAF7F0]/30 text-[#8B5E3C] text-[10px] font-bold uppercase tracking-wider border-b border-[#A0643A]/10">
                    <th className="py-3 px-5">Type</th>
                    <th className="py-3 px-5">Details</th>
                    <th className="py-3 px-5">Reference ID</th>
                    <th className="py-3 px-5">Date</th>
                    <th className="py-3 px-5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#A0643A]/5">
                  {transactions.map(tx => {
                    const details = getTxTypeDetails(tx.type)
                    const TxIcon = details.icon
                    const isPositive = details.sign === '+'

                    let detailText = ''
                    if (tx.type === 'DEPOSIT') detailText = 'Mock Credit Card Deposit'
                    else if (tx.type === 'WITHDRAW') detailText = 'Transfer to Bank Account'
                    else if (tx.type === 'ESCROW_LOCK') detailText = `Funded Escrow: "${tx.task?.title || 'Gig Task'}"`
                    else if (tx.type === 'ESCROW_RELEASE') detailText = `Payout released: "${tx.task?.title || 'Gig Task'}"`
                    else if (tx.type === 'ESCROW_REFUND') detailText = `Refunded task: "${tx.task?.title || 'Gig Task'}"`
                    else if (tx.type === 'PLATFORM_FEE') detailText = `Platform Fee (20%): "${tx.task?.title || 'Gig Task'}"`

                    return (
                      <tr key={tx.id} className="hover:bg-[#FAF7F0]/25 transition-colors text-xs font-medium text-[#4A3225]">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg border ${details.color}`}>
                              <TxIcon className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-bold text-[#2C1810]">{details.label}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-[#2C1810] max-w-[240px] truncate">
                          {detailText}
                        </td>
                        <td className="py-3.5 px-5 font-mono text-[10px] text-[#8B5E3C]">
                          {tx.id.toUpperCase()}
                        </td>
                        <td className="py-3.5 px-5 text-[#8B5E3C]">
                          {formatDistanceToNowSafe(tx.createdAt, { addSuffix: true })}
                        </td>
                        <td className={`py-3.5 px-5 text-right font-black text-sm ${isPositive ? 'text-emerald-600' : 'text-[#6B4226]'}`}>
                          {details.sign}${tx.amount.toFixed(2)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* DEPOSIT DIALOG (Mock Payment Gateway) */}
      <Dialog open={isDepositOpen} onOpenChange={(open) => !submitting && setIsDepositOpen(open)}>
        <DialogContent className="sm:max-w-md bg-[#FFFDF8] border border-[#A0643A]/20 rounded-2xl shadow-lg">
          
          {processingState === 'idle' ? (
            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-[#6B4226] font-black text-lg">
                  <CreditCard className="h-5 w-5" /> Mock Deposit Checkout
                </DialogTitle>
                <DialogDescription className="text-xs font-semibold text-[#8B5E3C]">
                  Configure your payment details to mock authorize standard credit cards.
                </DialogDescription>
              </DialogHeader>

              {/* Live Card Graphic Visualizer */}
              <div className="relative w-full h-40 rounded-2xl bg-gradient-to-br from-[#6B4226] to-[#A0643A] text-white p-5 flex flex-col justify-between shadow-md overflow-hidden">
                <div className="absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-white/5 pointer-events-none" />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-60">STUDYGIG WALLET CARD</p>
                    <div className="h-6 w-8 bg-amber-400/80 rounded-md mt-2 flex items-center justify-center font-bold text-black border border-amber-500/20" />
                  </div>
                  <Landmark className="h-7 w-7 text-white/40" />
                </div>
                <div className="space-y-2">
                  <div className="font-mono text-base tracking-widest font-black">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-end text-[10px]">
                    <div className="truncate pr-4 uppercase tracking-wider font-bold">
                      {cardName || 'CARDHOLDER NAME'}
                    </div>
                    <div className="shrink-0 flex gap-4 font-mono">
                      <div>
                        <span className="opacity-50 text-[8px] block uppercase font-sans">VAL THRU</span>
                        {cardExpiry || 'MM/YY'}
                      </div>
                      <div>
                        <span className="opacity-50 text-[8px] block uppercase font-sans">CVV</span>
                        {cardCvv || '•••'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#8B5E3C]">Deposit Amount ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B5E3C]" />
                    <Input
                      type="number"
                      placeholder="e.g. 150"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl pl-8 h-10 font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#8B5E3C]">Cardholder Name</Label>
                  <Input
                    placeholder="Enter Cardholder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl h-10 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#8B5E3C]">Card Number</Label>
                  <Input
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl h-10 font-mono tracking-widest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#8B5E3C]">Expiry Date</Label>
                    <Input
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl h-10 font-mono text-center"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#8B5E3C]">CVV</Label>
                    <Input
                      placeholder="e.g., 123"
                      value={cardCvv}
                      onChange={handleCvvChange}
                      type="password"
                      className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl h-10 font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-3 border-t border-[#A0643A]/10">
                <Button type="button" variant="outline" onClick={() => setIsDepositOpen(false)} className="border-[#A0643A]/20 hover:bg-[#FAF7F0] text-[#6B4226] rounded-xl h-10 cursor-pointer">
                  Cancel
                </Button>
                <Button type="submit" className="btn-brown rounded-xl h-10 px-5 text-xs font-bold uppercase tracking-wider cursor-pointer">
                  Confirm Deposit
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
              {processingState === 'authorizing' && (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-[#6B4226]" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-[#2C1810]">Authorizing Transaction</p>
                    <p className="text-xs font-semibold text-[#8B5E3C]">Connecting to secure gateway server...</p>
                  </div>
                </>
              )}
              {processingState === 'securing' && (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-[#A0643A]" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-[#2C1810]">Securing Ledger Placement</p>
                    <p className="text-xs font-semibold text-[#8B5E3C]">Writing lock to cryptographic database records...</p>
                  </div>
                </>
              )}
              {processingState === 'success' && (
                <>
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 animate-bounce" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-base text-emerald-800">Deposit Success!</p>
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 py-1 px-3 rounded-lg">
                      +${parseFloat(depositAmount).toFixed(2)} Loaded
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* WITHDRAW DIALOG */}
      <Dialog open={isWithdrawOpen} onOpenChange={(open) => !submitting && setIsWithdrawOpen(open)}>
        <DialogContent className="sm:max-w-md bg-[#FFFDF8] border border-[#A0643A]/20 rounded-2xl shadow-lg">
          
          {processingState === 'idle' ? (
            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-[#6B4226] font-black text-lg">
                  <Landmark className="h-5 w-5" /> Withdraw to Bank Account
                </DialogTitle>
                <DialogDescription className="text-xs font-semibold text-[#8B5E3C]">
                  Withdraw earnings securely to your designated bank account (ACH Transfer).
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#8B5E3C]">Withdrawal Amount ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B5E3C]" />
                    <Input
                      type="number"
                      placeholder={`Max: $${balance.toFixed(2)}`}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl pl-8 h-10 font-bold"
                    />
                  </div>
                  <span className="text-[10px] text-[#8B5E3C] font-semibold block">Available balance: ${balance.toFixed(2)}</span>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#8B5E3C]">Account Holder Name</Label>
                  <Input
                    placeholder="Enter Full Account Name"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl h-10 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#8B5E3C]">Routing Number</Label>
                    <Input
                      placeholder="9 digits"
                      value={bankRouting}
                      onChange={(e) => setBankRouting(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl h-10 font-mono text-center tracking-widest"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#8B5E3C]">Account Number</Label>
                    <Input
                      placeholder="8-12 digits"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      className="border-[#A0643A]/20 focus-visible:ring-[#6B4226] bg-white rounded-xl h-10 font-mono text-center tracking-widest"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-3 border-t border-[#A0643A]/10">
                <Button type="button" variant="outline" onClick={() => setIsWithdrawOpen(false)} className="border-[#A0643A]/20 hover:bg-[#FAF7F0] text-[#6B4226] rounded-xl h-10 cursor-pointer">
                  Cancel
                </Button>
                <Button type="submit" className="btn-brown rounded-xl h-10 px-5 text-xs font-bold uppercase tracking-wider cursor-pointer">
                  Initiate Transfer
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
              {processingState === 'authorizing' && (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-[#6B4226]" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-[#2C1810]">Authorizing ACH Payout</p>
                    <p className="text-xs font-semibold text-[#8B5E3C]">Validating routing network connections...</p>
                  </div>
                </>
              )}
              {processingState === 'securing' && (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-[#A0643A]" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-[#2C1810]">Transferring Payout</p>
                    <p className="text-xs font-semibold text-[#8B5E3C]">Sending funds to local clearing house endpoints...</p>
                  </div>
                </>
              )}
              {processingState === 'success' && (
                <>
                  <CheckCircle2 className="h-12 w-12 text-emerald-600 animate-bounce" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-base text-emerald-800">Transfer Initiated</p>
                    <p className="text-xs font-bold text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 py-1 px-3 rounded-lg">
                      -${parseFloat(withdrawAmount).toFixed(2)} Debited
                    </p>
                    <p className="text-[10px] text-[#8B5E3C] mt-2 font-semibold">Funds usually settle within 1-2 business days.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
