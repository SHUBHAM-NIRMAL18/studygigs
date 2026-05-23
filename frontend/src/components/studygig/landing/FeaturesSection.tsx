'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Zap, GraduationCap, DollarSign, Clock, Star } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Escrow',
    subtitle: 'Safety First',
    description: 'Your funds are held securely and only released when you approve the final delivery. Zero risk for buyers.',
    accent: '#6B8E4E',
    bg: '#F0F7EC',
    border: '#6B8E4E',
  },
  {
    icon: GraduationCap,
    title: 'Expert Solvers',
    subtitle: 'Vetted Talent',
    description: 'Connect with verified top-tier students and subject matter experts from universities worldwide.',
    accent: '#8B5E3C',
    bg: '#FDF6EE',
    border: '#C4874F',
  },
  {
    icon: DollarSign,
    title: 'Budget Control',
    subtitle: 'Fair Pricing',
    description: 'Set your budget and choose from competitive bids that match your requirements perfectly.',
    accent: '#7A5C2E',
    bg: '#FDF9F0',
    border: '#C4A857',
  },
  {
    icon: Zap,
    title: 'Rapid Delivery',
    subtitle: 'Always On Time',
    description: 'Need it fast? Get high-quality results within your tightest deadlines — guaranteed.',
    accent: '#8B5E3C',
    bg: '#FDF6EE',
    border: '#C4874F',
  },
  {
    icon: Star,
    title: 'Quality Reviews',
    subtitle: 'Transparent Ratings',
    description: 'Read verified reviews and ratings before choosing your solver. Informed decisions always.',
    accent: '#7A5C2E',
    bg: '#FDF9F0',
    border: '#C4A857',
  },
  {
    icon: Clock,
    title: 'Revision Rounds',
    subtitle: "Until You're Happy",
    description: 'Request revisions with ease. Your solver keeps refining until the work meets your standard.',
    accent: '#6B8E4E',
    bg: '#F0F7EC',
    border: '#6B8E4E',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(160,100,58,0.25), transparent)' }} />

      {/* Warm right-side decoration */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, #C4874F 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B4226]/10 border border-[#8B5E3C]/20 text-[#6B4226] text-xs font-bold uppercase tracking-[0.15em] mb-6"
          >
            Platform Excellence
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-[#2C1810] mb-4"
          >
            Everything You Need{' '}
            <span className="text-gradient">To Succeed</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base text-[#5C3D2A]/65 leading-relaxed"
          >
            StudyGig combines security, quality, and speed to provide the ultimate
            marketplace for academic tasks — built for students, by students.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 + 0.15 }}
              whileHover={{ y: -6 }}
              className="group p-8 rounded-3xl border transition-all duration-400 cursor-default"
              style={{
                background: f.bg,
                borderColor: `${f.border}28`,
                boxShadow: '0 2px 16px rgba(107,66,38,0.06)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.border}60`
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(107,66,38,0.12)`
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${f.border}28`
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(107,66,38,0.06)'
              }}
            >
              {/* Icon */}
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-400"
                style={{ background: `${f.accent}18`, border: `1.5px solid ${f.accent}30` }}
              >
                <f.icon className="h-7 w-7" style={{ color: f.accent }} />
              </div>

              {/* Text */}
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: `${f.accent}90` }}>
                {f.subtitle}
              </p>
              <h3 className="text-xl font-bold text-[#2C1810] mb-3">{f.title}</h3>
              <p className="text-sm text-[#5C3D2A]/60 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(160,100,58,0.25), transparent)' }} />
    </section>
  )
}
