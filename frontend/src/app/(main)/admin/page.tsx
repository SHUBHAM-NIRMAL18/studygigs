import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel — StudyGig',
  description: 'StudyGig platform administration.',
}

import { AdminView } from '@/components/studygig/AdminView'

export default function AdminPage() {
  return <AdminView />
}
