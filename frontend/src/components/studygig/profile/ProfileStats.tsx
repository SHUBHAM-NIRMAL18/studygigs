'use client'

import { User } from '@/store/app-store'
import { Card, CardContent } from '@/components/ui/card'
import { Star, DollarSign, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProfileStatsProps {
  user: User
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
} as const

export function ProfileStats({ user }: ProfileStatsProps) {
  const statCards = [
    {
      label: 'Avg Rating',
      value: user.rating ? `${user.rating}/5` : '—',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Tasks Done',
      value: user.completedTasks,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Total Earned',
      value: `$${user.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'On-Time Rate',
      value: user.onTimeRate ? `${(user.onTimeRate * 100).toFixed(0)}%` : '—',
      icon: Clock,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
    },
  ]

  return (
    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
      {statCards.map(stat => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="glass-premium border-border/40">
            <CardContent className="p-4 flex items-center gap-3.5">
              <div className={`h-11 w-11 rounded-xl ${stat.bg} flex items-center justify-center shrink-0 border border-white/5`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xl font-black font-display text-foreground leading-none mb-0.5">{stat.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground leading-none">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </motion.div>
  )
}
