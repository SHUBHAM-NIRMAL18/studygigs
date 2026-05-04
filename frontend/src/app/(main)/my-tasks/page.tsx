import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Tasks — StudyGig',
  description: 'Manage all your posted academic tasks on StudyGig.',
}

import { MyTasksView } from '@/components/studygig/MyTasksView'

export default function MyTasksPage() {
  return <MyTasksView />
}
