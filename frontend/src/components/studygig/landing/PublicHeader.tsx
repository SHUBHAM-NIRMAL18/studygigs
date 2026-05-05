'use client'

import React from 'react'
import { GraduationCap, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface PublicHeaderProps {
  onLoginClick: () => void
  onSignUpClick: () => void
}

export function PublicHeader({ onLoginClick, onSignUpClick }: PublicHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            StudyGig
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How it Works</a>
          <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-sm" onClick={onLoginClick}>
            Log In
          </Button>
          <Button size="sm" className="rounded-full px-5 text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" onClick={onSignUpClick}>
            Get Started
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 mb-8">
                   <GraduationCap className="h-6 w-6 text-primary" />
                   StudyGig
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <a href="#features" className="text-lg font-medium hover:text-primary transition-colors">Features</a>
                <a href="#how-it-works" className="text-lg font-medium hover:text-primary transition-colors">How it Works</a>
                <a href="#testimonials" className="text-lg font-medium hover:text-primary transition-colors">Success Stories</a>
                <hr className="my-4" />
                <Button variant="outline" className="w-full" onClick={onLoginClick}>Log In</Button>
                <Button className="w-full" onClick={onSignUpClick}>Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
