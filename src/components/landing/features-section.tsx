// =============================================================================
// LEASEGUARD B2B - Features & How it Works Section
// =============================================================================
import {
  FileText,
  CalendarClock,
  Shield,
  AlertTriangle,
  DollarSign,
  BarChart3,
  MailCheck,
  Building2,
  CheckCircle,
  XCircle,
  FileCheck2,
  BellRing
} from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="space-y-24 py-16">
      {/* ========================================================================= */}
      {/* 1. HOW IT WORKS (3 STEPS) */}
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
          {/* Step 1 */}
          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Inserisci o Carica il Contratto</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Inserisci i dati essenziali del locale (data inizio, canone mensile, mesi di preavviso) o carica il file PDF del contratto di locazione commerciale.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Attivazione Radar Scadenze</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Il sistema calcola la finestra perentoria di disdetta (es. 180 o 360 giorni prima) e programma alert email, WhatsApp e notifiche push per non mancare il termine.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-card shadow-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Scudo ISTAT & PEC 1-Click</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Quando il locatore richiede l&apos;adeguamento annuale, LeaseGuard verifica la percentuale legale (75%) e prepara la PEC formale di contestazione o riscontro.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE COST OF INACTION (COMPARISON TABLE) */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Il costo del fare a mano vs LeaseGuard B2B
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Perché oltre 100 conduttori hanno abbandonato fogli Excel e cartelle polverose.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 font-semibold text-foreground">Aspetto Operativo</th>
                  <th className="py-3 px-4 font-semibold text-muted-foreground">Gestione Tradizionale (Excel / Carta)</th>
                  <th className="py-3 px-4 font-semibold text-primary">Con LeaseGuard B2B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-4 font-medium">Scadenza Disdetta 6+6</td>
                  <td className="py-3.5 px-4 text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 shrink-0" /> Spesso dimenticata, rinnovo forzato 6 anni
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 shrink-0" /> Alert automatici a 180, 90, 30 giorni
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Calcolo Adeguamento ISTAT</td>
                  <td className="py-3.5 px-4 text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 shrink-0" /> Accettazione passiva del 100% richiesto
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 shrink-0" /> Ricalcolo esatto FOI al 75% di legge
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Redazione PEC di Recesso</td>
                  <td className="py-3.5 px-4 text-muted-foreground flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 shrink-0" /> Consulenza legale a pagamento (€300–€500)
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 shrink-0" /> Modello PEC precompilato pronto all&apos;invio
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Fideiussioni & Depositi</td>
                  <td className="py-3.5 px-4 text-muted-foreground flex items-center gap-1.5">
                    <XCircle className="h-4 w-4 shrink-0" /> Fideiussioni scadute non svincolate
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 shrink-0" /> Monitoraggio garanzie e scadenze bancarie
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE FEATURES GRID */}
      {/* ========================================================================= */}
      <section id="funzionalita" className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Suite Completa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Tutto ciò che serve per difendere i tuoi punti vendita
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Funzionalità verticali progettate specificamente per esercenti, ristoratori, catene e franchisor in Italia.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <CalendarClock className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Timeline Scadenze Intelligente</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Mappa le date vincolanti di ogni contratto. Ricevi alert progressivi prima che la finestra perentoria di disdetta si chiuda per sempre.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Algoritmo Ufficiale ISTAT FOI</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Aggiornato con le serie storiche ISTAT. Calcola la rivalutazione al 75% o al 100% ed evidenzia le differenze illegittime richieste dal locatore.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <MailCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Generatore PEC Formale</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Crea in 1 click le lettere formali di disdetta locazione, contestazione aumento canone o richiesta manutenzioni straordinarie a carico del locatore.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Multi-Location & Franchising</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Gestisci da un unico pannello centrale 1, 5 o 50 punti vendita con accesso differenziato per store manager, contabili e direzione generale.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <BellRing className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Alert Multi-Canale Multi-Livello</h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Notifiche via email, SMS e WhatsApp per i tuoi responsabili amministrativi prima di ogni scadenza critica o adeguamento contrattuale.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
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
