'use client'

import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, SlidersHorizontal, X, Filter, LayoutGrid, List, Sparkles } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

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
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header section with glass effect */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background border p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Sparkles className="h-24 w-24" />
        </div>
        <div className="relative z-10 space-y-2 max-w-2xl">
          <Badge variant="secondary" className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold uppercase tracking-wider">
            Explore Opportunities
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Academic <span className="text-primary">Marketplace</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            Connect with expert solvers and get the academic support you need. Browse tasks, compare bids, and achieve excellence.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="sticky top-[4.5rem] z-30 flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-background/80 backdrop-blur-md border shadow-sm items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for subjects, assignments, or keywords..."
            className="h-12 pl-12 pr-4 rounded-xl border-none bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all text-base"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Select value={filters.category} onValueChange={(v) => setFilters({ category: v === 'ALL' ? '' : v })}>
            <SelectTrigger className="h-12 w-full md:w-[160px] rounded-xl bg-muted/50 border-none px-4 font-medium hover:bg-muted transition-colors">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-muted/50 shadow-xl">
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
            <SelectTrigger className="h-12 w-full md:w-[140px] rounded-xl bg-muted/50 border-none px-4 font-medium hover:bg-muted transition-colors">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-muted/50 shadow-xl">
              <SelectItem value="ALL">All Levels</SelectItem>
              <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
              <SelectItem value="UNDERGRAD">Undergrad</SelectItem>
              <SelectItem value="GRAD">Graduate</SelectItem>
              <SelectItem value="PHD">PhD</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.sortBy} onValueChange={(v) => setFilters({ sortBy: v })}>
            <SelectTrigger className="h-12 w-full md:w-[160px] rounded-xl bg-muted/50 border-none px-4 font-medium hover:bg-muted transition-colors">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-muted/50 shadow-xl">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="budget_high">Budget: High to Low</SelectItem>
              <SelectItem value="budget_low">Budget: Low to High</SelectItem>
              <SelectItem value="deadline">Deadline: Soonest</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button 
              variant="outline" 
              className="h-12 px-6 rounded-xl border-dashed hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-all"
              onClick={clearFilters}
            >
              Reset <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl border p-6 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-20 w-full" />
                <div className="flex justify-between pt-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <Filter className="h-10 w-10 text-muted-foreground opacity-20" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">No results found</h2>
              <p className="text-muted-foreground max-w-sm">We couldn't find any tasks matching your current filters. Try broadening your search or resetting the filters.</p>
            </div>
            <Button size="lg" onClick={clearFilters} className="rounded-full px-8">Clear all filters</Button>
          </div>
        ) : (
          <>
            {openTasks.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h2 className="text-xl font-bold tracking-tight">Open Opportunities</h2>
                    <Badge variant="secondary" className="rounded-full px-2.5">{openTasks.length}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {openTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => {
                        setSelectedTaskId(task.id)
                        router.push(`/tasks/${task.id}`)
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {otherTasks.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-1 bg-muted-foreground/30 rounded-full" />
                    <h2 className="text-xl font-bold tracking-tight text-muted-foreground/70">In Progress & Completed</h2>
                    <Badge variant="outline" className="rounded-full px-2.5 text-muted-foreground/70">{otherTasks.length}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80">
                  {otherTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => {
                        setSelectedTaskId(task.id)
                        router.push(`/tasks/${task.id}`)
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
