'use client'

import React from 'react'
import { ShieldCheck, Zap, GraduationCap, DollarSign, Sparkles } from 'lucide-react'

const features = [
  {
    title: 'Secure Escrow',
    subtitle: 'Payments, Safety, Trust',
    description: 'Your money is safe. We only release payments when you are 100% satisfied with the work.',
    icon: ShieldCheck,
    gradient: 'from-emerald-400 via-emerald-500 to-teal-600',
    iconColor: 'text-emerald-500',
  },
  {
    title: 'Expert Solvers',
    subtitle: 'Vetted, Proven, Reliable',
    description: 'Work with top-tier students and graduates who have proven expertise in your subjects.',
    icon: GraduationCap,
    gradient: 'from-blue-400 via-blue-500 to-indigo-600',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Budget Control',
    subtitle: 'Bidding, Pricing, Saving',
    description: 'Set your own price and choose the bid that best fits your budget and quality needs.',
    icon: DollarSign,
    gradient: 'from-amber-400 via-orange-500 to-amber-600',
    iconColor: 'text-amber-500',
  },
  {
    title: 'Fast Delivery',
    subtitle: 'Instant, Matching, Swift',
    description: 'Post your task and get competitive bids from qualified solvers within minutes.',
    icon: Zap,
    gradient: 'from-purple-400 via-purple-500 to-indigo-600',
    iconColor: 'text-purple-500',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3 w-3" />
            <span>Platform Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1e1b4b]">Everything You Need to Succeed</h2>
          <p className="text-base text-slate-500 font-medium">
            StudyGig provides a secure and efficient platform for peer-to-peer academic collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative h-[360px] bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_15px_35px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-default"
            >
              <div className="p-8 pb-0 space-y-2 relative z-10">
                <h3 className="text-xl font-extrabold text-[#1e1b4b] tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 font-bold text-[10px] tracking-wide uppercase">{feature.subtitle}</p>
                <p className="text-slate-500 text-[13px] leading-relaxed pt-1 line-clamp-3">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Curved Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
                <div 
                  className={`absolute bottom-[-20px] left-[-10%] w-[120%] h-[120%] rounded-[100%] bg-gradient-to-br ${feature.gradient} opacity-20 transform translate-y-12 transition-transform duration-700 group-hover:translate-y-8`} 
                />
                <div 
                  className={`absolute bottom-[-10px] left-[-5%] w-[110%] h-[100%] rounded-[100%] bg-gradient-to-br ${feature.gradient} transform translate-y-16 transition-transform duration-500 group-hover:translate-y-10`} 
                />
                
                {/* Large Icon Illustration */}
                <div className="absolute bottom-6 right-8 transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
                    <feature.icon className="h-16 w-16 text-white drop-shadow-2xl relative z-10" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className={`absolute top-6 right-6 h-2 w-2 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
