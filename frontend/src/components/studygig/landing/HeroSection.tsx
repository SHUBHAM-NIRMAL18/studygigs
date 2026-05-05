'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Star, Users, Zap } from 'lucide-react'

interface HeroSectionProps {
  onSignUpClick: () => void
}

export function HeroSection({ onSignUpClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="h-3.5 w-3.5" />
            <span>The #1 Academic Task Marketplace</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Master Your Studies with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-indigo-600">
              Expert Peer Support
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            Post your assignments, set your budget, and collaborate with top-performing students. 
            Secure escrow payments, quality guaranteed, and 24/7 support.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
            <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-transform" onClick={onSignUpClick}>
              Post Your First Task <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all">
              Browse Marketplace
            </Button>
          </div>

          {/* Stats/Trust */}
          <div className="mt-12 p-6 rounded-3xl bg-background/40 border border-border/50 backdrop-blur-xl shadow-2xl animate-in fade-in duration-1000 delay-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1 relative">
                <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/60">10k+</p>
                <p className="text-xs font-medium text-muted-foreground">Active Students</p>
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-10 bg-border/50"></div>
              </div>
              <div className="space-y-1 relative">
                <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-blue-500/60">50k+</p>
                <p className="text-xs font-medium text-muted-foreground">Tasks Completed</p>
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-10 bg-border/50"></div>
              </div>
              <div className="space-y-1 relative">
                <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-indigo-500/60">4.9/5</p>
                <p className="text-xs font-medium text-muted-foreground">Average Rating</p>
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-10 bg-border/50"></div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-purple-500/60">100%</p>
                <p className="text-xs font-medium text-muted-foreground">Secure Escrow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
