'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PublicHeader } from './PublicHeader'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { PublicFooter } from './PublicFooter'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react'
import { MeshGradient } from '@/components/ui/mesh-gradient'

interface LandingPageProps {
  onAuthClick: (mode: 'login' | 'signup') => void
}

export function LandingPage({ onAuthClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/30">
      <MeshGradient />
      
      <PublicHeader 
        onLoginClick={() => onAuthClick('login')} 
        onSignUpClick={() => onAuthClick('signup')} 
      />
      
      <main>
        <HeroSection onSignUpClick={() => onAuthClick('signup')} />
        
        <FeaturesSection />
        
        {/* How It Works (Quick Preview) */}
        <section id="how-it-works" className="py-20 lg:py-28 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight">The StudyGig <span className="text-gradient">Workflow</span></h2>
                  <p className="text-lg text-muted-foreground font-medium">Simple, secure, and built for results.</p>
                </div>
                
                <div className="space-y-8 mt-8">
                  {[
                    { step: 1, title: 'Post Your Task', desc: 'Describe your assignment, set your deadline, and choose your budget range.' },
                    { step: 2, title: 'Receive & Review Bids', desc: 'Qualified solvers will bid on your task. Check their profiles, ratings, and reviews.' },
                    { step: 3, title: 'Deposit into Escrow', desc: 'Accept a bid and deposit the payment into our secure escrow. Money is only released when work is done.' },
                    { step: 4, title: 'Get Quality Work', desc: 'Collaborate with your solver, request revisions if needed, and finalize the task!' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6 group"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary text-lg font-black group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {item.step}
                      </div>
                      <div className="pt-1">
                        <h3 className="font-bold text-xl">{item.title}</h3>
                        <p className="text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  {/* Mock Task Card */}
                  <div className="rounded-[2.5rem] border glass-card p-8 shadow-2xl relative transform lg:rotate-2 hover:rotate-0 transition-all duration-700 hover:shadow-primary/20 cursor-pointer group">
                    <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform">
                      <span className="text-lg font-black">$</span>
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border/50 pb-6 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black shadow-inner">
                            A
                          </div>
                          <div>
                            <div className="text-base font-bold">Alex Johnson</div>
                            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Posted 2 hrs ago</div>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">
                          OPEN
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-4 mb-8">
                        <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors">
                          Advanced Calculus III Assignment Help
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                          Need an expert to help solve 10 advanced multivariable calculus problems. Must show step-by-step work. Due by Friday night.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="px-3 py-1 rounded-full text-[10px] font-black border bg-orange-500/10 text-orange-500 border-orange-500/20 uppercase tracking-wider">MATH</span>
                          <span className="px-3 py-1 rounded-full text-[10px] font-black border border-border bg-muted/30 uppercase tracking-wider">Undergrad</span>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex justify-between items-center pt-6 border-t border-border/50">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Budget</span>
                          <span className="text-xl font-black text-primary">$80 – $120</span>
                        </div>
                        <Button className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-black text-sm shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
                          Place Bid <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                  
                  {/* Floating Mock Bid Card */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-10 -left-10 rounded-2xl border glass p-6 shadow-2xl w-72 hidden md:block"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-blue-500 flex items-center justify-center text-xs text-white font-black">S</div>
                        <span className="text-sm font-black">SolverPro</span>
                      </div>
                      <span className="text-sm font-black text-primary">$95</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">"I have a PhD in Math and can deliver step-by-step solutions by tomorrow."</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
           <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-primary/20 text-xs font-black uppercase tracking-widest shadow-xl"
              >
                 <Sparkles className="h-4 w-4 text-yellow-400" />
                 <span>Join the Revolution</span>
              </motion.div>
              
              <div className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-black tracking-tight"
                >
                  Ready to boost your <br />
                  <span className="text-gradient underline decoration-primary/20">
                    academic career?
                  </span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed"
                >
                  Join thousands of students who are already using StudyGig to simplify their academic life.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="pt-8"
              >
                <Button 
                  size="lg" 
                  className="h-20 px-12 text-xl rounded-[2rem] font-black shadow-2xl hover:scale-105 transition-all bg-primary text-primary-foreground hover:shadow-primary/30"
                  onClick={() => onAuthClick('signup')}
                >
                  Get Started for Free <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
           </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}

