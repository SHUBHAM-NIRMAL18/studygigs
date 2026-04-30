'use client'

import { useAppStore } from '@/store/app-store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { TaskCard } from './TaskCard'
import { Skeleton } from '@/components/ui/skeleton'

export function MarketplaceView() {
  const { tasks, filters, setFilters, setSelectedTaskId, setCurrentView, isLoading } = useAppStore()

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

  const hasFilters = filters.category || filters.academicLevel || filters.status || filters.search

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Hero section */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Task Marketplace</h1>
        <p className="text-sm text-muted-foreground">Browse open assignments or find solvers for your academic tasks</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks by title or description..."
              className="pl-9"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
          </div>
          {hasFilters && (
            <Button variant="ghost" size="icon" onClick={() => setFilters({ category: '', academicLevel: '', status: '', search: '' })}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={filters.category} onValueChange={(v) => setFilters({ category: v === 'ALL' ? '' : v })}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SlidersHorizontal className="h-3 w-3 mr-1" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
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
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Levels</SelectItem>
              <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
              <SelectItem value="UNDERGRAD">Undergrad</SelectItem>
              <SelectItem value="GRAD">Graduate</SelectItem>
              <SelectItem value="PHD">PhD</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.sortBy} onValueChange={(v) => setFilters({ sortBy: v })}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="budget_high">Budget: High to Low</SelectItem>
              <SelectItem value="budget_low">Budget: Low to High</SelectItem>
              <SelectItem value="deadline">Deadline: Soonest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="space-y-3 p-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">No tasks found</p>
          <p className="text-sm mt-1">Try adjusting your filters or be the first to post a task!</p>
        </div>
      ) : (
        <>
          {openTasks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Open Tasks ({openTasks.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {openTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => {
                      setSelectedTaskId(task.id)
                      setCurrentView('task-detail')
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {otherTasks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                In Progress & Completed ({otherTasks.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {otherTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => {
                      setSelectedTaskId(task.id)
                      setCurrentView('task-detail')
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
