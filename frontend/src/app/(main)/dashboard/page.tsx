import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard — StudyGig',
  description: 'Your personal StudyGig dashboard. Track your tasks, bids, and earnings.',
}

import { MainDashboardView } from '@/components/studygig/MainDashboardView'

export default function DashboardPage() {
  return <MainDashboardView />
}
