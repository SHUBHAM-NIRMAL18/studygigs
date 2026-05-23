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
  Home, Globe, FilePlus, ClipboardList, Gavel, Shield, User,
  Menu, ChevronDown, GraduationCap, LogOut, ChevronLeft, ChevronRight, Bell, Search, Sparkles,
  FileText
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems: { href: string; label: string; icon: React.ElementType; roles?: string[] }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/marketplace', label: 'Marketplace', icon: Globe },
  { href: '/post-task', label: 'Post Task', icon: FilePlus, roles: ['STUDENT', 'ADMIN'] },
  { href: '/my-tasks', label: 'My Tasks', icon: ClipboardList, roles: ['STUDENT', 'ADMIN'] },
  { href: '/my-bids', label: 'My Bids', icon: Gavel, roles: ['SOLVER', 'ADMIN'] },
  { href: '/admin', label: 'Admin Panel', icon: Shield, roles: ['ADMIN'] },
  { href: '/profile', label: 'Profile', icon: User },
]

function NavContent({ setSidebarOpen, collapsed }: {
  setSidebarOpen: (v: boolean) => void
  collapsed?: boolean
}) {
  const { currentUser, selectedTask } = useAppStore()
  const pathname = usePathname()
  const router = useRouter()

  const filteredNav = navItems.filter(
    item => !item.roles || (currentUser && item.roles.includes(currentUser.role))
  )

  // Determine active task ID and the appropriate parent navigation link
  const isTaskPage = pathname.startsWith('/tasks/')
  const taskMatches = pathname.match(/^\/tasks\/([^/]+)/)
  const activeTaskId = taskMatches ? taskMatches[1] : null

  const isMyTask = selectedTask && currentUser && selectedTask.posterId === currentUser.id
  const isMyBid = selectedTask && currentUser && selectedTask.bids?.some(b => b.solverId === currentUser.id)

  let parentHref = '/marketplace'
  if (isMyTask) {
    parentHref = '/my-tasks'
  } else if (isMyBid) {
    parentHref = '/my-bids'
  }

  return (
    <nav className="flex flex-col gap-1 p-2">
      {filteredNav.map(item => {
        const Icon = item.icon
        const isDirectActive = pathname === item.href || pathname.startsWith(item.href + '/')
        const isParentActive = isTaskPage && item.href === parentHref
        const isActive = isDirectActive || isParentActive

        const taskTitle = selectedTask && selectedTask.id === activeTaskId
          ? (selectedTask.title.length > 20 ? selectedTask.title.slice(0, 20) + '...' : selectedTask.title)
          : 'Task Details'

        return (
          <div key={item.href} className="flex flex-col">
            <button
              onClick={() => { router.push(item.href); setSidebarOpen(false) }}
              className={`group relative flex items-center ${collapsed ? 'justify-center px-0' : 'gap-2.5 px-3.5'} py-2.5 rounded-xl transition-all duration-300 ${isActive
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/40'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-primary/8 border border-primary/10 rounded-xl z-0"
                />
              )}

              <div className={`relative z-10 flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-105' : 'group-hover:scale-105 group-hover:text-primary'}`}>
                <Icon className="h-4.5 w-4.5 shrink-0" />
              </div>

              {!collapsed && (
                <span className="relative z-10 font-display font-bold text-xs uppercase tracking-wider">{item.label}</span>
              )}

              {isActive && !collapsed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3.5 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_oklch(var(--primary)_/_0.5)]"
                />
              )}
            </button>

            {/* Sub-item for active task detail pages */}
            {isParentActive && !collapsed && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 ml-4 pl-3 border-l border-[#6B4226]/20 flex flex-col gap-1 z-10"
              >
                <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#FAF7F0] border border-[#A0643A]/10 text-xs font-bold text-[#6B4226]">
                  <FileText className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate max-w-[140px]">{taskTitle}</span>
                </div>
              </motion.div>
            )}
          </div>
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
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="flex h-16 items-center justify-between gap-4 px-6 lg:px-8">
          {/* Left Area: Logo & Mobile Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                  <Menu className="h-4.5 w-4.5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 glass border-r border-border/40">
                <SheetHeader className="p-4 border-b border-border/40">
                  <Link
                    href="/"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-2 hover:opacity-80 transition-all group"
                  >
                    <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform">
                      <GraduationCap className="h-5.5 w-5.5" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight font-display">StudyGig</span>
                  </Link>
                </SheetHeader>
                <NavContent setSidebarOpen={setSidebarOpen} />
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5.5 w-5.5" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-extrabold text-lg tracking-tight font-display leading-none">StudyGig</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <Sparkles className="h-2 w-2 text-primary" />
                  <span className="text-[7px] text-muted-foreground uppercase font-black tracking-[0.22em]">Platform</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Middle Area: Centered Search Bar */}
          <div className="hidden md:flex flex-1 justify-center max-w-sm mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-accent/30 border border-transparent focus:bg-accent/40 focus:border-border transition-all text-xs outline-none font-medium"
              />
            </div>
          </div>

          {/* Right Area: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg hover:bg-accent/50 hidden sm:inline-flex">
              <Bell className="h-4.5 w-4.5 text-muted-foreground" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary border border-background" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 pl-1 pr-3 rounded-lg hover:bg-accent/50 border border-transparent hover:border-border transition-all">
                  <Avatar className="h-7 w-7 rounded-md border border-border shadow-sm">
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                      {currentUser?.name?.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start text-left">
                    <span className="text-xs font-bold leading-none">{currentUser?.name}</span>
                    <span className="text-[9px] text-muted-foreground mt-0.5 font-bold uppercase tracking-wider">{roleLabels[currentUser?.role || '']}</span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1.5 glass rounded-xl shadow-2xl border-border/40">
                <div className="px-2.5 py-3 mb-1 bg-primary/5 rounded-lg">
                  <p className="text-xs font-bold tracking-tight text-foreground">{currentUser?.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate font-medium mt-0.5">{currentUser?.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-border/40 my-1" />
                <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer rounded-lg py-2 px-2 hover:bg-accent focus:bg-accent">
                  <User className="h-3.5 w-3.5 mr-2 text-primary" />
                  <span className="font-bold text-xs">View Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/40 my-1" />
                <DropdownMenuItem
                  onSelect={(e) => { e.preventDefault(); setShowLogoutConfirm(true); }}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-lg py-2 px-2"
                >
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  <span className="font-bold text-xs">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent className="max-w-[360px] rounded-3xl border-border/40 glass p-0 overflow-hidden shadow-2xl">
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
              <LogOut className="h-6 w-6 text-destructive" />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold tracking-tight text-center">Ready to leave?</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground text-xs font-medium mt-2 text-center leading-relaxed">
                We'll be here when you're ready to tackle your next academic task.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <div className="flex gap-3 p-6 pt-0">
            <AlertDialogCancel className="flex-1 h-10 rounded-xl border-border/40 font-bold text-xs uppercase tracking-wider hover:bg-accent mt-0">
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut} className="flex-1 h-10 rounded-xl bg-destructive text-white hover:bg-destructive/90 font-bold text-xs uppercase tracking-wider shadow-lg shadow-destructive/10">
              Sign Out
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col border-r border-border bg-card transition-all duration-500 relative group z-10 ${sidebarCollapsed ? 'w-16' : 'w-64'
            }`}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
            <NavContent
              setSidebarOpen={setSidebarOpen}
              collapsed={sidebarCollapsed}
            />
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3.5 top-6 h-7 w-7 rounded-lg border border-border/40 bg-background flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:scale-105 z-20"
          >
            {sidebarCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background relative flex flex-col justify-between min-h-0">
          <div className="mx-auto w-full max-w-7xl p-6 lg:p-10 flex-1 flex flex-col justify-between">
            <div className="flex-1">
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
            
            {/* Footer placed inside scrollable main container */}
            <footer className="border-t border-border/40 pt-4 mt-8 text-center text-[9px] font-medium text-muted-foreground/60">
              <p>© 2025 StudyGig — Secured with Escrow. Peer-to-Peer Academic Excellence.</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}

