'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle
} from '@/components/ui/sheet'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import {
  LayoutGrid, PlusCircle, ListTodo, Gavel, Shield, User,
  Menu, ChevronDown, GraduationCap, LogOut, ChevronLeft, ChevronRight, LayoutDashboard, Bell, Search, Sparkles
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems: { href: string; label: string; icon: React.ElementType; roles?: string[] }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/marketplace', label: 'Marketplace', icon: LayoutGrid },
  { href: '/post-task', label: 'Post Task', icon: PlusCircle, roles: ['STUDENT', 'ADMIN'] },
  { href: '/my-tasks', label: 'My Tasks', icon: ListTodo, roles: ['STUDENT', 'ADMIN'] },
  { href: '/my-bids', label: 'My Bids', icon: Gavel, roles: ['SOLVER', 'ADMIN'] },
  { href: '/admin', label: 'Admin Panel', icon: Shield, roles: ['ADMIN'] },
  { href: '/profile', label: 'Profile', icon: User },
]

function NavContent({ setSidebarOpen, collapsed }: {
  setSidebarOpen: (v: boolean) => void
  collapsed?: boolean
}) {
  const { currentUser } = useAppStore()
  const pathname = usePathname()
  const router = useRouter()

  const filteredNav = navItems.filter(
    item => !item.roles || (currentUser && item.roles.includes(currentUser.role))
  )

  return (
    <nav className="flex flex-col gap-1 p-3">
      {filteredNav.map(item => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <button
            key={item.href}
            onClick={() => { router.push(item.href); setSidebarOpen(false) }}
            className={`group relative flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-2xl transition-all duration-300 ${isActive
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
          >
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-2xl z-0"
              />
            )}

            <div className={`relative z-10 flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-primary'}`}>
              <Icon className="h-5 w-5 shrink-0" />
            </div>

            {!collapsed && (
              <span className="relative z-10 font-bold text-sm tracking-tight">{item.label}</span>
            )}

            {isActive && !collapsed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-4 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_oklch(var(--primary)_/_0.5)]"
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}

const roleLabels: Record<string, string> = {
  STUDENT: 'Student',
  SOLVER: 'Solver',
  ADMIN: 'Admin',
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const {
    currentUser,
    sidebarOpen, setSidebarOpen,
    sidebarCollapsed, setSidebarCollapsed
  } = useAppStore()
  const router = useRouter()
  const { toast } = useToast()
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false)

  const handleSignOut = async () => {
    setShowLogoutConfirm(false)
    toast({
      title: 'Signed Out Successfully',
      description: 'See you again soon!',
    })

    setTimeout(async () => {
      await signOut({ redirect: false })
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 glass">
        <div className="flex h-20 items-center gap-4 px-6 lg:px-8">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0 glass border-r-border/40">
              <SheetHeader className="p-6 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="font-black text-xl tracking-tight">StudyGig</span>
                </div>
              </SheetHeader>
              <NavContent setSidebarOpen={setSidebarOpen} />
            </SheetContent>
          </Sheet>

          <Link
            href="/dashboard"
            className="flex items-center gap-3 hover:opacity-80 transition-all group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-black text-xl tracking-tighter leading-none">StudyGig</span>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="h-2 w-2 text-primary" />
                <span className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.2em]">Platform</span>
              </div>
            </div>
          </Link>

          <div className="flex-1 flex items-center justify-end md:justify-between ml-8">
            <div className="hidden md:flex relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-accent/30 border-transparent focus:bg-accent/50 focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none font-medium"
              />
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl hover:bg-accent/50 hidden sm:inline-flex">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-12 gap-3 pl-2 pr-4 rounded-2xl hover:bg-accent/50 border border-transparent hover:border-border transition-all">
                    <Avatar className="h-8 w-8 rounded-xl border border-border shadow-sm">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                        {currentUser?.name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-bold leading-none">{currentUser?.name}</span>
                      <span className="text-[10px] text-muted-foreground mt-1 font-black uppercase tracking-widest">{roleLabels[currentUser?.role || '']}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 glass rounded-2xl shadow-2xl border-border/40">
                  <div className="px-3 py-4 mb-1 bg-primary/5 rounded-xl">
                    <p className="text-sm font-black tracking-tight">{currentUser?.name}</p>
                    <p className="text-xs text-muted-foreground truncate font-medium mt-0.5">{currentUser?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-border/40 my-2" />
                  <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer rounded-xl py-3 px-3 hover:bg-accent focus:bg-accent">
                    <User className="h-4 w-4 mr-3 text-primary" />
                    <span className="font-bold text-sm">View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/40 my-2" />
                  <DropdownMenuItem
                    onSelect={(e) => { e.preventDefault(); setShowLogoutConfirm(true); }}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-xl py-3 px-3"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    <span className="font-bold text-sm">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent className="max-w-[400px] rounded-[2.5rem] border-border/40 glass p-0 overflow-hidden shadow-2xl">
          <div className="p-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-[2rem] bg-destructive/10 flex items-center justify-center mb-6">
              <LogOut className="h-8 w-8 text-destructive" />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-black tracking-tight text-center">Ready to leave?</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground text-base font-medium mt-3 text-center leading-relaxed">
                We'll be here when you're ready to tackle your next academic task.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <div className="flex gap-4 p-8 pt-0">
            <AlertDialogCancel className="flex-1 h-14 rounded-2xl border-border/40 font-black text-xs uppercase tracking-widest hover:bg-accent mt-0">
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut} className="flex-1 h-14 rounded-2xl bg-destructive text-white hover:bg-destructive/90 font-black text-xs uppercase tracking-widest shadow-xl shadow-destructive/20">
              Sign Out
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col border-r border-border/40 bg-accent/5 backdrop-blur-sm transition-all duration-500 relative group z-10 ${sidebarCollapsed ? 'w-[100px]' : 'w-72'
            }`}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-6">
            <NavContent
              setSidebarOpen={setSidebarOpen}
              collapsed={sidebarCollapsed}
            />
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-4 top-10 h-8 w-8 rounded-xl border border-border/40 bg-background flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:scale-110 z-20"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background relative">
          <div className="mx-auto w-full max-w-7xl h-full p-6 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={usePathname()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <footer className="border-t border-border/40 py-6 px-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground glass">
        <p>© 2025 StudyGig — Secured with Escrow. Peer-to-Peer Academic Excellence.</p>
      </footer>
    </div>
  )
}

