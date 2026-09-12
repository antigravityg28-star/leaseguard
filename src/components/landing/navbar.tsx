// =============================================================================
// LEASEGUARD B2B - Sticky Glassmorphism Header
// =============================================================================
"use client";

import Link from "next/link";
import { Shield, Sparkles, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground flex items-center gap-1.5">
              LeaseGuard
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                B2B
              </span>
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">Conduttori Commerciali</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#come-funziona" className="transition-colors hover:text-foreground">
            Come Funziona
          </a>
          <a href="#calcolatore" className="transition-colors hover:text-foreground flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Calcolatore ISTAT
          </a>
          <a href="#funzionalita" className="transition-colors hover:text-foreground">
            Funzionalità
          </a>
          <a href="#prezzi" className="transition-colors hover:text-foreground">
            Prezzi
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/dashboard/auth/signin"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
          >
            Accedi
          </Link>
          <Link
            href="/dashboard/auth/signup"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow"
          >
            Inizia Gratis 14gg <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3">
          <a
            href="#come-funziona"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-muted-foreground hover:text-foreground py-1"
          >
            Come Funziona
          </a>
          <a
            href="#calcolatore"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-muted-foreground hover:text-foreground py-1"
          >
            Calcolatore ISTAT
          </a>
          <a
            href="#funzionalita"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-muted-foreground hover:text-foreground py-1"
          >
            Funzionalità
          </a>
          <a
            href="#prezzi"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-muted-foreground hover:text-foreground py-1"
          >
            Prezzi
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-muted-foreground hover:text-foreground py-1"
          >
            FAQ
          </a>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/dashboard/auth/signin"
              className="text-center text-sm font-medium text-muted-foreground hover:text-foreground py-2"
            >
              Accedi
            </Link>
            <Link
              href="/dashboard/auth/signup"
              className="text-center rounded-lg bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow"
            >
              Inizia Gratis — 14 Giorni
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
