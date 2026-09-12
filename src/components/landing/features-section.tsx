// =============================================================================
// LEASEGUARD B2B - Features & "L'altra parte del tavolo" Section
// =============================================================================
import {
  FileText,
  CalendarClock,
  Shield,
  DollarSign,
  BarChart3,
  MailCheck,
  Building2,
  CheckCircle2,
  XCircle,
  BellRing,
  Scale,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export function FeaturesSection() {
  return (
    <div className="space-y-28 py-12">
      {/* ========================================================================= */}
      {/* 1. SEZIONE DEDICATA: "L'ALTRA PARTE DEL TAVOLO" (IL MANIFESTO) */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 via-card to-card p-8 sm:p-14 shadow-xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Scale className="h-3.5 w-3.5" /> IL NOSTRO MANIFESTO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Perché sediamo dall&apos;altra parte del tavolo?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              In Italia esistono decine di gestionali immobiliari. Ma sono stati tutti costruiti per una sola parte del tavolo: <strong>quella del proprietario</strong>. LeaseGuard è nata per riequilibrare i rapporti di forza.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto items-stretch">
            {/* Box 1: Software Tradizionali per Proprietari */}
            <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-1 text-xs font-bold text-red-600 dark:text-red-400">
                  <XCircle className="h-4 w-4" /> Gestionali Tradizionali per Proprietari
                </div>
                <h3 className="text-xl font-bold text-foreground">A vantaggio del Locatore</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Calcolano aumenti ISTAT al 100% per massimizzare la rendita del proprietario.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Sfruttano le scadenze dimenticate per forzare rinnovi di ulteriori 6 anni.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Ribaltano spese condominiali e di manutenzione straordinaria sul conduttore.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Software complicati e costosi creati per uffici legali e patrimoni immobiliari.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-border text-xs text-muted-foreground font-medium">
                ❌ Risultato: Il conduttore paga di più e rischia contenziosi.
              </div>
            </div>

            {/* Box 2: LeaseGuard B2B (Dalla tua parte) */}
            <div className="rounded-2xl border-2 border-primary bg-gradient-to-b from-primary/10 to-card p-6 sm:p-8 space-y-5 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-xs">
                  <CheckCircle2 className="h-4 w-4" /> LeaseGuard B2B — Solo per Conduttori
                </div>
                <h3 className="text-xl font-bold text-foreground">Al 100% a tutela del tuo Business</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Blocca gli aumenti al 100%</strong> e impone il limite legale del 75% (art. 32 L. 392/78).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Recupera gli arretrati non dovuti</strong> fino a 10 anni con conteggio dettagliato.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Radar Disdette 6+6 / 9+9:</strong> Alert perentori a 12 e 6 mesi prima per non perdere il potere di recesso.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Generatore PEC in 1 Click:</strong> Lettere legali formali pronte con citazione delle sentenze di Cassazione.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-primary/30 text-xs font-bold text-primary flex items-center justify-between">
                <span>🛡️ Risultato: Risparmio medio di €850 – €3.200/anno per punto vendita.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW IT WORKS (3 STEPS) */}
      {/* ========================================================================= */}
      <section id="come-funziona" className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Semplicità Assoluta
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Come funziona LeaseGuard in 3 semplici passi
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Non devi essere un avvocato né un commercialista. Bastano 3 minuti per mettere al sicuro l&apos;intero portafoglio contratti.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Registra i tuoi Locali</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Inserisci i dati essenziali del locale (data inizio, canone mensile base, mesi di preavviso concordati) in pochi secondi.
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Radar Scadenze Automatico</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Il sistema calcola la finestra perentoria di disdetta (es. 180 o 360 giorni prima) e programma alert per non mancare mai il termine vincolante.
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Scudo ISTAT & PEC 1-Click</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Quando il locatore richiede l&apos;adeguamento, LeaseGuard verifica la percentuale legale (75%) e prepara la PEC formale di contestazione o riscontro.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE FEATURES GRID */}
      {/* ========================================================================= */}
      <section id="funzionalita" className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Funzionalità Dedicate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Tutto ciò che serve per difendere i tuoi punti vendita
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Strumenti verticali progettati specificamente per esercenti, ristoratori, catene e franchisor in Italia.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <CalendarClock className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Timeline Scadenze Intelligente</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Mappa le date vincolanti di ogni contratto. Ricevi alert progressivi prima che la finestra perentoria di disdetta si chiuda per sempre.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Algoritmo Ufficiale ISTAT FOI</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Aggiornato con le serie storiche ISTAT. Calcola la rivalutazione al 75% o al 100% ed evidenzia le differenze illegittime richieste dal locatore.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <MailCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Generatore PEC Formale</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Crea in 1 click le lettere formali di disdetta locazione, contestazione aumento canone o richiesta manutenzioni straordinarie a carico del locatore.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Multi-Location & Franchising</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Gestisci da un unico pannello centrale 1, 5 o 50 punti vendita con accesso differenziato per store manager, contabili e direzione generale.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BellRing className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Alert Multi-Canale Multi-Livello</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Notifiche via email, SMS e WhatsApp per i tuoi responsabili amministrativi prima di ogni scadenza critica o adeguamento contrattuale.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Report Occupancy Cost</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Visualizza l&apos;impatto totale dei canoni di locazione e delle spese accessorie sul fatturato dei tuoi negozi con grafici chiari ed esportabili.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
