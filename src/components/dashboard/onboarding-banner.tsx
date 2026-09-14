// =============================================================================
// LEASEGUARD B2B - Quick Onboarding & Savings Banner
// Guides users to add their first lease in 60s & highlights upgrade ROI
// =============================================================================
"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, PlusCircle, ArrowRight, ShieldCheck, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/15 via-primary/5 to-card p-6 shadow-sm">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
        aria-label="Chiudi"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pr-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Setup Rapido in 60 Secondi
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Metti al sicuro il tuo primo locale commerciale
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Aggiungi il tuo contratto di locazione: LeaseGuard calcolerà subito l&apos;esatto adeguamento ISTAT al 75%,
            imposterà gli alert per bloccare il rinnovo automatico di 6 anni e genererà la PEC per il proprietario.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
          <Link
            href="/dashboard/leases/new"
            className="w-full sm:w-auto inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground shadow hover:bg-primary/90 transition-transform hover:scale-105"
          >
            <PlusCircle className="h-4 w-4" /> Aggiungi Contratto Ora
          </Link>
          <Link
            href="/dashboard/calculator"
            className="w-full sm:w-auto inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 text-xs font-semibold text-foreground hover:bg-accent"
          >
            <TrendingUp className="h-4 w-4 text-primary" /> Verifica ISTAT
          </Link>
        </div>
      </div>
    </div>
  );
}
