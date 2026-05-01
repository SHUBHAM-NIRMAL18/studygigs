'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GraduationCap, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'

interface AuthViewProps {
  defaultTab?: 'login' | 'signup'
  onBack?: () => void
}

export function AuthView({ defaultTab = 'login', onBack }: AuthViewProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirm, setSignupConfirm] = useState('')
  const [signupRole, setSignupRole] = useState('STUDENT')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!loginEmail || !loginPassword) {
      setError('Please enter your email and password')
      return
    }
    setLoading(true)
    try {
      const normalizedEmail = loginEmail.trim().toLowerCase()
      const result = await signIn('credentials', {
        email: normalizedEmail,
        password: loginPassword,
        redirect: false,
      })
      if (!result) {
        setError('Login failed. Please try again.')
      } else if (result.error) {
        setError(result.error)
      } else if (result.ok) {
        toast({
          title: 'Login Successful',
          description: `Welcome back to StudyGig!`,
        })
        setTimeout(() => {
          router.refresh()
          window.location.reload()
        }, 1000)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!signupName || !signupEmail || !signupPassword) {
      setError('Please fill in all fields')
      return
    }
    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const normalizedEmail = signupEmail.trim().toLowerCase()
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: normalizedEmail,
          password: signupPassword,
          role: signupRole,
        })
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create account')
        return
      }

      // Auto-login after signup
      const result = await signIn('credentials', {
        email: normalizedEmail,
        password: signupPassword,
        redirect: false,
      })
      if (result?.error) {
        setError(result.error)
        return
      }
      if (result?.ok) {
        router.refresh()
        window.location.reload()
        return
      }

      setSuccess('Account created! You can now sign in.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 p-4">
      <div className="w-full max-w-md">
        {onBack && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-8 hover:bg-background/50 -ml-2 text-muted-foreground"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
        )}
        
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-primary-foreground mb-3 shadow-xl shadow-primary/20">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">StudyGig</h1>
          <p className="text-sm text-muted-foreground mt-1">Peer-to-Peer Academic Task Marketplace</p>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
            <TabsTrigger value="login" className="data-[state=active]:shadow-md">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:shadow-md">Create Account</TabsTrigger>
          </TabsList>

          {/* LOGIN */}
          <TabsContent value="login">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Welcome back</CardTitle>
                <CardDescription>Sign in to your StudyGig account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@university.edu"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SIGNUP */}
          <TabsContent value="signup">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Create your account</CardTitle>
                <CardDescription>Join StudyGig and start getting academic help</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      {success}
                    </div>
                  )}

                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label>I am a...</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSignupRole('STUDENT')}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          signupRole === 'STUDENT'
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-muted hover:border-muted-foreground/30'
                        }`}
                      >
                        <span className="text-2xl block mb-1">👩‍🎓</span>
                        <span className="text-sm font-medium">Student</span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">I need help with assignments</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSignupRole('SOLVER')}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          signupRole === 'SOLVER'
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-muted hover:border-muted-foreground/30'
                        }`}
                      >
                        <span className="text-2xl block mb-1">🧑‍💻</span>
                        <span className="text-sm font-medium">Solver</span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">I want to earn by helping</p>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@university.edu"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min 6 characters"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={signupConfirm}
                      onChange={(e) => setSignupConfirm(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Create Account
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By signing up, you agree to StudyGig&apos;s Terms of Service and Privacy Policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
