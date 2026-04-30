import { Task } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Clock, DollarSign, MessageSquare, Users } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const categoryColors: Record<string, string> = {
  MATH: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  CS: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  SCIENCE: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  ENGLISH: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  HISTORY: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  BUSINESS: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  LAW: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  MEDICINE: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  OTHER: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
}

const statusColors: Record<string, string> = {
  OPEN: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  BIDDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  REVIEW: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  COMPLETED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  DISPUTED: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
}

const levelLabels: Record<string, string> = {
  HIGH_SCHOOL: 'High School',
  UNDERGRAD: 'Undergrad',
  GRAD: 'Graduate',
  PHD: 'PhD',
}

export function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const categoryClass = categoryColors[task.category] || categoryColors.OTHER
  const statusClass = statusColors[task.status] || 'bg-gray-100 text-gray-700'

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/30 group"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className={`text-[10px] font-medium ${categoryClass}`}>
              {task.category}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {levelLabels[task.academicLevel] || task.academicLevel}
            </Badge>
          </div>
          <Badge variant="secondary" className={`text-[10px] font-medium shrink-0 ${statusClass}`}>
            {task.status.replace('_', ' ')}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {task.title}
        </h3>

        {/* Description preview */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {task.description}
        </p>

        {/* Budget */}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
          <DollarSign className="h-3.5 w-3.5" />
          ${task.budgetMin} – ${task.budgetMax}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {task._count?.bids || task.bids?.length || 0} bids
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {task._count?.messages || 0}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {task.poster && (
              <Avatar className="h-4 w-4">
                <AvatarFallback className="text-[8px]">
                  {task.poster.avatar || task.poster.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(new Date(task.deadline), { addSuffix: false })} left
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const statusClass = statusColors[status] || 'bg-gray-100 text-gray-700'
  return (
    <Badge variant="secondary" className={`text-xs font-medium ${statusClass}`}>
      {status.replace(/_/g, ' ')}
    </Badge>
  )
}

export function CategoryBadge({ category }: { category: string }) {
  const categoryClass = categoryColors[category] || categoryColors.OTHER
  return (
    <Badge variant="secondary" className={`text-xs font-medium ${categoryClass}`}>
      {category}
    </Badge>
  )
}

export function LevelBadge({ level }: { level: string }) {
  return (
    <Badge variant="outline" className="text-xs">
      {levelLabels[level] || level}
    </Badge>
  )
}
