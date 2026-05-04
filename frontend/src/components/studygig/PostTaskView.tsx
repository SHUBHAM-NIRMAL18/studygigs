'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/store/app-store'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, DollarSign, Clock } from 'lucide-react'

export function PostTaskView() {
  const { currentUser, setTasks } = useAppStore()
  const router = useRouter()
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: '', description: '', category: '', academicLevel: '',
    budgetMin: '', budgetMax: '', deadline: ''
  })

  const updateForm = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

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
      toast({ title: 'Invalid budget', description: 'Minimum budget cannot exceed maximum', variant: 'destructive' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, posterId: currentUser.id })
      })
      if (!res.ok) throw new Error('Failed to create task')
      const task = await res.json()
      toast({ title: 'Task posted!', description: `"${task.title}" is now live in the marketplace` })
      // Refresh tasks list to include newly posted task
      fetch('/api/tasks?limit=100')
        .then(res => res.json())
        .then(data => setTasks(data.tasks || []))
        .catch(() => {})
      router.push('/marketplace')
    } catch {
      toast({ title: 'Error', description: 'Failed to post task', variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.push('/marketplace')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Post a New Task</h1>
          <p className="text-sm text-muted-foreground">Describe your assignment and set your budget</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Task Details</CardTitle>
          <CardDescription>Provide as much detail as possible to attract the best solvers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" placeholder="e.g., Linear Algebra Final Exam Prep" value={form.title} onChange={(e) => updateForm('title', e.target.value)} />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" placeholder="Describe your assignment in detail: requirements, format, specific topics, etc." rows={5} value={form.description} onChange={(e) => updateForm('description', e.target.value)} />
          </div>

          {/* Category & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => updateForm('category', v)}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
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
            <div className="space-y-2">
              <Label>Academic Level *</Label>
              <Select value={form.academicLevel} onValueChange={(v) => updateForm('academicLevel', v)}>
                <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                  <SelectItem value="UNDERGRAD">Undergraduate</SelectItem>
                  <SelectItem value="GRAD">Graduate</SelectItem>
                  <SelectItem value="PHD">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" /> Budget Range *
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input type="number" placeholder="Min ($)" value={form.budgetMin} onChange={(e) => updateForm('budgetMin', e.target.value)} />
              <Input type="number" placeholder="Max ($)" value={form.budgetMax} onChange={(e) => updateForm('budgetMax', e.target.value)} />
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Deadline *
            </Label>
            <Input type="datetime-local" value={form.deadline} onChange={(e) => updateForm('deadline', e.target.value)} />
          </div>

          {/* Platform Fee Notice */}
          <div className="rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
            <strong>📋 Escrow Protection:</strong> Your payment is held in escrow until you approve the deliverable. A 12% platform fee applies to completed tasks. You can request up to 3 rounds of revisions.
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => router.push('/marketplace')}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Task'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
