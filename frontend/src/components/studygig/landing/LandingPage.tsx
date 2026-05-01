'use client'

import React from 'react'
import { PublicHeader } from './PublicHeader'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { PublicFooter } from './PublicFooter'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react'

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
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">How StudyGig Works</h2>
                <div className="space-y-8 mt-10">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">1</div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground">Post Your Task</h3>
                      <p className="text-muted-foreground mt-1">Describe your assignment, set your deadline, and choose your budget range.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">2</div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground">Receive & Review Bids</h3>
                      <p className="text-muted-foreground mt-1">Qualified solvers will bid on your task. Check their profiles, ratings, and reviews.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">3</div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground">Deposit into Escrow</h3>
                      <p className="text-muted-foreground mt-1">Accept a bid and deposit the payment into our secure escrow. Money is only released when work is done.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">4</div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground">Get Quality Work</h3>
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
        <section className="py-24 relative overflow-hidden bg-primary">
           {/* Background Elements */}
           <div className="absolute inset-0 bg-[#0a0a2e]" />
           <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-indigo-950/90 to-black/90" />
           
           {/* Expert Sidebar-style Background Icon */}
           <div className="absolute -bottom-20 -right-20 opacity-10 text-white pointer-events-none -rotate-12">
              <GraduationCap className="h-[600px] w-[600px]" />
           </div>
           
           <div className="container mx-auto px-4 relative z-10 text-center space-y-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest shadow-xl">
                 <Sparkles className="h-4 w-4 text-yellow-400" />
                 <span>Join the Revolution</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  Ready to boost your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 underline decoration-yellow-500/30">
                    grades?
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                  Join thousands of students who are already using StudyGig to simplify their academic life.
                </p>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="h-14 md:h-16 px-10 md:px-14 text-lg md:text-xl rounded-full font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all bg-white text-primary hover:bg-yellow-400 hover:text-black border-4 border-transparent hover:border-white/20"
                  onClick={() => onAuthClick('signup')}
                >
                  Get Started for Free <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
           </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
