'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, Star, ShieldCheck, Zap, Users } from 'lucide-react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden:   { opacity: 0, y: 32 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { icon: <Users className="h-5 w-5 text-[#8B5E3C]" />,    value: '10,000+', label: 'Students' },
  { icon: <Star  className="h-5 w-5 text-[#C4874F]" />,    value: '4.9 / 5', label: 'Avg Rating' },
  { icon: <ShieldCheck className="h-5 w-5 text-[#6B8E4E]" />, value: '100%',  label: 'Secure Escrow' },
  { icon: <Zap className="h-5 w-5 text-[#8B5E3C]" />,      value: '< 24 h',  label: 'Avg Delivery' },
]

interface HeroSectionProps {
  onSignUpClick: () => void
  isAuthenticated?: boolean
}

export function HeroSection({ onSignUpClick, isAuthenticated }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FAF7F0 0%, #F5EBD8 55%, #FAF7F0 100%)' }}
    >
      {/* Decorative warm circle blobs — solid, no blur */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4A97A 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 -left-24 w-[380px] h-[380px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C4874F 0%, transparent 70%)' }} />

      {/* Warm dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #8B5E3C 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Pill badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#6B4226]/10 border border-[#8B5E3C]/25 text-[#6B4226] text-xs font-bold uppercase tracking-[0.15em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B5E3C] animate-pulse" />
              The #1 Academic Task Marketplace
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.93] text-[#2C1810] mb-6"
          >
            Your Academic
            <br />
            <span className="text-gradient">Success,</span>
            {' '}Simplified.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#5C3D2A]/65 max-w-2xl mx-auto leading-relaxed font-medium mb-12"
          >
            The premium marketplace where ambitious students meet expert solvers.
            Post tasks, secure escrow payments, and elevate your grades — peer‑to‑peer excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <button
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-[#FAF7F0] btn-brown"
              onClick={isAuthenticated ? () => window.location.href = '/dashboard' : onSignUpClick}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free'}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-[#5C3D2A] border-2 border-[#8B5E3C]/40 bg-transparent hover:bg-[#6B4226]/8 hover:border-[#8B5E3C]/70 transition-all duration-300"
              onClick={() => {
                const el = document.getElementById('how-it-works')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              See How It Works
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 py-5 px-4 rounded-2xl bg-white border border-[#D4A97A]/30 shadow-sm shadow-[#6B4226]/6 hover:shadow-md hover:border-[#C4874F]/50 hover:-translate-y-1 transition-all duration-300"
              >
                {stat.icon}
                <span className="text-2xl font-black text-[#2C1810]">{stat.value}</span>
                <span className="text-xs font-semibold text-[#8B5E3C]/70 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Section bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #F9F4EB)' }} />
    </section>
  )
}
