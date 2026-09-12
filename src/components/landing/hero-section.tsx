// =============================================================================
// LEASEGUARD B2B - Hero Section (Ultra Modern with "L'altra parte del tavolo" Claim)
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
  AlertOctagon,
  Scale,
  Zap,
  Users2
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function HeroSection() {
  const [monthlyRent, setMonthlyRent] = useState<number>(2500);
  const [storeCount, setStoreCount] = useState<number>(3);
  const [yearsOvercharged, setYearsOvercharged] = useState<number>(3);

  // Calcolo risparmi ISTAT stimati (differenza tra 100% abusivo e 75% legale)
  const monthlyOvercharge = Math.round(monthlyRent * 0.035); // ~3.5% risparmio mensile sul canone rivalutato
  const annualSavings = monthlyOvercharge * storeCount * 12;
  const refundArrearYears = annualSavings * yearsOvercharged;
  const totalOccupancyProtected = monthlyRent * storeCount * 12 * 6; // 6 anni di contratto

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[450px] w-[700px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 -z-10 h-[350px] w-[450px] rounded-full bg-blue-500/10 blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Main Hero Header */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          {/* Tagline Badge: UNICI IN ITALIA */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>UNICI IN ITALIA · SEDIAMO DALLA TUA PARTE DEL TAVOLO</span>
          </div>

          {/* Main Title with Powerful Hook */}
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl text-foreground leading-[1.12]">
            Tutti i software aiutano il proprietario.{" "}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent block mt-1">
              Noi difendiamo chi paga l&apos;affitto.
            </span>
          </h1>

          {/* Subtitle with Value Proposition */}
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl font-normal leading-relaxed">
            Mentre i gestionali tradizionali aiutano i locatori a richiedere aumenti, <strong>LeaseGuard B2B è la prima e unica piattaforma in Italia</strong> creata per proteggere negozianti, ristoratori e franchising: blocca gli aumenti ISTAT illegittimi, recupera i canoni pagati in eccesso ed evita rinnovi forzati di 6 anni.
          </p>

          {/* Real Savings Metric Pill */}
          <div className="inline-flex items-center gap-2 rounded-xl bg-muted/60 border border-border/80 px-4 py-2 text-xs sm:text-sm font-semibold text-foreground">
            <TrendingDown className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Risparmio reale documentato: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">da €850 a oltre €3.200/anno</strong> per punto vendita</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/dashboard/auth/signup"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              Inizia Gratis — 14 Giorni di Prova
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#calcolatore"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-input bg-card/60 backdrop-blur-sm px-6 text-sm font-medium shadow-xs transition-colors hover:bg-accent"
            >
              <Scale className="h-4 w-4 text-primary" />
              Calcola il tuo Risparmio Effettivo
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
              <span>Conforme Legge 392/78 (Tetto ISTAT 75%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Piattaforma 100% indipendente dai locatori</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE LEASEGUARD SIMULATOR CARD */}
        {/* ========================================================================= */}
        <div id="calcolatore" className="mt-14 mx-auto max-w-5xl rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-2xl p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Column: Interactive Sliders */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  <Zap className="h-3.5 w-3.5" /> Simulatore Risparmio & Tutela B2B
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  Quanto denaro effettivo puoi risparmiare e recuperare?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Inserisci i dati dei tuoi locali commerciali per calcolare gli aumenti non dovuti e gli arretrati recuperabili ex art. 2033 c.c.
                </p>
              </div>

              {/* Slider: Numero di Negozi/Locali */}
              <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border/40">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" />
                    Numero di locali / punti vendita:
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
                  <span>€800/mese</span>
                  <span>€2.500 (media retail)</span>
                  <span>€10.000 (top location)</span>
                </div>
              </div>

              {/* Slider: Anni di aumenti pagati al 100% */}
              <div className="space-y-2 rounded-xl bg-muted/40 p-4 border border-border/40">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Anni di aumenti ISTAT già corrisposti al locatore:
                  </span>
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                    {yearsOvercharged} Anni
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={yearsOvercharged}
                  onChange={(e) => setYearsOvercharged(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-2 bg-muted rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>1 anno</span>
                  <span>3 anni (tipico)</span>
                  <span>8 anni (prescrizione decennale)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Results Box */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/30 p-6 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  💰 Risparmio Effettivo Diretto (ISTAT 75%)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-foreground">
                  +{formatCurrency(annualSavings)} <span className="text-xs font-normal text-muted-foreground">/anno</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Somma netta risparmiata ogni anno bloccando l&apos;aumento abusivo al 100%.
                </p>
              </div>

              <div className="rounded-xl bg-card/80 p-3.5 border border-primary/20 space-y-1">
                <span className="text-[11px] font-bold text-foreground block">
                  🎯 Somma Totale Recuperabile a Rimborso:
                </span>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(refundArrearYears)}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Arretrati indebitamente versati negli ultimi {yearsOvercharged} anni da richiedere ex art. 2033 c.c.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    Capitale 6 Anni Protetto:
                  </span>
                  <strong className="text-foreground">{formatCurrency(totalOccupancyProtected)}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Radar Disdette PEC:
                  </span>
                  <strong className="text-foreground">180 e 360 giorni prima</strong>
                </div>
              </div>

              <Link
                href="/dashboard/auth/signup"
                className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
              >
                Inizia a Risparmiare sui tuoi {storeCount} Locali <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3 w-full">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users2 className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Dalla Tua Parte del Tavolo</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Tutti gli altri gestionali immobiliari sono nati per aiutare i proprietari a incassare. LeaseGuard è l&apos;unico software schierato al 100% al fianco del conduttore.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Scudo Legale ISTAT al 75%</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              La legge 392/78 vieta aumenti al 100%. Ricalcoliamo il canone esatto in tempo reale e ti forniamo la PEC di contestazione con le sentenze di Cassazione.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <AlertOctagon className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Zero Rinnovi Forzati 6+6</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Basta un giorno di ritardo nell&apos;invio della PEC di disdetta per essere vincolati ad altri 6 anni di affitto. LeaseGuard ti avvisa con 12 e 6 mesi di anticipo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
