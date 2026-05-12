'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Zap, GraduationCap, DollarSign, Sparkles } from 'lucide-react'

const features = [
  {
    title: 'Secure Escrow',
    subtitle: 'Safety First',
    description: 'Your funds are held securely and only released when you approve the final delivery.',
    icon: ShieldCheck,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'Expert Solvers',
    subtitle: 'Vetted Talent',
    description: 'Connect with verified top-tier students and subject matter experts globally.',
    icon: GraduationCap,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Budget Control',
    subtitle: 'Fair Pricing',
    description: 'Set your budget and choose from competitive bids that match your requirements.',
    icon: DollarSign,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    title: 'Rapid Delivery',
    subtitle: 'Always On Time',
    description: 'Need it fast? Get high-quality results within your tightest deadlines.',
    icon: Zap,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Platform Excellence</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            Everything You Need <br />
            <span className="text-gradient">To Succeed Academically</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-medium"
          >
            StudyGig combines security, quality, and speed to provide the ultimate marketplace for academic tasks.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl glass-card hover:bg-accent/5 transition-all duration-500"
            >
              <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </div>
              
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{feature.subtitle}</p>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <feature.icon className="h-24 w-24" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

