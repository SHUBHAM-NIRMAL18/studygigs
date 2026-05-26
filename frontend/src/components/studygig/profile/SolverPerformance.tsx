'use client'

import { User } from '@/store/app-store'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Award } from 'lucide-react'
import { motion } from 'framer-motion'

interface SolverPerformanceProps {
  user: User
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
} as const

export function SolverPerformance({ user }: SolverPerformanceProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="glass-premium border-border/40 overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
            <Award className="h-4 w-4 text-primary" />
            Solver Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-5">
          {[
            {
              label: 'Project Completion Rate',
              value: user.completedTasks > 0 ? 98 : 0,
              display: user.completedTasks > 0 ? '98%' : 'N/A',
              color: 'text-primary',
            },
            {
              label: 'Punctuality Score',
              value: user.onTimeRate ? user.onTimeRate * 100 : 0,
              display: user.onTimeRate ? `${(user.onTimeRate * 100).toFixed(0)}%` : 'N/A',
              color: 'text-cyan-500',
            },
            {
              label: 'Quality Rating',
              value: (user.rating / 5) * 100,
              display: `${user.rating}/5.0`,
              color: 'text-amber-500',
            },
          ].map(item => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
                <span className={`text-sm font-black ${item.color}`}>{item.display}</span>
              </div>
              <Progress value={item.value} className="h-1.5 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
