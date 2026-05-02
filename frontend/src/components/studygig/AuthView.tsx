'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ChevronLeft,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface AuthViewProps {
  defaultTab?: 'login' | 'signup'
  onBack?: () => void
}

export function AuthView({ defaultTab = 'login', onBack }: AuthViewProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab)
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
      setError('Required fields are missing')
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
        setError('Login failed')
      } else if (result.error) {
        setError(result.error)
      } else if (result.ok) {
        toast({ title: 'Success', description: 'Redirecting...' })
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    } catch {
      setError('Error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!signupName || !signupEmail || !signupPassword) {
      setError('All fields are required')
      return
    }
    if (signupPassword !== signupConfirm) {
      setError('Passwords mismatch')
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
      
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Signup failed')
        return
      }

      setSuccess('Account created!')
      await signIn('credentials', {
        email: normalizedEmail,
        password: signupPassword,
        callbackUrl: '/',
      })
    } catch {
      setError('Error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#020205] overflow-hidden">
      
      {/* LEFT: Branding */}
      <div className="hidden md:flex relative w-1/2 flex-col justify-center px-16 lg:px-24 bg-[#030308] border-r border-white/5">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(147,51,234,0.1)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
        </div>

        {onBack && (
          <button 
            onClick={onBack}
            className="absolute top-10 left-16 flex items-center gap-2 text-white/40 hover:text-white transition-all text-xs font-bold uppercase tracking-widest z-20 group"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Home
          </button>
        )}

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          {/* Solid White Logo with Black Icon */}
          <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            <GraduationCap className="h-9 w-9 text-black" />
          </div>
          
          <h1 className="text-6xl font-black text-white leading-[0.9] tracking-tighter mb-6">
            ACHIEVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">GREATNESS.</span>
          </h1>
          
          <p className="text-white/40 text-lg max-w-sm mb-10 leading-relaxed font-medium">
            Connect with verified experts and master your academic journey with the world's most secure marketplace.
          </p>

          <div className="flex gap-8 opacity-60">
            <ShieldCheck className="h-6 w-6 text-white" />
            <Sparkles className="h-6 w-6 text-white" />
            <Zap className="h-6 w-6 text-white" />
          </div>
        </motion.div>
      </div>

      {/* RIGHT: Auth Container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[400px]"
        >
          {/* Logo for mobile */}
          <div className="md:hidden flex justify-center mb-8">
             <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <GraduationCap className="h-7 w-7 text-black" />
             </div>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={(v) => setActiveTab(v as any)} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 p-1 bg-white/[0.04] backdrop-blur-md rounded-xl mb-6 border border-white/10">
              <TabsTrigger 
                value="login" 
                className="rounded-lg py-2.5 text-xs font-black transition-all data-[state=active]:bg-white data-[state=active]:text-black text-white/80"
              >
                SIGN IN
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="rounded-lg py-2.5 text-xs font-black transition-all data-[state=active]:bg-white data-[state=active]:text-black text-white/80"
              >
                JOIN NOW
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white/[0.02] border-white/10 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-3xl">
                  <CardHeader className="pt-8 pb-4 text-center">
                    <CardTitle className="text-2xl font-black text-white">
                      {activeTab === 'login' ? 'Welcome Back' : 'Get Started'}
                    </CardTitle>
                    <CardDescription className="text-white/20 text-xs">
                      {activeTab === 'login' ? 'Login to your account' : 'Join our expert community'}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-8 pb-8 space-y-4">
                    {error && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold text-center">
                        {error}
                      </div>
                    )}

                    {activeTab === 'login' ? (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                          <Label className="text-[10px] font-black text-white/40 uppercase ml-1">Email</Label>
                          <Input
                            type="email"
                            placeholder="name@university.edu"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="bg-white/[0.05] border-white/10 rounded-xl h-12 text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <Label className="text-[10px] font-black text-white/40 uppercase ml-1">Password</Label>
                            <button type="button" className="text-[10px] text-purple-400 font-bold">FORGOT?</button>
                          </div>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              className="bg-white/[0.05] border-white/10 rounded-xl h-12 text-white pr-12 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <Button 
                          type="submit" 
                          disabled={loading}
                          className="w-full h-12 bg-white text-black hover:bg-white/90 font-black text-xs rounded-xl mt-2"
                        >
                          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'SIGN IN'}
                        </Button>
                      </form>
                    ) : (
                      <form onSubmit={handleSignup} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setSignupRole('STUDENT')}
                            className={cn(
                              "py-2 rounded-lg border-2 text-[10px] font-black transition-all",
                              signupRole === 'STUDENT' ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/5"
                            )}
                          >
                            STUDENT
                          </button>
                          <button
                            type="button"
                            onClick={() => setSignupRole('SOLVER')}
                            className={cn(
                              "py-2 rounded-lg border-2 text-[10px] font-black transition-all",
                              signupRole === 'SOLVER' ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/5"
                            )}
                          >
                            SOLVER
                          </button>
                        </div>
                        <Input
                          placeholder="Full Name"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="bg-white/[0.05] border-white/10 h-11 text-white rounded-xl text-sm"
                        />
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="bg-white/[0.05] border-white/10 h-11 text-white rounded-xl text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="password"
                            placeholder="Password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            className="bg-white/[0.05] border-white/10 h-11 text-white rounded-xl text-sm"
                          />
                          <Input
                            type="password"
                            placeholder="Confirm"
                            value={signupConfirm}
                            onChange={(e) => setSignupConfirm(e.target.value)}
                            className="bg-white/[0.05] border-white/10 h-11 text-white rounded-xl text-sm"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          disabled={loading}
                          className="w-full h-12 bg-white text-black hover:bg-white/90 font-black text-xs rounded-xl mt-2"
                        >
                          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'CREATE ACCOUNT'}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                  <div className="py-4 bg-white/[0.02] border-t border-white/5 text-center">
                     <p className="text-[8px] text-white/10 uppercase tracking-[0.5em] font-black">Secure • Private • Academic</p>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
