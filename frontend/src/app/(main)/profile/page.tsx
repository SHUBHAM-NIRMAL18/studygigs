import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Profile — StudyGig',
  description: 'View and update your StudyGig profile, portfolio, and settings.',
}

import { ProfileView } from '@/components/studygig/ProfileView'

export default function ProfilePage() {
  return <ProfileView />
}
