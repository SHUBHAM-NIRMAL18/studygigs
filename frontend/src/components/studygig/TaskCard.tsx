import { Task } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Clock, DollarSign, GraduationCap, ChevronRight, Sparkles } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { motion } from 'framer-motion'

const categoryColors: Record<string, string> = {
  MATH: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  CS: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  SCIENCE: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  ENGLISH: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  HISTORY: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  BUSINESS: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  LAW: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  MEDICINE: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  OTHER: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
}

const statusColors: Record<string, string> = {
  OPEN: 'bg-emerald-500/10 text-emerald-500',
  BIDDING: 'bg-amber-500/10 text-amber-500',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-500',
  REVIEW: 'bg-indigo-500/10 text-indigo-500',
  COMPLETED: 'bg-slate-500/10 text-slate-400',
  CANCELLED: 'bg-destructive/10 text-destructive',
  DISPUTED: 'bg-rose-500/10 text-rose-500',
}

const levelLabels: Record<string, string> = {
  HIGH_SCHOOL: 'High School',
  UNDERGRAD: 'Undergrad',
  GRAD: 'Graduate',
  PHD: 'PhD',
}

export function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const categoryClass = categoryColors[task.category] || categoryColors.OTHER

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="group cursor-pointer glass-card overflow-hidden transition-all duration-500 hover:shadow-primary/10 border-white/5 dark:border-white/5"
        onClick={onClick}
      >
        <CardContent className="p-0">
          <div className="p-5 space-y-4">
            {/* Top meta */}
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${categoryClass} uppercase tracking-wider`}>
                {task.category}
              </Badge>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                {levelLabels[task.academicLevel] || task.academicLevel}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-black text-sm">
              <DollarSign className="h-4 w-4" />
              <span>${task.budgetMin} – ${task.budgetMax}</span>
            </div>
          </div>

          {/* Footer info */}
          <div className="px-5 py-4 bg-accent/5 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-5 w-5 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                       <span className="text-[8px] font-black">{String.fromCharCode(64 + i)}</span>
                    </div>
                  ))}
                </div>
                <span className="tracking-tighter">{task._count?.bids || task.bids?.length || 0} BIDS</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span className="tracking-tighter">{formatDistanceToNow(new Date(task.deadline), { addSuffix: false })} LEFT</span>
              </div>
            </div>
            
            <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const statusClass = statusColors[status] || 'bg-gray-100 text-gray-700'
  return (
    <Badge variant="secondary" className={`text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 border border-transparent ${statusClass}`}>
      <div className="h-1.5 w-1.5 rounded-full bg-current mr-2 animate-pulse" />
      {status.replace(/_/g, ' ')}
    </Badge>
  )
}

export function CategoryBadge({ category }: { category: string }) {
  const categoryClass = categoryColors[category] || categoryColors.OTHER
  return (
    <Badge variant="secondary" className={`text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 border ${categoryClass}`}>
      {category}
    </Badge>
  )
}

export function LevelBadge({ level }: { level: string }) {
  return (
    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 border-border/50 flex items-center gap-1.5">
      <Sparkles className="h-3 w-3 text-primary" />
      {levelLabels[level] || level}
    </Badge>
  )
}

