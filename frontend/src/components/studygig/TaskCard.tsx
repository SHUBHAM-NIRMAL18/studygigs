import { Task } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Clock, DollarSign, MessageSquare, Users, GraduationCap, ChevronRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const categoryColors: Record<string, string> = {
  MATH: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  CS: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  SCIENCE: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  ENGLISH: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  HISTORY: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  BUSINESS: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  LAW: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  MEDICINE: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
  OTHER: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
}

const statusColors: Record<string, string> = {
  OPEN: 'bg-emerald-500/10 text-emerald-600',
  BIDDING: 'bg-amber-500/10 text-amber-600',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-600',
  REVIEW: 'bg-indigo-500/10 text-indigo-600',
  COMPLETED: 'bg-slate-500/10 text-slate-400',
  CANCELLED: 'bg-destructive/10 text-destructive',
  DISPUTED: 'bg-rose-500/10 text-rose-600',
}

const levelLabels: Record<string, string> = {
  HIGH_SCHOOL: 'High School',
  UNDERGRAD: 'Undergrad',
  GRAD: 'Graduate',
  PHD: 'PhD',
}

export function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const categoryClass = categoryColors[task.category] || categoryColors.OTHER
  const statusClass = statusColors[task.status] || 'bg-slate-500/10 text-slate-600'

  return (
    <Card
      className="group cursor-pointer border border-muted/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30 overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="p-6 space-y-4">
          {/* Top meta */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${categoryClass}`}>
              {task.category}
            </Badge>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                <GraduationCap className="h-3 w-3" />
                {levelLabels[task.academicLevel] || task.academicLevel}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {task.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* Budget pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/5 border border-primary/10 text-primary font-bold text-sm">
            <DollarSign className="h-4 w-4" />
            <span>${task.budgetMin} – ${task.budgetMax}</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-muted/30 border-t flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-5 w-5 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <Avatar className="h-full w-full">
                      <AvatarFallback className="text-[8px] bg-primary/10 text-primary">U</AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
              <span className="ml-1">{task._count?.bids || task.bids?.length || 0} Bids</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatDistanceToNow(new Date(task.deadline), { addSuffix: false })} left</span>
            </div>
          </div>
          
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <ChevronRight className="h-4 w-4" />
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
