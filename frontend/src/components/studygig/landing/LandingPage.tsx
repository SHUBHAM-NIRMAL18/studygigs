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
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">How StudyGig Works</h2>
                <div className="space-y-6 mt-8">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">1</div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">Post Your Task</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">Describe your assignment, set your deadline, and choose your budget range.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">2</div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">Receive & Review Bids</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">Qualified solvers will bid on your task. Check their profiles, ratings, and reviews.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">3</div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">Deposit into Escrow</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">Accept a bid and deposit the payment into our secure escrow. Money is only released when work is done.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">4</div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">Get Quality Work</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">Collaborate with your solver, request revisions if needed, and finalize the task!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10" />
                
                {/* Mock Task Card */}
                <div className="rounded-2xl border bg-card/80 backdrop-blur-md p-6 shadow-2xl relative transform rotate-2 hover:rotate-0 transition-transform duration-500 hover:shadow-primary/20 cursor-pointer">
                   {/* Top decorative elements */}
                   <div className="absolute -top-3 -right-3">
                     <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg transform rotate-12">
                       <span className="text-xs font-bold">$</span>
                     </div>
                   </div>

                   {/* Header */}
                   <div className="flex items-center justify-between border-b pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-inner">
                          A
                        </div>
                        <div>
                          <div className="text-sm font-bold">Alex Johnson</div>
                          <div className="text-[10px] text-muted-foreground uppercase font-semibold">Posted 2 hrs ago</div>
                        </div>
                      </div>
                      <div className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold">
                        OPEN
                      </div>
                   </div>
                   
                   {/* Content */}
                   <div className="space-y-2 mb-6">
                      <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors">
                        Advanced Calculus III Assignment Help
                      </h3>
                      <p className="text-[13px] text-muted-foreground line-clamp-2">
                        Need an expert to help solve 10 advanced multivariable calculus problems. Must show step-by-step work. Due by Friday night.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold border bg-orange-500/10 text-orange-600 border-orange-500/20">MATH</span>
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold border border-muted bg-muted/30">Undergrad</span>
                      </div>
                   </div>
                   
                   {/* Footer */}
                   <div className="flex justify-between items-center pt-4 border-t bg-muted/10 -mx-6 px-6 -mb-6 pb-6 rounded-b-2xl">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-muted-foreground font-semibold uppercase">Budget</span>
                        <span className="text-sm font-extrabold text-primary">$80 – $120</span>
                      </div>
                      <button className="h-9 px-5 rounded-full bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2">
                        Place Bid <ArrowRight className="h-3 w-3" />
                      </button>
                   </div>
                </div>
                
                {/* Floating Mock Bid Card */}
                <div className="absolute -bottom-10 -left-6 rounded-xl border bg-card p-4 shadow-xl w-64 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">S</div>
                      <span className="text-xs font-bold">SolverPro</span>
                    </div>
                    <span className="text-xs font-black text-primary">$95</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">"I have a PhD in Math and can deliver step-by-step solutions by tomorrow."</p>
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
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  Ready to boost your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 underline decoration-yellow-500/30">
                    grades?
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                  Join thousands of students who are already using StudyGig to simplify their academic life.
                </p>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="h-12 md:h-14 px-8 md:px-12 text-base md:text-lg rounded-full font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all bg-white text-primary hover:bg-yellow-400 hover:text-black border-4 border-transparent hover:border-white/20"
                  onClick={() => onAuthClick('signup')}
                >
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
           </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
