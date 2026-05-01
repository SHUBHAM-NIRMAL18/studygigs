'use client'

import React from 'react'
import { GraduationCap, Github, Twitter, Linkedin, Facebook } from 'lucide-react'

export function PublicFooter() {
  return (
    <footer className="bg-background relative overflow-hidden">
      {/* Nepal/Bhutan Inspired Mountain Landscape Background (AVIF) */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
        <img 
          src="/footer-mountain.avif" 
          alt="Himalayan Landscape" 
          className="w-full h-auto max-h-[320px] object-contain object-bottom transition-opacity duration-1000 opacity-90"
          onError={(e) => (e.currentTarget.style.display = 'none')} 
        />
        
        {/* Flying Birds (Flying OVER the image) */}
        <div className="absolute top-10 left-[-10%] animate-[fly_20s_linear_infinite]">
          <svg width="40" height="20" viewBox="0 0 40 20" className="text-[#1e293b]">
            <path className="bird-wing" d="M0,10 C10,0 20,10 20,10 C20,10 30,0 40,10 L38,12 C28,2 20,10 20,10 C20,10 12,2 2,12 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-24 left-[-20%] animate-[fly_28s_linear_infinite_4s]">
          <svg width="30" height="15" viewBox="0 0 40 20" className="text-[#334155]">
            <path className="bird-wing" style={{ animationDuration: '0.8s' }} d="M0,10 C10,0 20,10 20,10 C20,10 30,0 40,10 L38,12 C28,2 20,10 20,10 C20,10 12,2 2,12 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-16 left-[-30%] animate-[fly_24s_linear_infinite_2s]">
          <svg width="35" height="18" viewBox="0 0 40 20" className="text-[#475569]">
            <path className="bird-wing" style={{ animationDuration: '0.4s' }} d="M0,10 C10,0 20,10 20,10 C20,10 30,0 40,10 L38,12 C28,2 20,10 20,10 C20,10 12,2 2,12 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes fly {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(35vw) translateY(-15px); }
          50% { transform: translateX(70vw) translateY(0); }
          75% { transform: translateX(105vw) translateY(-15px); }
          100% { transform: translateX(140vw) translateY(0); }
        }
        @keyframes flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.3); }
        }
        .bird-wing {
          transform-origin: center;
          animation: flap 0.6s ease-in-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">StudyGig</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trust & Safety</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dispute Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground font-medium">
        </div>
      </div>
    </footer>
  )
}