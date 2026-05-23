'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, DollarSign, Clock, Paperclip, Trash2, Loader2, FilePlus2, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
} as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
} as const

export function PostTaskView() {
  const { currentUser, setTasks } = useAppStore()
  const router = useRouter()
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [attachments, setAttachments] = useState<{ name: string; url: string }[]>([])

  const [form, setForm] = useState({
    title: '', description: '', category: '', academicLevel: '',
    budgetMin: '', budgetMax: '', deadline: ''
  })

  const updateForm = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setAttachments(prev => [...prev, data])
      toast({ title: 'Uploaded', description: `"${file.name}" attached successfully` })
    } catch {
      toast({ title: 'Upload error', description: 'Failed to upload attachment', variant: 'destructive' })
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!currentUser) {
      toast({ title: 'Error', description: 'Please select a user first', variant: 'destructive' })
      return
    }
    if (!form.title || !form.description || !form.category || !form.academicLevel || !form.budgetMin || !form.budgetMax || !form.deadline) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields', variant: 'destructive' })
      return
    }
    if (parseFloat(form.budgetMin) > parseFloat(form.budgetMax)) {
      toast({ title: 'Invalid budget', description: 'Minimum cannot exceed maximum', variant: 'destructive' })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, posterId: currentUser.id, attachments })
      })
      if (!res.ok) throw new Error('Failed to create task')
      const task = await res.json()
      toast({ title: 'Task posted!', description: `"${task.title}" is now live in the marketplace` })
      fetch('/api/tasks?limit=100')
        .then(r => r.json())
        .then(data => setTasks(data.tasks || []))
        .catch(() => {})
      router.push('/marketplace')
    } catch {
      toast({ title: 'Error', description: 'Failed to post task', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = "h-10 rounded-lg border-border/50 bg-background/60 focus-visible:ring-1 focus-visible:ring-primary/40 text-sm font-medium placeholder:text-muted-foreground/50"
  const labelClass = "text-[11px] font-black uppercase tracking-widest text-muted-foreground"

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto pb-8 space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 pb-4 border-b border-border/40">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/marketplace')}
          className="h-9 w-9 rounded-lg border border-border/40 bg-card/60 hover:bg-accent/10 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
              <FilePlus2 className="h-3.5 w-3.5 text-primary" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-foreground font-display">Post a Task</h1>
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            Describe your assignment, set your budget, and attract expert solvers.
          </p>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div variants={itemVariants}>
        <Card className="glass-premium border-border/40 shadow-sm">
          <CardContent className="p-6 space-y-5">

            {/* Title */}
            <div className="space-y-1.5">
              <Label className={labelClass}>Title <span className="text-primary">*</span></Label>
              <Input
                id="title"
                placeholder="e.g., Linear Algebra Final Exam Prep"
                className={inputClass}
                value={form.title}
                onChange={e => updateForm('title', e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label className={labelClass}>Description <span className="text-primary">*</span></Label>
              <Textarea
                id="description"
                placeholder="Describe your assignment in detail: requirements, format, specific topics, expected output..."
                rows={5}
                className="rounded-lg border-border/50 bg-background/60 focus-visible:ring-1 focus-visible:ring-primary/40 text-sm font-medium placeholder:text-muted-foreground/50 resize-none"
                value={form.description}
                onChange={e => updateForm('description', e.target.value)}
              />
            </div>

            {/* Category & Level */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className={labelClass}>Subject <span className="text-primary">*</span></Label>
                <Select value={form.category} onValueChange={v => updateForm('category', v)}>
                  <SelectTrigger className={`${inputClass} w-full`}>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="MATH">Mathematics</SelectItem>
                    <SelectItem value="CS">Computer Science</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="ENGLISH">English</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BUSINESS">Business</SelectItem>
                    <SelectItem value="LAW">Law</SelectItem>
                    <SelectItem value="MEDICINE">Medicine</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className={labelClass}>Academic Level <span className="text-primary">*</span></Label>
                <Select value={form.academicLevel} onValueChange={v => updateForm('academicLevel', v)}>
                  <SelectTrigger className={`${inputClass} w-full`}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                    <SelectItem value="UNDERGRAD">Undergraduate</SelectItem>
                    <SelectItem value="GRAD">Graduate</SelectItem>
                    <SelectItem value="PHD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <Label className={labelClass}>
                <DollarSign className="h-3 w-3 inline -mt-0.5 mr-0.5" />
                Budget Range <span className="text-primary">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Min ($)"
                  className={inputClass}
                  value={form.budgetMin}
                  onChange={e => updateForm('budgetMin', e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max ($)"
                  className={inputClass}
                  value={form.budgetMax}
                  onChange={e => updateForm('budgetMax', e.target.value)}
                />
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-1.5">
              <Label className={labelClass}>
                <Clock className="h-3 w-3 inline -mt-0.5 mr-0.5" />
                Deadline <span className="text-primary">*</span>
              </Label>
              <Input
                type="datetime-local"
                className={inputClass}
                value={form.deadline}
                onChange={e => updateForm('deadline', e.target.value)}
              />
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <Label className={labelClass}>
                <Paperclip className="h-3 w-3 inline -mt-0.5 mr-0.5" />
                Attachments
              </Label>
              <div className="flex items-center gap-3">
                <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={uploading}
                  className="h-9 rounded-lg border-border/50 bg-background/60 text-[11px] font-bold uppercase tracking-wider hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all"
                >
                  {uploading ? (
                    <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Uploading...</>
                  ) : (
                    <><Paperclip className="h-3.5 w-3.5 mr-1.5" /> Attach File</>
                  )}
                </Button>
                <span className="text-[10px] text-muted-foreground font-medium">PDF, Word, Images, ZIP (max 10MB)</span>
              </div>
              {attachments.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-2.5 rounded-lg border border-border/40 bg-background/40">
                      <div className="flex items-center gap-2 truncate">
                        <Paperclip className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="truncate font-medium">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md shrink-0"
                        onClick={() => handleRemoveAttachment(index)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Escrow Notice */}
            <div className="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/5 p-3.5">
              <ShieldCheck className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                <span className="font-black text-foreground">Escrow Protected.</span> Your payment is held securely until you approve the deliverable. 12% platform fee applies. Up to 3 revision rounds included.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                onClick={() => router.push('/marketplace')}
                className="h-10 rounded-lg border-border/50 font-bold text-xs uppercase tracking-wider hover:bg-accent/10 flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="h-10 rounded-lg font-black text-xs uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex-1"
              >
                {submitting ? (
                  <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Posting...</>
                ) : (
                  'Post Task'
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
