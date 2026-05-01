'use client'

import React from 'react'
import { PublicHeader } from './PublicHeader'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { PublicFooter } from './PublicFooter'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface LandingPageProps {
  onAuthClick: (mode: 'login' | 'signup') => void
}

export function LandingPage({ onAuthClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader 
        onLoginClick={() => onAuthClick('login')} 
        onSignUpClick={() => onAuthClick('signup')} 
      />
      
      <main>
        <HeroSection onSignUpClick={() => onAuthClick('signup')} />
        
        <FeaturesSection />
        
        {/* How It Works (Quick Preview) */}
        <section id="how-it-works" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How StudyGig Works</h2>
                <div className="space-y-8 mt-10">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">1</div>
                    <div>
                      <h3 className="font-bold text-xl">Post Your Task</h3>
                      <p className="text-muted-foreground mt-1">Describe your assignment, set your deadline, and choose your budget range.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">2</div>
                    <div>
                      <h3 className="font-bold text-xl">Receive & Review Bids</h3>
                      <p className="text-muted-foreground mt-1">Qualified solvers will bid on your task. Check their profiles, ratings, and reviews.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">3</div>
                    <div>
                      <h3 className="font-bold text-xl">Deposit into Escrow</h3>
                      <p className="text-muted-foreground mt-1">Accept a bid and deposit the payment into our secure escrow. Money is only released when work is done.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">4</div>
                    <div>
                      <h3 className="font-bold text-xl">Get Quality Work</h3>
                      <p className="text-muted-foreground mt-1">Collaborate with your solver, request revisions if needed, and finalize the task!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10" />
                <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-8 shadow-2xl space-y-6">
                   <div className="flex items-center gap-3 border-b pb-4">
                      <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <div className="h-4 w-full bg-muted rounded animate-pulse" />
                      <div className="h-4 w-[90%] bg-muted rounded animate-pulse" />
                      <div className="h-4 w-[80%] bg-muted rounded animate-pulse" />
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t">
                      <div className="h-6 w-20 bg-primary/20 rounded animate-pulse" />
                      <div className="h-10 w-24 bg-primary/80 rounded-full animate-pulse" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden">
           <div className="absolute inset-0 bg-primary -z-10" />
           <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-blue-700 opacity-90 -z-10" />
           
           <div className="container mx-auto px-4 text-center text-primary-foreground space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to boost your grades?</h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Join thousands of students who are already using StudyGig to simplify their academic life.
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="h-14 px-10 text-lg rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
                onClick={() => onAuthClick('signup')}
              >
                Join StudyGig Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
           </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
