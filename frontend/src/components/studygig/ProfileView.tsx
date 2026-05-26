'use client'

import { useAppStore } from '@/store/app-store'
import { ProfileBanner } from './profile/ProfileBanner'
import { ProfileStats } from './profile/ProfileStats'
import { ProfileCredentials } from './profile/ProfileCredentials'
import { ProfileSidebar } from './profile/ProfileSidebar'
import { SolverPerformance } from './profile/SolverPerformance'
import { User as UserIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const

export function ProfileView() {
  const { currentUser } = useAppStore()

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-4">
        <div className="h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center border border-border/30">
          <UserIcon className="h-9 w-9 text-muted-foreground/20" />
        </div>
        <p className="text-sm text-muted-foreground font-medium max-w-xs">
          Please select a user to view their profile details.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto pb-8 space-y-6"
    >
      {/* Banner + Identity Header */}
      <ProfileBanner user={currentUser} />

      {/* Profile Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Stats & Performance */}
        <div className="lg:col-span-2 space-y-5">
          <ProfileStats user={currentUser} />
          {currentUser.role === 'SOLVER' && (
            <SolverPerformance user={currentUser} />
          )}
        </div>

        {/* Right: Academic Preferences & Details */}
        <div className="space-y-5">
          <ProfileCredentials user={currentUser} />
          <ProfileSidebar user={currentUser} />
        </div>
      </div>
    </motion.div>
  )
}
