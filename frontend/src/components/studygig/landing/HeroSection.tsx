'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Star, ShieldCheck, Sparkles } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
}

interface HeroSectionProps {
  onSignUpClick: () => void
}

export function HeroSection({ onSignUpClick }: HeroSectionProps) {

  return (
    <section className="relative pt-12 pb-12 lg:pt-20 lg:pb-16 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center space-y-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-xs font-semibold tracking-wide text-primary shadow-[0_0_20px_oklch(var(--primary)_/_0.1)]">
              <Sparkles className="h-3.5 w-3.5 fill-primary/20" />
              <span className="uppercase">Empowering Academic Excellence</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-foreground"
          >
            Your Academic <br />
            <span className="text-gradient">Success, Simplified.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium"
          >
            The premium marketplace where ambitious students meet expert solvers. 
            Post tasks, secure escrow, and elevate your grades with peer-to-peer excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4"
          >
            <Button 
              size="lg" 
              className="h-16 px-10 text-lg rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-[0_20px_40px_-12px_oklch(var(--primary)_/_0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all group"
              onClick={onSignUpClick}
            >
              Get Started Now 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 px-10 text-lg rounded-2xl glass hover:bg-accent/50 border-border/50 text-foreground font-bold transition-all"
            >
              How it works
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">10k+ Students</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">4.9/5 Rating</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest">Secure Escrow</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-6 w-6 text-indigo-500" />
              <span className="text-xs font-bold uppercase tracking-widest">Fast Delivery</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

