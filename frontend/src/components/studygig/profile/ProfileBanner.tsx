'use client'

import { User } from '@/store/app-store'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { EditProfileDialog } from '@/components/studygig/EditProfileDialog'
import { COVER_GRADIENTS } from './profile-constants'
import { isImageUrl } from '@/lib/avatar-utils'
import { Mail, Github, Linkedin, Twitter, Globe } from 'lucide-react'

interface ProfileBannerProps {
  user: User
}

export function ProfileBanner({ user }: ProfileBannerProps) {
  const roleConfig: Record<string, { label: string; color: string }> = {
    STUDENT: { label: 'Student', color: 'bg-sky-500/10 text-sky-500 border-sky-500/20' },
    SOLVER: { label: 'Solver', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    ADMIN: { label: 'Admin', color: 'bg-violet-500/10 text-violet-500 border-violet-500/20' },
  }
  const role = roleConfig[user.role] ?? { label: user.role, color: '' }

  const onbData = user.onboardingData || {}
  const socials = onbData.socialLinks || {}

  // Find active cover banner gradient classes
  const bannerId = onbData.coverBanner || 'espresso'
  const activeBanner = COVER_GRADIENTS.find(g => g.id === bannerId) || COVER_GRADIENTS[0]

  return (
    <Card className="glass-premium border-border/40 overflow-hidden relative rounded-2xl">
      {/* Cover Photo banner */}
      <div className={`h-32 md:h-40 w-full bg-gradient-to-r ${activeBanner.class} relative`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08)_0%,_transparent_50%)]" />
      </div>

      <CardContent className="p-6 md:p-8 pt-0 relative">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 md:-mt-16 mb-2">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-card shadow-2xl rounded-2xl overflow-hidden bg-background">
              {user.avatar && isImageUrl(user.avatar) ? (
                <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
              ) : null}
              <AvatarFallback className="text-3xl font-black bg-primary/10 text-primary uppercase font-display flex items-center justify-center w-full h-full">
                {user.avatar && !isImageUrl(user.avatar) ? user.avatar : (user.name?.charAt(0) || '?')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-card border-2 border-border/50 flex items-center justify-center shadow">
              <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            </div>
          </div>

          {/* Identity */}
          <div className="flex-1 text-center md:text-left space-y-2.5 pt-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h1 className="text-3xl font-extrabold tracking-tight font-display text-foreground leading-none">
                {user.name}
              </h1>
              <Badge
                variant="outline"
                className={`px-2.5 py-0.5 rounded-md text-[9px] font-black border uppercase tracking-widest ${role.color}`}
              >
                {role.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground flex items-center justify-center md:justify-start gap-1.5 font-medium leading-none">
              <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
              {user.email}
            </p>
            {user.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl italic pt-1">
                &ldquo;{user.bio}&rdquo;
              </p>
            )}

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
              {socials.github && (
                <a
                  href={socials.github.startsWith('http') ? socials.github : `https://${socials.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#FAF7F0] border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_12px_oklch(var(--primary)/0.15)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Github className="h-4.5 w-4.5" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin.startsWith('http') ? socials.linkedin : `https://${socials.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#FAF7F0] border border-border/40 flex items-center justify-center text-muted-foreground hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:shadow-[0_0_12px_rgba(0,119,181,0.15)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter.startsWith('http') ? socials.twitter : `https://${socials.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#FAF7F0] border border-border/40 flex items-center justify-center text-muted-foreground hover:text-[#1da1f2] hover:border-[#1da1f2]/50 hover:shadow-[0_0_12px_rgba(29,161,242,0.15)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Twitter className="h-4.5 w-4.5" />
                </a>
              )}
              {socials.portfolio && (
                <a
                  href={socials.portfolio.startsWith('http') ? socials.portfolio : `https://${socials.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#FAF7F0] border border-border/40 flex items-center justify-center text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/50 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Globe className="h-4.5 w-4.5" />
                </a>
              )}
              {!socials.github && !socials.linkedin && !socials.twitter && !socials.portfolio && (
                <p className="text-[10px] text-muted-foreground/60 italic font-medium pt-1">No social links added</p>
              )}
            </div>
          </div>

          {/* Edit Profile Dialog Button */}
          <div className="mt-4 md:mt-0">
            <EditProfileDialog />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
