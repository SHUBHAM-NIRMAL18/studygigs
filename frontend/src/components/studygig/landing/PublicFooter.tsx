'use client'

import React from 'react'
import { GraduationCap, Github, Twitter, Linkedin, Facebook } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">StudyGig</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The world's first peer-to-peer academic marketplace where students help students succeed. 
              Secure, transparent, and built for the future of education.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trust & Safety</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dispute Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2025 StudyGig Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Secure SSL Encryption</span>
            <span>PCI DSS Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
