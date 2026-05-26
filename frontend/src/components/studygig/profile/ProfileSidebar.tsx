'use client'

import { User } from '@/store/app-store'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Calendar, Bookmark, Briefcase, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProfileSidebarProps {
  user: User
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
} as const

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  return (
    <div className="space-y-5">
      {/* Details Card */}
      <motion.div variants={itemVariants}>
        <Card className="glass-premium border-border/40">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              Profile Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5" /> Member Since
              </span>
              <span className="font-bold text-foreground text-xs">
                {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <Separator className="opacity-30" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                <Bookmark className="h-3.5 w-3.5" /> Posted Tasks
              </span>
              <span className="font-black text-foreground">{user._count?.postedTasks || 0}</span>
            </div>
            <Separator className="opacity-30" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                <Briefcase className="h-3.5 w-3.5" /> Placed Bids
              </span>
              <span className="font-black text-foreground">{user._count?.bids || 0}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Growth Mindset Card */}
      <motion.div variants={itemVariants}>
        <Card className="glass-premium border-border/40">
          <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/10">
              <TrendingUp className="h-5.5 w-5.5 text-primary" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-black text-sm text-foreground font-display">Growth Mindset</h3>
              <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                Complete more tasks to climb the ranks and unlock premium tier status.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
