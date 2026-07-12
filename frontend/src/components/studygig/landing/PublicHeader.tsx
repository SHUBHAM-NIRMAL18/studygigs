'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface PublicHeaderProps {
  onLoginClick: () => void
  onSignUpClick: () => void
  isAuthenticated?: boolean
}

const navLinks = [
  { label: 'Explore Tasks', href: '/explore' },
  { label: 'Features',      href: '/features' },
  { label: 'How it Works',  href: '/#how-it-works' },
  { label: 'Testimonials',  href: '/#testimonials' },
]

export function PublicHeader({ onLoginClick, onSignUpClick, isAuthenticated }: PublicHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-400 ${
          scrolled
            ? 'bg-[#FAF7F0]/95 border-b border-[#D4A97A]/30 shadow-sm shadow-[#6B4226]/8'
            : 'bg-[#FAF7F0]/80 border-b border-transparent'
        }`}
        style={{ backdropFilter: scrolled ? 'none' : 'none' }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6B4226] shadow-md shadow-[#6B4226]/30 group-hover:bg-[#7C4A2A] transition-colors duration-300">
              <GraduationCap className="h-5 w-5 text-[#FAF7F0]" />
            </div>
            <span className="text-xl font-black tracking-tight text-[#2C1810]">
              Study<span className="text-[#8B5E3C]">Gig</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-[#5C3D2A]/70 hover:text-[#5C3D2A] transition-colors duration-200 rounded-xl hover:bg-[#6B4226]/8 group"
              >
                {link.label}
                <span className="absolute bottom-1.5 left-4 right-4 h-px bg-[#8B5E3C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#FAF7F0] btn-brown"
                onClick={() => window.location.href = '/dashboard'}
              >
                Dashboard <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <>
                <button
                  className="px-4 py-2 text-sm font-semibold text-[#5C3D2A] hover:text-[#3D2314] transition-colors"
                  onClick={onLoginClick}
                >
                  Log In
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[#FAF7F0] btn-brown"
                  onClick={onSignUpClick}
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-[#5C3D2A] hover:bg-[#6B4226]/10 transition-all"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-[#2C1810]/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-80 bg-[#FAF7F0] border-l border-[#D4A97A]/25 flex flex-col shadow-2xl shadow-[#2C1810]/20"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#D4A97A]/20">
                <span className="text-lg font-black text-[#2C1810]">Menu</span>
                <button
                  className="p-2 rounded-xl text-[#5C3D2A]/60 hover:text-[#2C1810] hover:bg-[#6B4226]/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col p-5 gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="px-4 py-3 rounded-xl text-[#5C3D2A] font-semibold hover:bg-[#6B4226]/10 hover:text-[#2C1810] transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto p-6 border-t border-[#D4A97A]/20 flex flex-col gap-3">
                {isAuthenticated ? (
                  <button className="w-full py-3 rounded-xl font-bold text-[#FAF7F0] btn-brown" onClick={() => window.location.href = '/dashboard'}>
                    Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      className="w-full py-3 rounded-xl font-bold border border-[#8B5E3C] text-[#6B4226] hover:bg-[#6B4226]/8 transition-all"
                      onClick={() => { onLoginClick(); setMobileOpen(false) }}
                    >
                      Log In
                    </button>
                    <button
                      className="w-full py-3 rounded-xl font-bold text-[#FAF7F0] btn-brown"
                      onClick={() => { onSignUpClick(); setMobileOpen(false) }}
                    >
                      Get Started Free
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
