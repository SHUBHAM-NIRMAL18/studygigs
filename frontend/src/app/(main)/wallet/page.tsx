import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wallet & Escrow — StudyGig',
  description: 'Manage your StudyGig wallet, deposit funds, check transaction history, and view escrow balances.',
}

import { WalletView } from '@/components/studygig/WalletView'

export default function WalletPage() {
  return <WalletView />
}
