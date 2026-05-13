'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { GraduationCap, Loader2, Eye, EyeOff, CheckCircle2, ChevronLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { toast } = useToast()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. No token provided.')
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!password) {
      setError('Please enter a new password')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })

      if (res.ok) {
        setSuccess(true)
        toast({
          title: 'Success!',
          description: 'Your password has been reset successfully.',
          variant: 'success'
        })
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to reset password')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="bg-white border-slate-200 shadow-2xl rounded-3xl overflow-hidden text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Password Reset!</h2>
        <p className="text-slate-500 mb-8">Your password has been updated. You can now sign in with your new credentials.</p>
        <Button 
          onClick={() => router.push('/login')}
          className="w-full h-12 bg-primary text-primary-foreground font-black rounded-xl"
        >
          BACK TO LOGIN
        </Button>
      </Card>
    )
  }

  return (
    <Card className="bg-white border-slate-200 shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="pt-8 pb-4 text-center">
        <CardTitle className="text-2xl font-black text-slate-950">Reset Password</CardTitle>
        <CardDescription className="text-slate-400 text-xs">Enter your new secure password below</CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label className="text-[10px] font-black text-slate-400 uppercase ml-1">New Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-50 border-slate-200 rounded-xl h-12 text-slate-950 pr-12 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[10px] font-black text-slate-400 uppercase ml-1">Confirm New Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-slate-50 border-slate-200 rounded-xl h-12 text-slate-950 text-sm"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading || !token}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-black text-xs rounded-xl mt-4"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'UPDATE PASSWORD'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function ResetPasswordPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 items-center justify-center p-6 lg:p-12">
      <div className="w-full max-w-[460px] space-y-8">
        {/* Branding */}
        <div className="flex flex-col items-center gap-4 mb-2">
          <div 
            onClick={() => router.push('/')}
            className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center shadow-xl cursor-pointer"
          >
            <GraduationCap className="h-9 w-9 text-black" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-950">StudyGig</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Suspense fallback={
            <Card className="bg-white border-slate-200 shadow-2xl rounded-3xl p-12 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </Card>
          }>
            <ResetPasswordForm />
          </Suspense>
        </motion.div>

        <button 
          onClick={() => router.push('/login')}
          className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-slate-900 transition-all text-xs font-bold uppercase tracking-widest group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to login
        </button>
      </div>
    </div>
  )
}
