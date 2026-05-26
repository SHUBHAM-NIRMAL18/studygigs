'use client'

import { User } from '@/store/app-store'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { levelLabels, qualLabels } from './profile-constants'
import { Award } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProfileCredentialsProps {
  user: User
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
} as const

export function ProfileCredentials({ user }: ProfileCredentialsProps) {
  const onbData = user.onboardingData || {}

  return (
    <motion.div variants={itemVariants}>
      <Card className="glass-premium border-border/40">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
            <Award className="h-4 w-4 text-primary" />
            {user.role === 'STUDENT' ? 'Academic Information' : 'Professional Credentials'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          {user.role === 'STUDENT' ? (
            <>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Academic Level</span>
                <Badge variant="secondary" className="font-bold text-xs bg-[#FAF7F0] border border-border/20 text-foreground">
                  {levelLabels[onbData.academicLevel] || onbData.academicLevel || 'Undergraduate'}
                </Badge>
              </div>
              <Separator className="opacity-30" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Field of Study</span>
                <span className="font-bold text-foreground text-xs">{onbData.studyField || 'General Studies'}</span>
              </div>
              <Separator className="opacity-30" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Max Task Budget</span>
                <span className="font-black text-primary text-xs">${onbData.budgetMax || 150}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Highest Qualification</span>
                <Badge variant="secondary" className="font-bold text-xs bg-[#FAF7F0] border border-border/20 text-foreground">
                  {qualLabels[onbData.qualification] || onbData.qualification || 'Bachelors'}
                </Badge>
              </div>
              <Separator className="opacity-30" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Experience</span>
                <span className="font-bold text-foreground text-xs">{onbData.experience || '1-3 years'}</span>
              </div>
              <Separator className="opacity-30" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Availability</span>
                <span className="font-bold text-foreground text-xs">{onbData.availability || '10-20 hours'}</span>
              </div>
              <Separator className="opacity-30" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Hourly Bid Guide</span>
                <span className="font-black text-primary text-xs">${onbData.hourlyRate || 35} / hr</span>
              </div>
            </>
          )}

          <Separator className="opacity-30" />
          <div className="space-y-2">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">Specialized Subjects</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {onbData.subjects && Array.isArray(onbData.subjects) && onbData.subjects.length > 0 ? (
                onbData.subjects.map((s: string) => (
                  <Badge key={s} variant="outline" className="text-[9px] font-black border-[#D4A97A]/20 bg-[#FAF7F0]/40 text-[#6B4226] uppercase">
                    {s}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground/60 italic font-medium">None selected</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
