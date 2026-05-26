'use client'

import { useState, useRef } from 'react'
import { useAppStore } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/hooks/use-toast'
import { isImageUrl } from '@/lib/avatar-utils'
import {
  Upload, Pencil, Loader2, Linkedin, Github, Twitter, Globe
} from 'lucide-react'

export const COVER_GRADIENTS = [
  { id: 'espresso', class: 'from-[#6B4226] via-[#A0643A] to-[#2C1810]', label: 'Walnut Espresso' },
  { id: 'indigo', class: 'from-indigo-600 via-purple-600 to-pink-600', label: 'Indigo Velvet' },
  { id: 'emerald', class: 'from-emerald-500 via-teal-600 to-cyan-700', label: 'Mint Emerald' },
  { id: 'sunset', class: 'from-orange-500 via-rose-500 to-violet-600', label: 'Sunset Glow' },
  { id: 'ocean', class: 'from-blue-600 via-cyan-500 to-emerald-400', label: 'Ocean Breeze' },
  { id: 'midnight', class: 'from-slate-800 via-slate-900 to-slate-950', label: 'Midnight Slate' },
]

export function EditProfileDialog() {
  const { currentUser, setCurrentUser } = useAppStore()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isStudent = currentUser?.role === 'STUDENT'
  const onbData = currentUser?.onboardingData || {}
  const socialLinks = onbData.socialLinks || {}

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || '',
    coverBanner: onbData.coverBanner || 'espresso',
    // Onboarding fields
    studyField: onbData.studyField || '',
    academicLevel: onbData.academicLevel || 'UNDERGRAD',
    frequency: onbData.frequency || 'WEEKLY',
    budgetMax: onbData.budgetMax || 150,
    qualification: onbData.qualification || 'BACHELORS',
    experience: onbData.experience || '1-3 years',
    availability: onbData.availability || '10-20 hours',
    hourlyRate: onbData.hourlyRate || 35,
    subjects: onbData.subjects || [],
    // Social links
    github: socialLinks.github || '',
    linkedin: socialLinks.linkedin || '',
    twitter: socialLinks.twitter || '',
    portfolio: socialLinks.portfolio || '',
  })

  // handle avatar upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileData = new FormData()
    fileData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fileData,
      })

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()
      setFormData(prev => ({ ...prev, avatar: data.url }))
      toast({
        title: 'Avatar uploaded successfully! 🎉',
        description: 'Save changes to update your profile.',
        variant: 'success',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Upload failed',
        description: 'Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubjectToggle = (subj: string) => {
    const current = [...formData.subjects]
    const idx = current.indexOf(subj)
    if (idx > -1) {
      current.splice(idx, 1)
    } else {
      current.push(subj)
    }
    setFormData(prev => ({ ...prev, subjects: current }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const updatedOnboarding = {
      ...onbData,
      studyField: formData.studyField,
      academicLevel: formData.academicLevel,
      frequency: formData.frequency,
      budgetMax: formData.budgetMax,
      qualification: formData.qualification,
      experience: formData.experience,
      availability: formData.availability,
      hourlyRate: formData.hourlyRate,
      subjects: formData.subjects,
      coverBanner: formData.coverBanner,
      socialLinks: {
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        portfolio: formData.portfolio,
      }
    }

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          avatar: formData.avatar,
          onboardingData: updatedOnboarding,
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const resData = await response.json()
      if (resData.user) {
        setCurrentUser(resData.user)
      }

      toast({
        title: 'Profile Updated! 🎉',
        description: 'Your profile details have been successfully saved.',
        variant: 'success',
      })
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast({
        title: 'Update failed',
        description: 'An error occurred while saving your profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const subjects = ['Mathematics', 'Python/JS Programming', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'History', 'Business Administration', 'Economics', 'Law', 'Medical Studies', 'Data Science']

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-10 px-4 rounded-xl border-border/40 font-bold text-xs uppercase tracking-wider gap-2 hover:bg-accent flex items-center justify-center shadow-sm">
          <Pencil className="h-3.5 w-3.5 text-primary" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="max-w-2xl rounded-3xl border-border/40 glass p-0 overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border/40">
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground">Edit Your Profile</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs font-medium leading-relaxed mt-1">
            Customize your professional appearance, social links, and expert subject domains.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 gap-1 bg-[#FAF7F0] border border-[#D4A97A]/20 p-1 rounded-xl mb-6">
              <TabsTrigger value="basic" className="rounded-lg text-xs font-black uppercase tracking-wider py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                1. Basic Info
              </TabsTrigger>
              <TabsTrigger value="academic" className="rounded-lg text-xs font-black uppercase tracking-wider py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {isStudent ? '2. Academic' : '2. Professional'}
              </TabsTrigger>
              <TabsTrigger value="socials" className="rounded-lg text-xs font-black uppercase tracking-wider py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                3. Social Links
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-5 focus-visible:outline-hidden">
              {/* Avatar Upload */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-[#FAF7F0]/40 rounded-2xl border border-border/30">
                <div className="relative group shrink-0">
                  <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-lg rounded-xl overflow-hidden bg-background">
                    {formData.avatar && isImageUrl(formData.avatar) ? (
                      <AvatarImage src={formData.avatar} className="object-cover" />
                    ) : null}
                    <AvatarFallback className="text-2xl font-black bg-primary/10 text-primary uppercase font-display flex items-center justify-center w-full h-full">
                      {formData.name.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  {uploading && (
                    <div className="absolute inset-0 bg-background/70 flex items-center justify-center rounded-xl">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Profile Picture</Label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="btn-brown text-[10px] font-black uppercase tracking-wider h-8 rounded-lg"
                    >
                      <Upload className="h-3 w-3 mr-1.5" />
                      Upload New
                    </Button>
                    {formData.avatar && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                        className="text-destructive hover:bg-destructive/10 text-[10px] font-black uppercase tracking-wider h-8 rounded-lg"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 font-medium">JPEG, PNG or WEBP. Max size 10MB.</p>
                </div>
              </div>

              {/* Cover Banner Selection */}
              <div className="space-y-3 p-4 bg-[#FAF7F0]/40 rounded-2xl border border-border/30">
                <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground block">Cover Banner Style</Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {COVER_GRADIENTS.map((grad) => (
                    <button
                      key={grad.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, coverBanner: grad.id }))}
                      className={`h-12 w-full rounded-xl bg-gradient-to-r ${grad.class} relative border-2 transition-all ${
                        formData.coverBanner === grad.id
                          ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-md'
                          : 'border-transparent hover:scale-102 hover:shadow-sm'
                      }`}
                      title={grad.label}
                    >
                      {formData.coverBanner === grad.id && (
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded-[10px]">
                          <span className="text-[8px] font-black text-white uppercase tracking-wider bg-black/30 px-1 py-0.5 rounded">Active</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. John Doe"
                  className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 text-sm bg-card"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Biography</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell students or solvers about yourself..."
                  className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary text-sm bg-card leading-relaxed resize-none"
                />
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6 focus-visible:outline-hidden">
              {isStudent ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studyField" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Field of Study</Label>
                      <Input
                        id="studyField"
                        type="text"
                        value={formData.studyField}
                        onChange={(e) => setFormData(prev => ({ ...prev, studyField: e.target.value }))}
                        placeholder="e.g. Computer Science"
                        className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 text-sm bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academicLevel" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Academic Level</Label>
                      <Select
                        value={formData.academicLevel}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, academicLevel: val }))}
                      >
                        <SelectTrigger className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 text-sm bg-card">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/40 rounded-xl">
                          <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                          <SelectItem value="UNDERGRAD">Undergraduate</SelectItem>
                          <SelectItem value="GRAD">Graduate</SelectItem>
                          <SelectItem value="PHD">PhD / Post-Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4 p-4 bg-[#FAF7F0]/40 rounded-2xl border border-border/30">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Max Task Budget</Label>
                      <span className="text-sm font-black text-primary">${formData.budgetMax}</span>
                    </div>
                    <Slider
                      min={10}
                      max={500}
                      step={10}
                      value={[formData.budgetMax]}
                      onValueChange={(val) => setFormData(prev => ({ ...prev, budgetMax: val[0] }))}
                      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="qualification" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Highest Qualification</Label>
                      <Select
                        value={formData.qualification}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, qualification: val }))}
                      >
                        <SelectTrigger className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 text-sm bg-card">
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/40 rounded-xl">
                          <SelectItem value="BACHELORS">Bachelor's Degree</SelectItem>
                          <SelectItem value="MASTERS">Master's Degree</SelectItem>
                          <SelectItem value="PHD">PhD / Doctorate</SelectItem>
                          <SelectItem value="PROFESSIONAL">Industry Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Tutoring Experience</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, experience: val }))}
                      >
                        <SelectTrigger className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 text-sm bg-card">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/40 rounded-xl">
                          <SelectItem value="Less than 1 year">Under 1 year</SelectItem>
                          <SelectItem value="1-3 years">1 - 3 years</SelectItem>
                          <SelectItem value="3-5 years">3 - 5 years</SelectItem>
                          <SelectItem value="5+ years">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="availability" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Weekly Availability</Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, availability: val }))}
                      >
                        <SelectTrigger className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 text-sm bg-card">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border/40 rounded-xl">
                          <SelectItem value="Less than 10 hours">Part Time (&lt;10 hrs/wk)</SelectItem>
                          <SelectItem value="10-20 hours">Active Solver (10-20 hrs/wk)</SelectItem>
                          <SelectItem value="20-40 hours">Committed Solver (20-40 hrs/wk)</SelectItem>
                          <SelectItem value="Full-time">Full Time (40+ hrs/wk)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4 p-4 bg-[#FAF7F0]/40 rounded-2xl border border-border/30">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Hourly Rate</Label>
                        <span className="text-sm font-black text-primary">${formData.hourlyRate} / hr</span>
                      </div>
                      <Slider
                        min={15}
                        max={150}
                        step={5}
                        value={[formData.hourlyRate]}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, hourlyRate: val[0] }))}
                        className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Subjects / Expertise</Label>
                <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto p-1 border border-border/30 rounded-2xl bg-[#FAF7F0]/30">
                  {subjects.map((subj) => {
                    const isSelected = formData.subjects.includes(subj)
                    return (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => handleSubjectToggle(subj)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all border ${
                          isSelected
                            ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                            : 'bg-card border-border/40 text-muted-foreground hover:border-primary/50 hover:bg-accent/40'
                        }`}
                      >
                        {subj}
                      </button>
                    )
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="socials" className="space-y-4 focus-visible:outline-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-xs font-black uppercase tracking-wider text-muted-foreground">LinkedIn URL</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="linkedin"
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="linkedin.com/in/username"
                      className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-10 text-xs bg-card"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github" className="text-xs font-black uppercase tracking-wider text-muted-foreground">GitHub URL</Label>
                  <div className="relative">
                    <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="github"
                      type="text"
                      value={formData.github}
                      onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                      placeholder="github.com/username"
                      className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-10 text-xs bg-card"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Twitter / X URL</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="twitter"
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                      placeholder="twitter.com/username"
                      className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-10 text-xs bg-card"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="text-xs font-black uppercase tracking-wider text-muted-foreground">Portfolio / Website URL</Label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="portfolio"
                      type="text"
                      value={formData.portfolio}
                      onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                      placeholder="myportfolio.com"
                      className="rounded-xl border-border/40 focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-10 text-xs bg-card"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4 border-t border-border/40 justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="font-bold text-muted-foreground hover:text-foreground h-11 px-6 rounded-xl text-xs uppercase tracking-wider"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || uploading}
              className="btn-brown h-11 px-8 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
