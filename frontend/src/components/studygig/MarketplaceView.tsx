'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { getTaskPath } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, Filter, Store } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
} as const

export function MarketplaceView() {
  const { tasks, filters, setFilters, setSelectedTaskId, isLoading } = useAppStore()
  const router = useRouter()

  const filteredTasks = tasks.filter(task => {
    if (filters.category && task.category !== filters.category) return false
    if (filters.academicLevel && task.academicLevel !== filters.academicLevel) return false
    if (filters.status && task.status !== filters.status) return false
    if (filters.search) {
      const s = filters.search.toLowerCase()
      if (!task.title.toLowerCase().includes(s) && !task.description.toLowerCase().includes(s)) return false
    }
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (filters.sortBy) {
      case 'budget_high': return b.budgetMax - a.budgetMax
      case 'budget_low': return a.budgetMin - b.budgetMin
      case 'deadline': return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const openTasks = sortedTasks.filter(t => t.status === 'OPEN' || t.status === 'BIDDING')
  const otherTasks = sortedTasks.filter(t => t.status !== 'OPEN' && t.status !== 'BIDDING')
  const hasFilters = !!(filters.category || filters.academicLevel || filters.status || filters.search)
  const clearFilters = () => setFilters({ category: '', academicLevel: '', status: '', search: '' })

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-7xl mx-auto pb-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Store className="h-4 w-4 text-primary" />
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-black uppercase tracking-widest rounded-md px-2 py-0.5">
              Live Listings
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-display">
            Academic <span className="text-gradient font-black">Marketplace</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            Browse and bid on open academic assignments from students.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-2xl font-black text-foreground font-display">{openTasks.length}</p>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">Open Tasks</p>
          </div>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-2.5 p-3 rounded-xl bg-card/60 backdrop-blur-md border border-border/50 shadow-sm items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            className="h-9 pl-9 pr-4 rounded-lg border-border/40 bg-background/60 focus:bg-background focus-visible:ring-1 focus-visible:ring-primary/40 text-sm font-medium placeholder:text-muted-foreground/60"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Select value={filters.category} onValueChange={(v) => setFilters({ category: v === 'ALL' ? '' : v })}>
            <SelectTrigger className="h-9 w-full md:w-[130px] rounded-lg bg-background/60 border-border/40 px-3 text-[11px] font-bold uppercase tracking-tight text-foreground">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">All Subjects</SelectItem>
              <SelectItem value="MATH">Mathematics</SelectItem>
              <SelectItem value="CS">Computer Science</SelectItem>
              <SelectItem value="SCIENCE">Science</SelectItem>
              <SelectItem value="ENGLISH">English</SelectItem>
              <SelectItem value="HISTORY">History</SelectItem>
              <SelectItem value="BUSINESS">Business</SelectItem>
              <SelectItem value="LAW">Law</SelectItem>
              <SelectItem value="MEDICINE">Medicine</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.academicLevel} onValueChange={(v) => setFilters({ academicLevel: v === 'ALL' ? '' : v })}>
            <SelectTrigger className="h-9 w-full md:w-[110px] rounded-lg bg-background/60 border-border/40 px-3 text-[11px] font-bold uppercase tracking-tight text-foreground">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="ALL">All Levels</SelectItem>
              <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
              <SelectItem value="UNDERGRAD">Undergrad</SelectItem>
              <SelectItem value="GRAD">Graduate</SelectItem>
              <SelectItem value="PHD">PhD</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.sortBy} onValueChange={(v) => setFilters({ sortBy: v })}>
            <SelectTrigger className="h-9 w-full md:w-[130px] rounded-lg bg-background/60 border-border/40 px-3 text-[11px] font-bold uppercase tracking-tight text-foreground">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="budget_high">Budget: High→Low</SelectItem>
              <SelectItem value="budget_low">Budget: Low→High</SelectItem>
              <SelectItem value="deadline">Deadline: Soonest</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 rounded-lg border border-dashed border-border/60 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-all"
              onClick={clearFilters}
            >
              Reset <X className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>
      </motion.div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-2xl border border-border/40 p-5 space-y-4 bg-card/40">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-16 w-full" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedTasks.length === 0 ? (
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-5">
          <div className="h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/30">
            <Filter className="h-9 w-9 text-muted-foreground/30" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-extrabold font-display tracking-tight">No results found</h2>
            <p className="text-sm text-muted-foreground max-w-sm font-medium">
              No tasks match your current filters. Try broadening your search.
            </p>
          </div>
          <Button size="sm" onClick={clearFilters} className="rounded-lg font-bold text-xs uppercase tracking-wider px-6 h-9">
            Clear Filters
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-10">
          {openTasks.length > 0 && (
            <motion.div variants={containerVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-1 bg-primary rounded-full" />
                <h2 className="text-base font-extrabold tracking-tight font-display text-foreground">Open Opportunities</h2>
                <Badge className="rounded-full bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-black px-2">
                  {openTasks.length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {openTasks.map(task => (
                  <motion.div key={task.id} variants={itemVariants}>
                    <TaskCard
                      task={task}
                      onClick={() => {
                        setSelectedTaskId(task.id)
                        router.push(getTaskPath(task))
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {otherTasks.length > 0 && (
            <motion.div variants={containerVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-1 bg-muted-foreground/20 rounded-full" />
                <h2 className="text-base font-extrabold tracking-tight font-display text-muted-foreground/70">In Progress & Completed</h2>
                <Badge variant="outline" className="rounded-full text-[9px] font-black px-2 text-muted-foreground/60">
                  {otherTasks.length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 opacity-70">
                {otherTasks.map(task => (
                  <motion.div key={task.id} variants={itemVariants}>
                    <TaskCard
                      task={task}
                      onClick={() => {
                        setSelectedTaskId(task.id)
                        router.push(getTaskPath(task))
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  )
}
