'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ShieldCheck, Zap, Users, GraduationCap, DollarSign, Clock } from 'lucide-react'

const features = [
  {
    title: 'Secure Escrow Payments',
    description: 'Your money is safe. We only release payments when you are 100% satisfied with the work.',
    icon: ShieldCheck,
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    title: 'Verified Expert Solvers',
    description: 'Work with top-tier students and graduates who have proven expertise in your subjects.',
    icon: GraduationCap,
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    title: 'Instant Task Matching',
    description: 'Post your task and get competitive bids from qualified solvers within minutes.',
    icon: Zap,
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    title: 'Flexible Budgeting',
    description: 'Set your own price and choose the bid that best fits your budget and quality needs.',
    icon: DollarSign,
    color: 'bg-primary/10 text-primary',
  },
  {
    title: '24/7 Quality Support',
    description: 'Our team is always here to help with dispute resolution and platform assistance.',
    icon: Clock,
    color: 'bg-indigo-500/10 text-indigo-600',
  },
  {
    title: 'Collaborative Learning',
    description: 'Don\'t just get the answer. Learn the process through direct communication with solvers.',
    icon: Users,
    color: 'bg-rose-500/10 text-rose-600',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need to Succeed</h2>
          <p className="text-lg text-muted-foreground">
            StudyGig provides a secure and efficient platform for peer-to-peer academic collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 space-y-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
