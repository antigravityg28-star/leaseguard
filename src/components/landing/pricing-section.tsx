// =============================================================================
// LEASEGUARD B2B - Pricing & FAQ Section (High Conversion)
// =============================================================================
"use client";

import { useState } from "react";
import { Check, HelpCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      badge: "Per Singoli Negozi",
      priceMonthly: 0,
      priceAnnual: 0,
      period: "per i primi 14 giorni",
      subtext: "Poi €29/mese. Nessun vincolo.",
      description: "Ideale per testare la piattaforma con 1 o 2 locali commerciali.",
      features: [
        "Fino a 3 locativi registrabili",
        "Calcolo ISTAT FOI automatico al 75%",
        "Alert scadenze via email",
        "Archivio PDF contratti e allegati",
        "Dashboard riepilogativa base",
      ],
      cta: "Inizia la Prova Gratuita",
      popular: false,
    },
    {
      name: "Professional",
      badge: "Più Scelto dalle Catene",
      priceMonthly: 49,
      priceAnnual: 39,
      period: "/mese per account",
      subtext: "Locativi inclusi fino a 10 punti vendita.",
      description: "Perfetto per ristoratori, catene retail e store manager strutturati.",
      features: [
        "Fino a 10 locativi commerciali",
        "Alert prioritari Email + SMS + WhatsApp",
        "Generatore PEC di disdetta & contestazione",
        "Monitoraggio fideiussioni e depositi",
        "Multi-utente (fino a 5 collaboratori)",
        "Supporto prioritario WhatsApp dedicato",
      ],
      cta: "Attiva Piano Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      badge: "Franchising & Grandi Reti",
      priceMonthly: 99,
      priceAnnual: 79,
      period: "/mese",
      subtext: "Locativi illimitati. Assistenza dedicata.",
      description: "Per franchising, gruppi di ristorazione e reti con oltre 10 store.",
      features: [
        "Locativi commerciali illimitati",
        "Tutte le funzionalità Professional",
        "Utenti e store manager illimitati",
        "Consulente contrattuale dedicato",
        "Integrazione contabilità / ERP aziendale",
        "SLA garantito e contratti personalizzati",
      ],
      cta: "Contatta il Team Enterprise",
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "Come funziona il preavviso di disdetta nei contratti commerciali 6+6 in Italia?",
      a: "Per legge (L. 392/1978), la disdetta per evitare il rinnovo automatico di altri 6 anni va inviata a mezzo PEC o raccomandata A/R con almeno 12 o 6 mesi di anticipo (in base a quanto stabilito nel contratto). Se si invia con anche solo 1 giorno di ritardo, il contratto si rinnova automaticamente per ulteriori 6 anni.",
    },
    {
      q: "Perché il proprietario non può chiedermi il 100% dell'aumento ISTAT?",
      a: "L'art. 32 della Legge 392/78 stabilisce che le variazioni del canone non possono superare il 75% dell'indice dei prezzi al consumo (FOI) accertato dall'ISTAT per le famiglie di operai e impiegati, a meno che il contratto non abbia una durata iniziale superiore a quella minima di legge. LeaseGuard verifica automaticamente questo limite.",
    },
    {
      q: "I miei contratti e documenti sono al sicuro?",
      a: "Assolutamente sì. Utilizziamo crittografia bancaria AES-256 e database PostgreSQL ospitati su server all'interno dell'Unione Europea (Francoforte, Germania), pienamente conformi al Regolamento Europeo GDPR.",
    },
    {
      q: "Posso cancellare l'abbonamento in qualsiasi momento?",
      a: "Sì, non c'è alcun vincolo di permanenza. Puoi disdire il rinnovo con un semplice click dal tuo pannello di controllo in qualsiasi momento senza penali.",
    },
  ];

  return (
    <div className="space-y-24 py-16 bg-muted/20">
      {/* ========================================================================= */}
      {/* PRICING SECTION */}
      {/* ========================================================================= */}
      <section id="prezzi" className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Prezzi Trasparenti
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Investi una frazione del canone per risparmiare migliaia di euro
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            14 giorni di prova gratuita su tutti i piani. Nessuna carta di credito richiesta all&apos;inizio.
          </p>

          {/* Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs sm:text-sm font-medium ${!isAnnual ? "text-foreground font-bold" : "text-muted-foreground"}`}>
              Fatturazione Mensile
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative h-7 w-12 rounded-full bg-primary/20 p-1 transition-colors cursor-pointer"
            >
              <div
                className={`h-5 w-5 rounded-full bg-primary transition-transform ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs sm:text-sm font-medium flex items-center gap-1.5 ${isAnnual ? "text-foreground font-bold" : "text-muted-foreground"}`}>
              Fatturazione Annuale
              <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                2 Mesi Gratis
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-2xl border p-8 bg-card shadow-lg transition-all ${
                  plan.popular
                    ? "border-primary ring-2 ring-primary/20 lg:-translate-y-2"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-sm flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-foreground">
                        €{price}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">{plan.subtext}</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Cosa è incluso:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/dashboard/auth/signup"
                    className={`w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all ${
                      plan.popular
                        ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:scale-[1.02]"
                        : "border border-input bg-card hover:bg-accent text-foreground shadow-xs"
                    }`}
                  >
                    {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FAQ SECTION */}
      {/* ========================================================================= */}
      <section id="faq" className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <HelpCircle className="h-4 w-4" /> Domande Frequenti
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Tutto ciò che devi sapere sulla tutela delle locazioni
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-2">
              <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-blue-700 to-indigo-700 p-8 sm:p-14 text-center text-primary-foreground shadow-2xl space-y-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Non rischiare di rimanere vincolato per altri 6 anni
          </h3>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-primary-foreground/80 font-normal">
            Metti in sicurezza i contratti di tutti i tuoi punti vendita oggi stesso. Prova LeaseGuard gratis per 14 giorni con supporto dedicato in italiano.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/auth/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-background text-foreground px-8 text-sm font-bold shadow-lg transition-transform hover:scale-105"
            >
              Crea il tuo Account Gratuito Subito <ArrowRight className="h-4 w-4 text-primary" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
