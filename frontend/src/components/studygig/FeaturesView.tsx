'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GraduationCap, 
  ShieldCheck, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Award, 
  BookOpen, 
  Terminal, 
  Calculator, 
  TrendingUp, 
  PenTool, 
  Atom, 
  FileText, 
  Check, 
  X, 
  ChevronRight, 
  Sparkles,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'

// Tabs enum
type TabType = 'what' | 'how' | 'why' | 'uses'

export function FeaturesView() {
  const [activeTab, setActiveTab] = useState<TabType>('what')
  const [activeHowStep, setActiveHowStep] = useState<number>(1)

  // Stepper data
  const howSteps = [
    {
      step: 1,
      title: 'Post a Task',
      desc: 'Students create a posting detailing their homework, assignment, or project requirements. Define category, academic level, budget range, and upload any helper documents.',
      badge: 'Student Action',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      details: [
        'Upload supporting sheets (PDF, ZIP, DOCX)',
        'Set custom pricing boundaries ($10 - $1000+)',
        'Specify deadline dates and time zones'
      ],
      mockUI: (
        <div className="border border-border rounded-2xl bg-card p-5 shadow-inner">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">New Task Wizard</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-accent/40 font-medium">Advanced Algorithms Assignment 3</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-accent/20 text-center">Category: CS</div>
              <div className="p-2 rounded-lg bg-accent/20 text-center">Budget: $150</div>
            </div>
            <div className="p-3 border border-dashed border-border rounded-lg text-center text-muted-foreground text-[10px]">
              📁 syllabus_requirements.pdf (1.2 MB)
            </div>
          </div>
        </div>
      )
    },
    {
      step: 2,
      title: 'Solvers Submit Bids',
      desc: 'Verified academic solvers (top students or expert tutors) view open postings on the marketplace. They submit bids indicating their proposed price, delivery timeline, and a pitch highlighting their qualifications.',
      badge: 'Solver Action',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      details: [
        'Review solver rating and completion history',
        'Compare customized price pitches',
        'Direct messaging opens upon submission'
      ],
      mockUI: (
        <div className="border border-border rounded-2xl bg-card p-5 shadow-inner space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Active Bids (3)</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">2.4x Avg. ROI</span>
          </div>
          <div className="space-y-2">
            <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">Dr. Clara S. <span className="text-amber-500 text-[10px]">★ 4.9</span></div>
                <div className="text-[10px] text-muted-foreground">PhD in CS • 140 completed</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xs text-primary">$130</div>
                <div className="text-[9px] text-muted-foreground">18 hrs delivery</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 3,
      title: 'Escrow Deposit (Lock)',
      desc: 'Once the student selects the best solver, they accept the bid. The funds are immediately deposited and locked in StudyGig\'s secure escrow wallet. No money is released to the solver at this stage.',
      badge: 'Escrow System',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      details: [
        'Secure wallet with 256-bit encryption',
        'Transparent ledger recording',
        'Zero risk of tutors vanishing with upfront cash'
      ],
      mockUI: (
        <div className="border border-border rounded-2xl bg-card p-5 shadow-inner text-center space-y-3">
          <div className="mx-auto h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold">Escrow Ledger Status</div>
            <div className="text-xl font-black text-emerald-600 mt-1">$130.00 LOCKED</div>
            <div className="text-[9px] text-muted-foreground mt-1">Pending Deliverable Verification</div>
          </div>
        </div>
      )
    },
    {
      step: 4,
      title: 'Solver Work & Upload',
      desc: 'The solver completes the work according to the requirements and uploads it directly to the system as a Deliverable. Version history is tracked, allowing multiple files to be uploaded if revisions occur.',
      badge: 'Solver Action',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      details: [
        'Version-controlled submissions',
        'Upload screenshots, code files, PDFs',
        'Direct chat stays open for clarifications'
      ],
      mockUI: (
        <div className="border border-border rounded-2xl bg-card p-5 shadow-inner space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Deliverable V1</span>
            <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">PENDING REVIEW</span>
          </div>
          <div className="p-3 rounded-lg border border-border bg-accent/20 text-xs">
            <div className="font-semibold truncate">algorithms_assignment_sol.zip</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">3.4 MB • Uploaded 5 mins ago</div>
          </div>
          <div className="text-[9px] text-muted-foreground italic">"I have included clean comments and JUnit test reports."</div>
        </div>
      )
    },
    {
      step: 5,
      title: 'Review & Revision Loop',
      desc: 'The student downloads and reviews the deliverable. If the work meets specifications, they approve it. If edits or fixes are required, the student requests a Revision, specifying what details are missing.',
      badge: 'Student Action',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      details: [
        'Unlimited revisions within task bounds',
        'Direct annotation/feedback loop',
        'Arbitration system available if dispute arises'
      ],
      mockUI: (
        <div className="border border-border rounded-2xl bg-card p-5 shadow-inner space-y-3">
          <div className="text-xs font-bold text-center">Evaluate Deliverable</div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-[10px] font-bold shadow-md shadow-emerald-600/10">
              Approve Payout
            </button>
            <button className="flex-1 py-2 rounded-xl border border-amber-600 text-amber-600 text-[10px] font-bold hover:bg-amber-50">
              Request Edit
            </button>
          </div>
        </div>
      )
    },
    {
      step: 6,
      title: 'Release & Payout',
      desc: 'Upon final approval, the escrow system releases the funds: 80% is instantly paid out to the solver\'s wallet, and 20% goes to StudyGig as a platform fee. If the task is rejected/cancelled, the student is refunded 100%.',
      badge: 'Escrow System',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      details: [
        'Tutor Payout: 80% net earnings',
        'Platform Support: 20% platform fee',
        'Automatic balance upgrades'
      ],
      mockUI: (
        <div className="border border-border rounded-2xl bg-card p-5 shadow-inner space-y-2 text-center">
          <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Transaction Ledger</div>
          <div className="space-y-1.5 text-xs text-left">
            <div className="flex justify-between font-medium">
              <span>Total Release:</span>
              <span>$130.00</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Solver Payout (80%):</span>
              <span>+$104.00</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-[10px]">
              <span>Platform Fee (20%):</span>
              <span>+$26.00</span>
            </div>
          </div>
        </div>
      )
    }
  ]

  // Use case categories
  const categories = [
    {
      icon: Terminal,
      title: 'Computer Science',
      desc: 'From algorithm design to complete web apps.',
      examples: ['Data structures implementation', 'Full-stack Next.js/React setups', 'Database schemas & SQL optimization', 'Python script automation'],
      accent: 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 text-amber-700',
      iconBg: 'bg-amber-100 text-amber-700'
    },
    {
      icon: Calculator,
      title: 'Mathematics & Stats',
      desc: 'Step-by-step mathematical proofs and solving.',
      examples: ['Advanced Calculus & Integration', 'Linear Algebra equations', 'Probability & Statistics distribution', 'Discrete Mathematics proofs'],
      accent: 'border-sky-500/20 bg-sky-500/5 hover:border-sky-500/40 text-sky-700',
      iconBg: 'bg-sky-100 text-sky-700'
    },
    {
      icon: Atom,
      title: 'Natural Sciences',
      desc: 'Physics, chemistry, and biology reports.',
      examples: ['Classical Mechanics problems', 'Organic Chemistry synthesis', 'Molecular Biology lab reviews', 'Thermodynamics calculations'],
      accent: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 text-emerald-700',
      iconBg: 'bg-emerald-100 text-emerald-700'
    },
    {
      icon: PenTool,
      title: 'Writing & Humanities',
      desc: 'Structured reviews, essays, and proofreading.',
      examples: ['Academic literature reviews', 'Philosophy research essays', 'English grammar translation', 'APA/Harvard style formatting'],
      accent: 'border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40 text-purple-700',
      iconBg: 'bg-purple-100 text-purple-700'
    },
    {
      icon: TrendingUp,
      title: 'Business & Finance',
      desc: 'Quantitative analytics and reports.',
      examples: ['Financial statement valuation', 'Micro/Macroeconomics modeling', 'Strategic SWOT analysis papers', 'Business accounting journals'],
      accent: 'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40 text-rose-700',
      iconBg: 'bg-rose-100 text-rose-700'
    },
    {
      icon: BookOpen,
      title: 'Languages & Prep',
      desc: 'Grammatical analysis and curriculum prep.',
      examples: ['Foreign language coursework', 'Translation & localizations', 'Custom practice mock exams', 'Syllabus concept guides'],
      accent: 'border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/40 text-indigo-700',
      iconBg: 'bg-indigo-100 text-indigo-700'
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* ─── TITLE HEADER AREA ─── */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
        >
          <Sparkles className="h-3.5 w-3.5" /> StudyGig Documentation
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-foreground tracking-tight"
        >
          System Features & <span className="text-gradient">Core Logic</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed"
        >
          StudyGig is a modern, secure, peer-to-peer marketplace that guarantees risk-free academic help using escrow holdings. Explore how it works.
        </motion.p>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="flex justify-center border-b border-border/80 pb-px">
        <div className="flex bg-card p-1 border border-border/40 rounded-2xl shadow-sm gap-1 max-w-full overflow-x-auto scrollbar-none">
          {(['what', 'how', 'why', 'uses'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-feature-tab"
                  className="absolute inset-0 bg-primary/8 border border-primary/10 rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab === 'what' ? 'What is it?' : tab === 'how' ? 'How it works' : tab === 'why' ? 'Why StudyGig?' : 'Uses & Categories'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB CONTENT PANELS ─── */}
      <div className="min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {/* PANEL: WHAT */}
            {activeTab === 'what' && (
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight text-foreground">
                      A Peer-to-Peer Academic System
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      StudyGig is not another standard tutoring service. It is a direct peer-to-peer network connecting students seeking help with vetted solvers capable of delivering top-tier work.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Feature 1 */}
                    <div className="flex gap-4 p-4 bg-card border border-border/40 rounded-2xl shadow-sm">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm">Risk-Free Escrow Protection</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Your money is held in a secure third-party escrow ledger. Solvers only get paid when you download, review, and click approve on the deliverable.
                        </p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex gap-4 p-4 bg-card border border-border/40 rounded-2xl shadow-sm">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm">Direct Solver Collaboration</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          No intermediaries. Chat directly with the person solving your task, upload files, clarify equations, and request fine-tuned updates.
                        </p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex gap-4 p-4 bg-card border border-border/40 rounded-2xl shadow-sm">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm">Competitive Market-Based Bids</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          We do not dictate pricing. You post your budget, solvers submit competitive bids, and you select the solver that matches your pricing and reputation requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What - Visual Flow diagram */}
                <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center space-y-6 relative overflow-hidden grain-texture">
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-widest text-center">P2P Escrow Flowchart</h3>
                  
                  {/* Flow Steps */}
                  <div className="w-full space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">1</div>
                      <div className="bg-background border border-border rounded-xl px-3.5 py-2 flex-1 text-xs font-semibold">
                        Student posts assignment & sets budget
                      </div>
                    </div>

                    <div className="flex justify-center h-4">
                      <div className="w-0.5 bg-border border-dashed h-full" />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">2</div>
                      <div className="bg-background border border-border rounded-xl px-3.5 py-2 flex-1 text-xs font-semibold">
                        Solvers submit bids and estimated timelines
                      </div>
                    </div>

                    <div className="flex justify-center h-4">
                      <div className="w-0.5 bg-border border-dashed h-full" />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">3</div>
                      <div className="bg-emerald-505/10 border border-emerald-500/20 text-emerald-800 rounded-xl px-3.5 py-2 flex-1 text-xs font-bold">
                        Accepted Bid amount gets locked in Secure Escrow 🔒
                      </div>
                    </div>

                    <div className="flex justify-center h-4">
                      <div className="w-0.5 bg-border border-dashed h-full" />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">4</div>
                      <div className="bg-background border border-border rounded-xl px-3.5 py-2 flex-1 text-xs font-semibold">
                        Solver uploads deliverable & student reviews
                      </div>
                    </div>

                    <div className="flex justify-center h-4">
                      <div className="w-0.5 bg-border border-dashed h-full" />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">5</div>
                      <div className="bg-emerald-600 text-white rounded-xl px-3.5 py-2 flex-1 text-xs font-bold shadow-md shadow-emerald-600/10">
                        Work approved: Escrow released (80% Tutor, 20% Platform)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL: HOW */}
            {activeTab === 'how' && (
              <div className="space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-foreground">Interactive Project Lifecycle</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    Click through the steps below to see exactly how transactions, communication, and files flow from start to completion.
                  </p>
                </div>

                {/* Steps Horizontal Selector */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {howSteps.map((s) => (
                    <button
                      key={s.step}
                      onClick={() => setActiveHowStep(s.step)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        activeHowStep === s.step
                          ? 'border-primary/50 bg-primary/5 font-bold text-primary shadow-sm'
                          : 'border-border bg-card text-muted-foreground hover:bg-accent/40'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold tracking-widest mb-0.5">Step</div>
                      <div className="text-lg font-black">{s.step}</div>
                      <div className="text-[10px] truncate max-w-full font-bold">{s.title.split(' ')[0]}...</div>
                    </button>
                  ))}
                </div>

                {/* Active Step Panel */}
                <div className="grid md:grid-cols-5 gap-8 bg-card border border-border/40 rounded-3xl p-6 md:p-8 shadow-sm">
                  {/* Left Side: Info */}
                  <div className="md:col-span-3 space-y-5 flex flex-col justify-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="h-7 w-7 rounded-lg bg-primary text-white font-black text-xs flex items-center justify-center shadow-md shadow-primary/20">
                          {howSteps[activeHowStep - 1].step}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-widest ${howSteps[activeHowStep - 1].badgeColor}`}>
                          {howSteps[activeHowStep - 1].badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {howSteps[activeHowStep - 1].title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                        {howSteps[activeHowStep - 1].desc}
                      </p>
                    </div>

                    <div className="border-t border-border/80 pt-4 space-y-2">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Key Mechanics</div>
                      <ul className="space-y-1.5 text-xs text-foreground/80 font-medium">
                        {howSteps[activeHowStep - 1].details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Side: Mock UI Representation */}
                  <div className="md:col-span-2 flex items-center justify-center bg-accent/15 border border-border/40 rounded-2xl p-6">
                    <div className="w-full max-w-xs">
                      {howSteps[activeHowStep - 1].mockUI}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL: WHY */}
            {activeTab === 'why' && (
              <div className="space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-foreground">Why Choose StudyGig?</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    Unlike standard academic agencies that operate as hidden black-boxes, StudyGig provides a direct, highly secure, and transparent peer-to-peer ecosystem.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* StudyGig Column */}
                  <div className="bg-primary/[0.03] border border-primary/20 rounded-3xl p-6 md:p-8 space-y-5">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
                      <CheckCircle2 className="h-4 w-4" /> The StudyGig Way
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <strong className="block text-foreground mb-0.5">Escrow holding</strong>
                          Tutors are not paid until deliverables are uploaded and student is completely satisfied.
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <strong className="block text-foreground mb-0.5">Direct chat collaboration</strong>
                          Converse directly with solvers to clarify equations, code, or requirements. No support buffers.
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <strong className="block text-foreground mb-0.5">Custom marketplace bids</strong>
                          Competitive bidding forces market-fair prices. Pay what fits your budget parameters.
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <strong className="block text-foreground mb-0.5">Built-in arbitration rounds</strong>
                          Admin disputes and strict versioned deliverable checks keep both parties honest.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Traditional Agencies Column */}
                  <div className="bg-[#FAF7F0]/40 border border-border/80 rounded-3xl p-6 md:p-8 space-y-5">
                    <div className="flex items-center gap-2 text-muted-foreground font-black uppercase tracking-widest text-xs">
                      <X className="h-4 w-4" /> Traditional Agencies
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex gap-3 opacity-75">
                        <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <strong className="block text-foreground mb-0.5">Upfront full payment</strong>
                          Tutors require 100% upfront fees. If the work is incomplete or wrong, getting a refund is nearly impossible.
                        </div>
                      </div>

                      <div className="flex gap-3 opacity-75">
                        <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <strong className="block text-foreground mb-0.5">Anonymized brokers</strong>
                          Students cannot speak to the expert directly. Instructions are filtered through support teams, causing confusion.
                        </div>
                      </div>

                      <div className="flex gap-3 opacity-75">
                        <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <strong className="block text-foreground mb-0.5">Inflated pricing margins</strong>
                          Agencies take huge cuts (often 60%+), raising prices for students while paying tutors peanuts.
                        </div>
                      </div>

                      <div className="flex gap-3 opacity-75">
                        <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <div className="text-xs">
                          <strong className="block text-foreground mb-0.5">No quality leverage</strong>
                          Students have no leverage to request major modifications after files are sent, as payment is already gone.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Safety Warning Card */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex gap-3 text-amber-900">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold leading-relaxed">
                    StudyGig does not support academic dishonesty. The system is designed to provide collaborative tutoring, study resources, coding/math support guides, and customized review material to help students learn.
                  </div>
                </div>
              </div>
            )}

            {/* PANEL: USES */}
            {activeTab === 'uses' && (
              <div className="space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-foreground">Uses & Supported Fields</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    StudyGig solvers are experts across various academic levels (Undergrad, Graduate, and PhD) covering many disciplines.
                  </p>
                </div>

                {/* Categories Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((c, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-3xl border transition-all duration-300 ${c.accent}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${c.iconBg}`}>
                          <c.icon className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="font-bold text-sm text-foreground">{c.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-medium">
                        {c.desc}
                      </p>
                      <div className="space-y-2 border-t border-border/40 pt-4">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground block">Example Tasks</span>
                        <ul className="space-y-1">
                          {c.examples.map((ex, exIdx) => (
                            <li key={exIdx} className="text-xs text-foreground/80 flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-current shrink-0" />
                              <span className="truncate">{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* ─── CALL TO ACTION ─── */}
      <div className="border-t border-border/80 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="font-bold text-sm text-foreground">Have academic tasks you need help with?</h4>
          <p className="text-xs text-muted-foreground mt-0.5">Post a task in 2 minutes and check competitive solver proposals.</p>
        </div>
        <button
          onClick={() => window.location.href = '/marketplace'}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#FAF7F0] btn-brown"
        >
          Explore Marketplace <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
