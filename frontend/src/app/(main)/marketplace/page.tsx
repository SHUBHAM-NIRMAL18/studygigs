import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplace — StudyGig',
  description: 'Browse thousands of academic tasks. Find assignments to solve and earn money on StudyGig.',
}

import { MarketplaceView } from '@/components/studygig/MarketplaceView'

export default function MarketplacePage() {
  return <MarketplaceView />
}
