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
  Menu, ChevronDown, GraduationCap, LogOut, ChevronLeft, ChevronRight, LayoutDashboard, Bell, Search
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const navItems: { href: string; label: string; icon: React.ElementType; roles?: string[] }[] = [
  { href: '/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/marketplace', label: 'Marketplace', icon: LayoutGrid },
  { href: '/post-task',   label: 'Post Task',   icon: PlusCircle,       roles: ['STUDENT', 'ADMIN'] },
  { href: '/my-tasks',    label: 'My Tasks',    icon: ListTodo,          roles: ['STUDENT', 'ADMIN'] },
  { href: '/my-bids',     label: 'My Bids',     icon: Gavel,             roles: ['SOLVER', 'ADMIN'] },
  { href: '/admin',       label: 'Admin Panel', icon: Shield,            roles: ['ADMIN'] },
  { href: '/profile',     label: 'Profile',     icon: User },
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
    <nav className="flex flex-col gap-2 p-4 relative z-10">
      <div className="space-y-1">
        {filteredNav.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <button
              key={item.href}
              onClick={() => { router.push(item.href); setSidebarOpen(false) }}
              title={collapsed ? item.label : undefined}
              className={`group flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-3 rounded-xl text-sm font-medium transition-all duration-300 w-full text-left relative overflow-hidden ${
                isActive
                  ? 'text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-black/90 dark:bg-white/10 backdrop-blur-md border border-white/10 transition-all rounded-xl z-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50 z-0" />
                </>
              )}
              {isActive && !collapsed && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-primary to-blue-500 rounded-r-full z-10 shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
              )}
              
              <div className={`relative z-10 flex items-center justify-center p-1.5 rounded-lg transition-all duration-300 ${isActive ? 'bg-white/10 shadow-inner' : 'group-hover:bg-background'}`}>
                <Icon className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-primary'}`} />
              </div>
              
              {!collapsed && <span className="truncate z-10 font-semibold tracking-wide">{item.label}</span>}
            </button>
          )
        })}
      </div>
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
      variant: 'success',
    })
    
    // Give the toast a moment to show before reloading
    setTimeout(async () => {
      await signOut({ redirect: false })
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/95">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          {/* Mobile menu */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-md hover:bg-muted/80">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 border-r-0 shadow-2xl">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <NavContent setSidebarOpen={setSidebarOpen} />
            </SheetContent>
          </Sheet>

          {/* Branding (Desktop & Mobile) */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-bold text-xl tracking-tight leading-none">StudyGig</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">Marketplace</span>
            </div>
          </Link>

          <div className="flex-1 flex items-center justify-end md:justify-between ml-auto">
            {/* Search Bar (Hidden on small mobile) */}
            <div className="hidden md:flex relative w-full max-w-sm ml-4 lg:ml-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search tasks, solvers, or subjects..." 
                className="w-full h-10 pl-9 pr-4 rounded-full bg-muted/50 border-transparent focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              {/* Notification Bell */}
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-md hover:bg-muted/80 hidden sm:inline-flex">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 gap-2 pl-2 pr-3 rounded-md hover:bg-muted/80 border border-transparent hover:border-border transition-all">
                    <Avatar className="h-7 w-7 border border-border shadow-sm">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                        {currentUser?.avatar || currentUser?.name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start mr-1">
                      <span className="text-sm font-semibold leading-none truncate max-w-[100px]">{currentUser?.name || 'User'}</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">{roleLabels[currentUser?.role || ''] || 'User'}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-xl">
                  <div className="px-2 py-3 mb-1 bg-muted/30 rounded-lg">
                    <p className="text-sm font-bold">{currentUser?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
                    <div className="mt-2 flex items-center">
                      <Badge variant="default" className="text-[10px] px-2 py-0 h-4">
                        {roleLabels[currentUser?.role || ''] || currentUser?.role}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push('/profile')}
                    className="cursor-pointer rounded-md py-2.5"
                  >
                    <User className="h-4 w-4 mr-2 text-muted-foreground" /> 
                    <span className="font-medium">View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setShowLogoutConfirm(true);
                    }}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer rounded-md py-2.5"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> 
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign back in to access the marketplace and your tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside 
          className={`hidden lg:flex flex-col border-r bg-card/50 backdrop-blur-sm transition-all duration-300 relative group z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] ${
            sidebarCollapsed ? 'w-[80px]' : 'w-64'
          }`}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-2 relative">
            <NavContent 
              setSidebarOpen={setSidebarOpen} 
              collapsed={sidebarCollapsed}
            />
            {/* Decorative Sidebar Background Icon */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none z-0">
              <GraduationCap className="h-64 w-64 text-primary" />
            </div>
          </div>
          
          {/* Collapse Toggle Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-24 h-6 w-6 rounded-md border border-border bg-background flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-muted hover:scale-110 z-20"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="h-3 w-3 text-muted-foreground" /> : <ChevronLeft className="h-3 w-3 text-muted-foreground" />}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background/50">
          <div className="mx-auto w-full h-full p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-3 px-4 text-center text-xs text-muted-foreground bg-muted/30">
        <p>© 2025 StudyGig — Peer-to-Peer Academic Task Marketplace. All transactions secured with escrow.</p>
      </footer>
    </div>
  )
}
