// =============================================================================
// LEASEGUARD B2B - Hero Section (Ultra Modern with Interactive Preview)
// =============================================================================
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Clock,
  FileCheck,
  Building,
  Store,
  AlertOctagon
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function HeroSection() {
  const [monthlyRent, setMonthlyRent] = useState<number>(2400);
  const [storeCount, setStoreCount] = useState<number>(3);

  // Calcolo risparmi ISTAT stimati (differenza tra 100% abusivo e 75% legale)
  const estimatedAnnualOverchargeBlocked = Math.round(monthlyRent * storeCount * 12 * 0.0085);
  const totalOccupancyProtected = monthlyRent * storeCount * 12 * 6; // 6 anni di contratto

  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 -z-10 h-[300px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Main Hero Header */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>La 1ª Piattaforma B2B in Italia a Tutela dei Conduttori di Negozi & Locali</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground leading-[1.15]">
            Proteggi i tuoi affitti commerciali da{" "}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              aumenti e scadenze fatali
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl font-normal leading-relaxed">
            Se gestisci 1 o più locali commerciali (ristoranti, negozi, franchising), un ritardo di 1 giorno nella PEC di disdetta ti vincola a <strong>6 anni di canoni</strong>. LeaseGuard automatizza lo scadenziario e blocca gli aumenti ISTAT illegittimi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/dashboard/auth/signup"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Inizia la Prova Gratuita (14 Giorni)
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#calcolatore"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-input bg-card/50 backdrop-blur-sm px-6 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
            >
              <TrendingDown className="h-4 w-4 text-primary" />
              Simula il tuo Risparmio
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Nessuna carta di credito richiesta</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Conforme normativa contratti 6+6 / 9+9</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Configurazione guidata in 3 minuti</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE LEASEGUARD SIMULATOR CARD */}
        {/* ========================================================================= */}
        <div id="calcolatore" className="mt-16 mx-auto max-w-5xl rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Column: Interactive Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  <Clock className="h-3.5 w-3.5" /> Simulatore Valore & Rischio Locazioni
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Quanto vale la protezione dei tuoi locali?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Regola i parametri sotto per simulare il capitale protetto e i risparmi stimati per la tua attività.
                </p>
              </div>

              {/* Slider: Numero di Negozi/Locali */}
              <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border/40">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" />
                    Locali commerciali in affitto:
                  </span>
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                    {storeCount} {storeCount === 1 ? "Locale" : "Locali"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={storeCount}
                  onChange={(e) => setStoreCount(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>1 negozio</span>
                  <span>5 catena</span>
                  <span>15+ franchising</span>
                </div>
              </div>

              {/* Slider: Canone Mensile Medio */}
              <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border/40">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    Canone medio mensile per locale:
                  </span>
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                    {formatCurrency(monthlyRent)}
                  </span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="10000"
                  step="200"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>€800 (piccolo)</span>
                  <span>€3.000 (centro)</span>
                  <span>€10.000 (top location)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Results Box */}
            <div className="lg:col-span-5 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Capitale Complessivo Tutelato (6 Anni)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-foreground">
                  {formatCurrency(totalOccupancyProtected)}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Valore contrattuale protetto da rinnovo forzato automatico.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    Risparmio ISTAT 75% vs 100%:
                  </span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                    +{formatCurrency(estimatedAnnualOverchargeBlocked)}/anno
                  </strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Alert Scadenze PEC:
                  </span>
                  <strong className="text-foreground">180 e 360 giorni prima</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <FileCheck className="h-3.5 w-3.5 text-primary" />
                    Burocrazia eliminata:
                  </span>
                  <strong className="text-foreground">~36 ore/anno</strong>
                </div>
              </div>

              <Link
                href="/dashboard/auth/signup"
                className="w-full inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Proteggi i tuoi {storeCount} Locali Ora <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars (Properly Sized Grid) */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3 w-full">
          <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Zero Rinnovi Forzati</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              In Italia la disdetta perentoria va inviata tramite PEC esattamente 12 o 6 mesi prima della scadenza. Ti avvisiamo in tempo con bozza legale precompilata.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Scudo Adeguamento ISTAT</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Molti proprietari applicano il 100% dell&apos;indice FOI. La legge stabilisce il tetto del 75%: ricalcoliamo il canone esatto ed emettiamo contestazione formale.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FileCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Archivio Contratti & Fideiussioni</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tutti i contratti 6+6, allegati, planimetrie e scadenze delle fideiussioni bancarie o depositi cauzionali centralizzati in un unico cruscotto protetto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
