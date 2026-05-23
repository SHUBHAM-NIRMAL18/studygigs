'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PublicHeader } from './PublicHeader'
import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { PublicFooter } from './PublicFooter'
import { ArrowRight, Quote, CheckCircle2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface LandingPageProps {
  onAuthClick: (mode: 'login' | 'signup') => void
}

/* ─── How It Works Steps ─── */
const steps = [
  {
    step: 1,
    title: 'Post Your Task',
    desc: 'Describe your assignment, set your deadline, and choose a budget range. Takes less than 2 minutes.',
    color: '#8B5E3C',
  },
  {
    step: 2,
    title: 'Receive & Review Bids',
    desc: 'Qualified solvers bid on your task. Compare profiles, ratings, and past reviews to find the best fit.',
    color: '#7A5C2E',
  },
  {
    step: 3,
    title: 'Deposit into Escrow',
    desc: "Accept a bid and deposit into our secure escrow. Money is only released when you're satisfied.",
    color: '#6B8E4E',
  },
  {
    step: 4,
    title: 'Get Quality Work',
    desc: 'Collaborate, request revisions if needed, approve and release payment. Simple as that.',
    color: '#8B5E3C',
  },
]

/* ─── Testimonials ─── */
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'CS Student, Delhi University',
    quote: "StudyGig saved my semester. Got my data structures assignment done in 18 hours with step-by-step explanations.",
    avatar: 'P',
    rating: 5,
  },
  {
    name: 'James O.',
    role: 'MBA Student, University of Leeds',
    quote: "The escrow system gave me peace of mind. Paid only after I was 100% satisfied. Will use again!",
    avatar: 'J',
    rating: 5,
  },
  {
    name: 'Mei Lin',
    role: 'Physics Undergrad, NUS Singapore',
    quote: "I was skeptical but my solver had a PhD in Physics. The quality was beyond what I expected.",
    avatar: 'M',
    rating: 5,
  },
]

/* ─── Mock Task Card (for How It Works section) ─── */
function MockTaskCard() {
  return (
    <div
      className="w-full max-w-sm rounded-3xl border border-[#D4A97A]/40 p-7 shadow-xl"
      style={{ background: '#FFFDF8', boxShadow: '0 20px 60px rgba(107,66,38,0.10)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#D4A97A]/20">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl flex items-center justify-center text-[#FAF7F0] font-black text-sm"
            style={{ background: 'linear-gradient(135deg, #8B5E3C, #C4874F)' }}>
            A
          </div>
          <div>
            <div className="text-sm font-bold text-[#2C1810]">Alex Johnson</div>
            <div className="text-[10px] text-[#8B5E3C]/70 uppercase font-bold tracking-widest">2 hrs ago</div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#6B8E4E] border border-[#6B8E4E]/30 bg-[#6B8E4E]/10">
          OPEN
        </div>
      </div>

      {/* Body */}
      <h3 className="text-lg font-black text-[#2C1810] mb-2 leading-snug">
        Advanced Calculus III Assignment Help
      </h3>
      <p className="text-sm text-[#5C3D2A]/60 leading-relaxed mb-5">
        Need an expert to solve 10 multivariable calculus problems with step-by-step work. Due Friday night.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#8B5E3C] border border-[#8B5E3C]/30 bg-[#8B5E3C]/10">MATH</span>
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-[#5C3D2A]/60 border border-[#D4A97A]/30 bg-[#D4A97A]/10">Undergrad</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-5 border-t border-[#D4A97A]/20">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#8B5E3C]/60 mb-0.5">Budget</p>
          <p className="text-xl font-black text-[#6B4226]">$80 – $120</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#FAF7F0] btn-brown">
          Place Bid <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function LandingPage({ onAuthClick }: LandingPageProps) {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#FAF7F0' }}>

      {/* ─── HEADER ─── */}
      <PublicHeader
        onLoginClick={() => onAuthClick('login')}
        onSignUpClick={() => onAuthClick('signup')}
        isAuthenticated={isAuthenticated}
      />

      <main>

        {/* ─── HERO ─── Cream with warm gradient */}
        <HeroSection onSignUpClick={() => onAuthClick('signup')} isAuthenticated={isAuthenticated} />

        {/* ─── FEATURES ─── Pure white background */}
        <FeaturesSection />

        {/* ─── HOW IT WORKS ─── Warm Sand background */}
        <section
          id="how-it-works"
          className="py-20 lg:py-28 relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #F5EBD8 0%, #EDE0CC 100%)' }}
        >
          {/* Decorative left circle */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none opacity-30"
            style={{ background: 'radial-gradient(circle, #C4874F 0%, transparent 70%)' }} />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-start gap-16 xl:gap-24">

              {/* Left: Steps */}
              <div className="flex-1">
                {/* Section label */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B4226]/12 border border-[#8B5E3C]/25 text-[#6B4226] text-xs font-bold uppercase tracking-[0.15em] mb-8"
                >
                  How It Works
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 }}
                  className="text-4xl md:text-5xl font-black tracking-tight text-[#2C1810] mb-4"
                >
                  The StudyGig{' '}
                  <span className="text-gradient">Workflow</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.14 }}
                  className="text-base text-[#5C3D2A]/60 mb-12 max-w-md leading-relaxed"
                >
                  Simple, secure, and built for results. From posting to approval — we've got every step covered.
                </motion.p>

                {/* Steps */}
                <div className="space-y-7">
                  {steps.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex gap-5 group"
                    >
                      {/* Step number */}
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-black text-lg transition-all duration-300 shadow-sm group-hover:scale-110"
                        style={{
                          background: `${item.color}18`,
                          border: `2px solid ${item.color}35`,
                          color: item.color,
                        }}
                      >
                        {item.step}
                      </div>

                      <div className="pt-1">
                        <h3 className="font-bold text-lg text-[#2C1810] mb-1">{item.title}</h3>
                        <p className="text-sm text-[#5C3D2A]/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Mock Task Card */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  style={{ animation: 'float 6s ease-in-out infinite' }}
                >
                  <MockTaskCard />

                  {/* Floating bid card */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-10 -left-10 w-64 rounded-2xl border border-[#D4A97A]/35 p-5 hidden md:block shadow-lg"
                    style={{ background: '#FFFDF8', boxShadow: '0 12px 40px rgba(107,66,38,0.10)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl flex items-center justify-center text-xs text-[#FAF7F0] font-black"
                          style={{ background: 'linear-gradient(135deg, #8B5E3C, #C4874F)' }}>
                          S
                        </div>
                        <span className="text-sm font-bold text-[#2C1810]">SolverPro</span>
                      </div>
                      <span className="text-sm font-black text-[#6B4226]">$95</span>
                    </div>
                    <p className="text-xs text-[#5C3D2A]/60 italic leading-relaxed">
                      "PhD in Math. Step-by-step solutions delivered by tomorrow."
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── Deep brown background for contrast */}
        <section
          id="testimonials"
          className="py-20 lg:py-28 relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #3D2314 0%, #2C1810 100%)' }}
        >
          {/* Subtle warm texture dots */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #C4874F 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="container mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F0]/10 border border-[#C4874F]/30 text-[#D4A97A] text-xs font-bold uppercase tracking-[0.15em] mb-6"
              >
                Student Success Stories
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-4xl md:text-5xl font-black text-[#FAF7F0] tracking-tight"
              >
                Loved by Students{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #D4A97A 0%, #C4874F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Worldwide
                </span>
              </motion.h2>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.15 }}
                  whileHover={{ y: -6 }}
                  className="relative p-7 rounded-3xl border transition-all duration-400"
                  style={{
                    background: 'rgba(255,253,248,0.06)',
                    borderColor: 'rgba(196,135,79,0.20)',
                  }}
                >
                  <Quote className="h-8 w-8 mb-5 opacity-40" style={{ color: '#C4874F' }} />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <span key={s} className="text-sm" style={{ color: '#D4A97A' }}>★</span>
                    ))}
                  </div>

                  <p className="text-[#FAF7F0]/75 text-sm leading-relaxed mb-7 italic">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center font-black text-sm text-[#FAF7F0]"
                      style={{ background: 'linear-gradient(135deg, #8B5E3C, #C4874F)' }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#FAF7F0]">{t.name}</p>
                      <p className="text-xs text-[#D4A97A]/70">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── Warm cream with brown border accent */}
        <section
          className="py-20 lg:py-28 relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #FAF7F0 0%, #F5EBD8 100%)' }}
        >
          {/* Top divider */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(160,100,58,0.3), transparent)' }} />

          <div className="container mx-auto px-6 relative z-10 text-center">
            {/* Check-list items */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {['No hidden fees', 'Secure escrow', '24h delivery', 'Verified experts'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-[#5C3D2A]">
                  <CheckCircle2 className="h-4 w-4 text-[#6B8E4E]" />
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#2C1810] mb-6"
            >
              Ready to Boost Your{' '}
              <br />
              <span className="text-gradient">Academic Career?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-[#5C3D2A]/60 max-w-xl mx-auto mb-12 leading-relaxed"
            >
              Join thousands of students who are already using StudyGig to simplify their academic life. Free to sign up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-black text-[#FAF7F0] btn-brown"
                onClick={isAuthenticated ? () => window.location.href = '/dashboard' : () => onAuthClick('signup')}
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started for Free'}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-lg font-bold text-[#5C3D2A] border-2 border-[#8B5E3C]/40 hover:bg-[#6B4226]/8 hover:border-[#8B5E3C]/70 transition-all duration-300"
                onClick={() => onAuthClick('login')}
              >
                I already have an account
              </button>
            </motion.div>
          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  )
}
