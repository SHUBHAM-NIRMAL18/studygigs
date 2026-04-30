'use client'

import React from 'react'
import { useAppStore, ViewMode } from '@/store/app-store'
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
  LayoutGrid, PlusCircle, ListTodo, Gavel, Shield, User,
  Menu, ChevronDown, GraduationCap, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const navItems: { view: ViewMode; label: string; icon: React.ElementType; roles?: string[] }[] = [
  { view: 'marketplace', label: 'Marketplace', icon: LayoutGrid },
  { view: 'post-task', label: 'Post Task', icon: PlusCircle, roles: ['STUDENT', 'ADMIN'] },
  { view: 'my-tasks', label: 'My Tasks', icon: ListTodo, roles: ['STUDENT', 'ADMIN'] },
  { view: 'my-bids', label: 'My Bids', icon: Gavel, roles: ['SOLVER', 'ADMIN'] },
  { view: 'admin', label: 'Admin Panel', icon: Shield, roles: ['ADMIN'] },
  { view: 'profile', label: 'Profile', icon: User },
]

function NavContent({ currentView, setCurrentView, setSidebarOpen, collapsed }: {
  currentView: ViewMode
  setCurrentView: (v: ViewMode) => void
  setSidebarOpen: (v: boolean) => void
  collapsed?: boolean
}) {
  const { currentUser } = useAppStore()

  const filteredNav = navItems.filter(
    item => !item.roles || (currentUser && item.roles.includes(currentUser.role))
  )

  return (
    <nav className="flex flex-col gap-1 p-3">
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2 px-3'} py-4 mb-2`}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
          <GraduationCap className="h-5 w-5" />
        </div>
        {!collapsed && <span className="text-lg font-bold tracking-tight">StudyGig</span>}
      </div>
      {filteredNav.map(item => {
        const Icon = item.icon
        const isActive = currentView === item.view
        return (
          <button
            key={item.view}
            onClick={() => { setCurrentView(item.view); setSidebarOpen(false) }}
            title={collapsed ? item.label : undefined}
            className={`flex items-center ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
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
    currentUser, currentView, setCurrentView, 
    sidebarOpen, setSidebarOpen,
    sidebarCollapsed, setSidebarCollapsed 
  } = useAppStore()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-4">
          {/* Mobile menu */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <NavContent currentView={currentView} setCurrentView={setCurrentView} setSidebarOpen={setSidebarOpen} />
            </SheetContent>
          </Sheet>

          {/* Desktop sidebar trigger + branding */}
          <div className="flex items-center gap-2 lg:hidden">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-bold">StudyGig</span>
          </div>

          <div className="flex-1" />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {currentUser?.avatar || currentUser?.name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline max-w-[120px] truncate">{currentUser?.name || 'User'}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">
                  {roleLabels[currentUser?.role || ''] || currentUser?.role || '—'}
                </Badge>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setCurrentView('profile')}
                className="cursor-pointer"
              >
                <User className="h-4 w-4 mr-2" /> View Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside 
          className={`hidden lg:block border-r bg-muted/30 transition-all duration-300 relative group ${
            sidebarCollapsed ? 'w-[68px]' : 'w-56'
          }`}
        >
          <NavContent 
            currentView={currentView} 
            setCurrentView={setCurrentView} 
            setSidebarOpen={setSidebarOpen} 
            collapsed={sidebarCollapsed}
          />
          
          {/* Collapse Toggle Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
          >
            {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-3 px-4 text-center text-xs text-muted-foreground bg-muted/30">
        <p>© 2025 StudyGig — Peer-to-Peer Academic Task Marketplace. All transactions secured with escrow.</p>
      </footer>
    </div>
  )
}
