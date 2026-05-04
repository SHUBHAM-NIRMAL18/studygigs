import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post a Task — StudyGig',
  description: 'Post your academic task on StudyGig. Set your budget and get bids from qualified solvers.',
}

import { PostTaskView } from '@/components/studygig/PostTaskView'

export default function PostTaskPage() {
  return <PostTaskView />
}
