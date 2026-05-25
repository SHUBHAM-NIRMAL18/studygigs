'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app-store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  DollarSign, 
  Calendar, 
  Clock, 
  Trophy 
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function OnboardingWizard() {
  const { currentUser, setCurrentUser } = useAppStore()
  const { toast } = useToast()
  
  const role = currentUser?.role || 'STUDENT'
  const isStudent = role === 'STUDENT'
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState<any>({
    // Student fields
    studyField: '',
    academicLevel: 'UNDERGRAD',
    subjects: [] as string[],
    frequency: 'WEEKLY',
    budgetMax: 150,

    // Solver fields
    qualification: 'BACHELORS',
    experience: '1-3 years',
    availability: '10-20 hours',
    hourlyRate: 35,
  })

  const TOTAL_STEPS = 5

  const updateAnswer = (key: string, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSubjectToggle = (subject: string) => {
    const current = [...answers.subjects]
    const idx = current.indexOf(subject)
    if (idx > -1) {
      current.splice(idx, 1)
    } else {
      current.push(subject)
    }
    updateAnswer('subjects', current)
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: answers }),
      })

      if (!response.ok) {
        throw new Error('Failed to save onboarding response')
      }

      const resData = await response.json()
      
      toast({
        title: 'Profile Ready! 🎉',
        description: 'Your tailored StudyGig dashboard is ready.',
        variant: 'success',
      })

      if (resData.user) {
        setCurrentUser(resData.user)
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error saving profile',
        description: 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // --- RENDERING HELPERS ---

  // Student Step 1: Field of Study
  const renderStudentStep1 = () => {
    const fields = [
      { id: 'CS', label: 'Computer Science & Tech', icon: '💻' },
      { id: 'MATH', label: 'Mathematics & Stats', icon: '📐' },
      { id: 'SCIENCE', label: 'Natural Sciences (Physics, Bio, Chem)', icon: '🔬' },
      { id: 'HUMANITIES', label: 'Humanities & Social Sciences', icon: '📚' },
      { id: 'BUSINESS', label: 'Business, Econ & Finance', icon: '📈' },
      { id: 'ENGINEERING', label: 'Engineering', icon: '⚙️' },
      { id: 'MEDICINE', label: 'Medicine & Health Science', icon: '🏥' },
      { id: 'LAW', label: 'Law & Public Policy', icon: '⚖️' },
    ]
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 1 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">What is your primary field of study?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">We'll use this to match you with experts in your major.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          {fields.map((f) => (
            <button
              key={f.id}
              onClick={() => updateAnswer('studyField', f.label)}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                answers.studyField === f.label
                  ? 'border-[#6B4226] bg-[#6B4226]/5 shadow-sm ring-1 ring-[#6B4226]'
                  : 'border-[#D4A97A]/20 bg-white hover:border-[#D4A97A]/40 hover:bg-[#FAF7F0]/40'
              }`}
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="text-sm font-bold text-[#2C1810]">{f.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Student Step 2: Academic Level
  const renderStudentStep2 = () => {
    const levels = [
      { id: 'HIGH_SCHOOL', label: 'High School', desc: 'Pre-university level tasks' },
      { id: 'UNDERGRAD', label: 'Undergraduate', desc: 'College/University bachelor degree' },
      { id: 'GRAD', label: 'Graduate', desc: "Master's level coursework" },
      { id: 'PHD', label: 'PhD / Post-Graduate', desc: 'Doctoral research and complex work' },
    ]
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 2 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">What is your academic level?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">Ensures solvers have the right credentials for your homework.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4">
          {levels.map((l) => (
            <button
              key={l.id}
              onClick={() => updateAnswer('academicLevel', l.id)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                answers.academicLevel === l.id
                  ? 'border-[#6B4226] bg-[#6B4226]/5 shadow-sm ring-1 ring-[#6B4226]'
                  : 'border-[#D4A97A]/20 bg-white hover:border-[#D4A97A]/40 hover:bg-[#FAF7F0]/40'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#2C1810]">{l.label}</span>
                <p className="text-xs text-[#5C3D2A]/60 font-medium">{l.desc}</p>
              </div>
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                answers.academicLevel === l.id ? 'border-[#6B4226] bg-[#6B4226] text-[#FAF7F0]' : 'border-[#D4A97A]/40'
              }`}>
                {answers.academicLevel === l.id && <Check className="h-3 w-3" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Student Step 3: Subjects Need Help
  const renderStudentStep3 = () => {
    const subjects = ['Mathematics', 'Python/JS Programming', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'History', 'Business Administration', 'Economics', 'Law', 'Medical Studies', 'Data Science']
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 3 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">Which subjects need help most?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">Select all that apply. We'll customize your feed recommendations.</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center pt-4 max-w-lg mx-auto">
          {subjects.map((subj) => {
            const isSelected = answers.subjects.includes(subj)
            return (
              <button
                key={subj}
                type="button"
                onClick={() => handleSubjectToggle(subj)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#6B4226] border-[#6B4226] text-[#FAF7F0] shadow-sm'
                    : 'bg-white border-[#D4A97A]/25 text-[#5C3D2A] hover:border-[#D4A97A]/50 hover:bg-[#FAF7F0]/40'
                }`}
              >
                {subj}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Student Step 4: Help Frequency
  const renderStudentStep4 = () => {
    const frequencies = [
      { id: 'DAILY', label: 'Almost daily', desc: 'Frequent assignments & continuous studies' },
      { id: 'WEEKLY', label: 'Weekly or bi-weekly', desc: 'Regular homework and test preps' },
      { id: 'OCCASIONALLY', label: 'Occasionally', desc: 'Only for major projects or tough tasks' },
      { id: 'EXAMS', label: 'Just before exams', desc: 'Pre-exam crash courses and sample papers' },
    ]
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 4 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">How often do you need help?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">Helps us recommend solvers matching your schedule needs.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4">
          {frequencies.map((f) => (
            <button
              key={f.id}
              onClick={() => updateAnswer('frequency', f.id)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                answers.frequency === f.id
                  ? 'border-[#6B4226] bg-[#6B4226]/5 shadow-sm ring-1 ring-[#6B4226]'
                  : 'border-[#D4A97A]/20 bg-white hover:border-[#D4A97A]/40 hover:bg-[#FAF7F0]/40'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#2C1810]">{f.label}</span>
                <p className="text-xs text-[#5C3D2A]/60 font-medium">{f.desc}</p>
              </div>
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                answers.frequency === f.id ? 'border-[#6B4226] bg-[#6B4226] text-[#FAF7F0]' : 'border-[#D4A97A]/40'
              }`}>
                {answers.frequency === f.id && <Check className="h-3 w-3" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Student Step 5: Budget Range
  const renderStudentStep5 = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 5 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">What's your typical task budget?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">We'll show solvers whose prices align with your budget.</p>
        </div>
        
        <div className="py-8 px-4 bg-[#FAF7F0]/60 rounded-2xl border border-[#D4A97A]/15 max-w-sm mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black tracking-wider text-[#5C3D2A]/60 uppercase">Maximum Budget</span>
            <div className="text-4xl font-black text-[#6B4226] flex items-center justify-center">
              <DollarSign className="h-8 w-8 -mr-1" />
              {answers.budgetMax}
            </div>
          </div>
          <Slider
            min={10}
            max={500}
            step={10}
            value={[answers.budgetMax]}
            onValueChange={(val) => updateAnswer('budgetMax', val[0])}
            className="[&_[role=slider]]:bg-[#6B4226] [&_[role=slider]]:border-[#6B4226]"
          />
          <div className="flex justify-between text-[10px] font-black text-[#5C3D2A]/60">
            <span>$10 MIN</span>
            <span>$500 MAX</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-[#5C3D2A]/60 max-w-xs mx-auto">
            You can always propose custom budgets for individual tasks.
          </p>
        </div>
      </div>
    )
  }

  // --- SOLVER STEPS ---

  // Solver Step 1: Subjects They Can Solve
  const renderSolverStep1 = () => {
    const subjects = ['Mathematics', 'Python/JS Programming', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'History', 'Business Administration', 'Economics', 'Law', 'Medical Studies', 'Data Science']
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 1 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">What subjects can you expertly solve?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">Pick subjects where you have solid academic or industry experience.</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center pt-4 max-w-lg mx-auto">
          {subjects.map((subj) => {
            const isSelected = answers.subjects.includes(subj)
            return (
              <button
                key={subj}
                type="button"
                onClick={() => handleSubjectToggle(subj)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#6B4226] border-[#6B4226] text-[#FAF7F0] shadow-sm'
                    : 'bg-white border-[#D4A97A]/25 text-[#5C3D2A] hover:border-[#D4A97A]/50 hover:bg-[#FAF7F0]/40'
                }`}
              >
                {subj}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Solver Step 2: Qualification
  const renderSolverStep2 = () => {
    const levels = [
      { id: 'BACHELORS', label: "Bachelor's Degree", desc: 'Currently enrolled or completed undergrad' },
      { id: 'MASTERS', label: "Master's Degree", desc: 'Advanced university coursework' },
      { id: 'PHD', label: 'PhD / Doctorate', desc: 'Highly advanced scientific/academic credentials' },
      { id: 'PROFESSIONAL', label: 'Industry Professional', desc: 'Expert in active corporate/research sector' },
    ]
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 2 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">What's your highest qualification?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">This badge displays on your profile to win student trust.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4">
          {levels.map((l) => (
            <button
              key={l.id}
              onClick={() => updateAnswer('qualification', l.id)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                answers.qualification === l.id
                  ? 'border-[#6B4226] bg-[#6B4226]/5 shadow-sm ring-1 ring-[#6B4226]'
                  : 'border-[#D4A97A]/20 bg-white hover:border-[#D4A97A]/40 hover:bg-[#FAF7F0]/40'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#2C1810]">{l.label}</span>
                <p className="text-xs text-[#5C3D2A]/60 font-medium">{l.desc}</p>
              </div>
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                answers.qualification === l.id ? 'border-[#6B4226] bg-[#6B4226] text-[#FAF7F0]' : 'border-[#D4A97A]/40'
              }`}>
                {answers.qualification === l.id && <Check className="h-3 w-3" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Solver Step 3: Experience
  const renderSolverStep3 = () => {
    const experiences = [
      { id: 'Less than 1 year', label: 'Under 1 year', desc: 'New to professional academic tutoring' },
      { id: '1-3 years', label: '1 - 3 Years', desc: 'Solid base of homework solving & tutoring' },
      { id: '3-5 years', label: '3 - 5 Years', desc: 'Experienced tutor with strong subject mastery' },
      { id: '5+ years', label: '5+ Years', desc: 'Veteran expert with deep educational record' },
    ]
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 3 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">How long have you been tutoring?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">Your experience helps students choose you for complex tasks.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => updateAnswer('experience', exp.id)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                answers.experience === exp.id
                  ? 'border-[#6B4226] bg-[#6B4226]/5 shadow-sm ring-1 ring-[#6B4226]'
                  : 'border-[#D4A97A]/20 bg-white hover:border-[#D4A97A]/40 hover:bg-[#FAF7F0]/40'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#2C1810]">{exp.label}</span>
                <p className="text-xs text-[#5C3D2A]/60 font-medium">{exp.desc}</p>
              </div>
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                answers.experience === exp.id ? 'border-[#6B4226] bg-[#6B4226] text-[#FAF7F0]' : 'border-[#D4A97A]/40'
              }`}>
                {answers.experience === exp.id && <Check className="h-3 w-3" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Solver Step 4: Availability
  const renderSolverStep4 = () => {
    const times = [
      { id: 'Less than 10 hours', label: 'Part Time (<10 hrs/wk)', desc: 'Side gig alongside studies or job' },
      { id: '10-20 hours', label: 'Active Solver (10-20 hrs/wk)', desc: 'Consistent daily availability' },
      { id: '20-40 hours', label: 'Committed Solver (20-40 hrs/wk)', desc: 'Substantial weekly work focus' },
      { id: 'Full-time', label: 'Full Time (40+ hrs/wk)', desc: 'Primary career focus on StudyGig' },
    ]
    return (
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 4 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">What is your weekly availability?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">Helps set matching client expectations on deliverable speeds.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4">
          {times.map((t) => (
            <button
              key={t.id}
              onClick={() => updateAnswer('availability', t.id)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                answers.availability === t.id
                  ? 'border-[#6B4226] bg-[#6B4226]/5 shadow-sm ring-1 ring-[#6B4226]'
                  : 'border-[#D4A97A]/20 bg-white hover:border-[#D4A97A]/40 hover:bg-[#FAF7F0]/40'
              }`}
            >
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#2C1810]">{t.label}</span>
                <p className="text-xs text-[#5C3D2A]/60 font-medium">{t.desc}</p>
              </div>
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                answers.availability === t.id ? 'border-[#6B4226] bg-[#6B4226] text-[#FAF7F0]' : 'border-[#D4A97A]/40'
              }`}>
                {answers.availability === t.id && <Check className="h-3 w-3" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Solver Step 5: Hourly Rate
  const renderSolverStep5 = () => {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-[#6B4226] bg-[#6B4226]/10 px-2.5 py-1 rounded-full uppercase">Step 5 of 5</span>
          <h2 className="text-2xl font-black text-[#2C1810] tracking-tight">What is your expected hourly rate?</h2>
          <p className="text-[#5C3D2A]/70 text-sm font-medium">This acts as a guide price when bidding on custom tasks.</p>
        </div>
        
        <div className="py-8 px-4 bg-[#FAF7F0]/60 rounded-2xl border border-[#D4A97A]/15 max-w-sm mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black tracking-wider text-[#5C3D2A]/60 uppercase">Target Hourly Rate</span>
            <div className="text-4xl font-black text-[#6B4226] flex items-center justify-center">
              <DollarSign className="h-8 w-8 -mr-1" />
              {answers.hourlyRate}
              <span className="text-sm font-bold text-[#5C3D2A]/60 ml-1">/ hr</span>
            </div>
          </div>
          <Slider
            min={15}
            max={150}
            step={5}
            value={[answers.hourlyRate]}
            onValueChange={(val) => updateAnswer('hourlyRate', val[0])}
            className="[&_[role=slider]]:bg-[#6B4226] [&_[role=slider]]:border-[#6B4226]"
          />
          <div className="flex justify-between text-[10px] font-black text-[#5C3D2A]/60">
            <span>$15 MIN</span>
            <span>$150 MAX</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-[#5C3D2A]/60 max-w-xs mx-auto">
            You can bid custom rates for tasks depending on complexity.
          </p>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    if (isStudent) {
      switch (step) {
        case 1: return renderStudentStep1()
        case 2: return renderStudentStep2()
        case 3: return renderStudentStep3()
        case 4: return renderStudentStep4()
        case 5: return renderStudentStep5()
        default: return null
      }
    } else {
      switch (step) {
        case 1: return renderSolverStep1()
        case 2: return renderSolverStep2()
        case 3: return renderSolverStep3()
        case 4: return renderSolverStep4()
        case 5: return renderSolverStep5()
        default: return null
      }
    }
  }

  // Check if "Next" button should be disabled for the current step (force choice on key questions)
  const isNextDisabled = () => {
    if (isStudent) {
      if (step === 1 && !answers.studyField) return true
      if (step === 3 && answers.subjects.length === 0) return true
    } else {
      if (step === 1 && answers.subjects.length === 0) return true
    }
    return false
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF7F0] grain-texture relative p-6 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_20%_20%,_rgba(160,100,58,0.12)_0%,_transparent_60%)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_80%_80%,_rgba(196,135,79,0.15)_0%,_transparent_60%)]" />
      </div>

      <div className="w-full max-w-xl flex flex-col items-center gap-6 relative z-10">
        
        {/* Header Branding */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#6B4226] flex items-center justify-center shadow-lg">
            <GraduationCap className="h-6 w-6 text-[#FAF7F0]" />
          </div>
          <span className="text-xl font-black tracking-tight text-[#2C1810]">StudyGig</span>
          <span className="text-xs font-black text-[#6B4226] bg-[#6B4226]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {isStudent ? 'STUDENT' : 'SOLVER'}
          </span>
        </div>

        {/* Card and Progress Container */}
        <Card className="w-full bg-white border-[#D4A97A]/25 shadow-2xl rounded-3xl overflow-hidden p-6 md:p-10 transition-all">
          <Progress 
            value={(step / TOTAL_STEPS) * 100} 
            className="h-1 bg-[#FAF7F0] [&>div]:bg-[#6B4226] mb-8" 
          />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="min-h-[340px] flex flex-col justify-between"
            >
              <div>
                {renderCurrentStep()}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#D4A97A]/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 1 || loading}
                  className="font-bold text-[#5C3D2A]/60 hover:text-[#2C1810] h-11 px-4 gap-2 rounded-xl"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="font-bold text-[#5C3D2A]/60 hover:text-[#2C1810] h-11 px-4 rounded-xl"
                  >
                    Skip
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled() || loading}
                    className="group inline-flex items-center gap-2 px-6 h-11 rounded-xl text-xs font-black text-[#FAF7F0] btn-brown"
                  >
                    {step === TOTAL_STEPS ? (
                      loading ? 'COMPLETING...' : 'FINISH'
                    ) : (
                      <>
                        NEXT
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>

        {/* Footer text */}
        <div className="text-center">
          <p className="text-[10px] text-[#5C3D2A]/60 font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center">
            <Sparkles className="h-3 w-3 text-[#6B4226]" />
            Tailoring your study space
          </p>
        </div>
      </div>
    </div>
  )
}
