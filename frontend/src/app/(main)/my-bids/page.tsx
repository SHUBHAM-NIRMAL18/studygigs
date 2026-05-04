import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Bids — StudyGig',
  description: 'Track all your active and historical bids on StudyGig tasks.',
}

import { MyBidsView } from '@/components/studygig/MyBidsView'

export default function MyBidsPage() {
  return <MyBidsView />
}
