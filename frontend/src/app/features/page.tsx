'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { PublicHeader } from '@/components/studygig/landing/PublicHeader'
import { PublicFooter } from '@/components/studygig/landing/PublicFooter'
import { FeaturesView } from '@/components/studygig/FeaturesView'

export default function PublicFeaturesPage() {
  const router = useRouter()
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicHeader 
        onLoginClick={() => router.push('/login')} 
        onSignUpClick={() => router.push('/signup')} 
        isAuthenticated={isAuthenticated}
      />
      
      <main className="flex-1 py-12 px-6 md:px-12 bg-[#FAF7F0]/40">
        <FeaturesView />
      </main>

      <PublicFooter />
    </div>
  )
}
