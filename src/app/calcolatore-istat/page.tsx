// =============================================================================
// LEASEGUARD B2B - Calcolatore ISTAT Pubblico & Lead Magnet Virale
// SEO Optimized + Schema.org JSON-LD + Lead Capture Report Generator
// =============================================================================
"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatCurrency, ISTAT_FOI_INDICES } from "@/lib/utils";
import {
  Scale,
  CheckCircle2,
  ShieldAlert,
  Download,
  ArrowRight,
  ShieldCheck,
  Building2,
  HelpCircle,
  FileSpreadsheet,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function PublicIstatCalculatorPage() {
  const [baseRent, setBaseRent] = useState<number>(2500);
  const [startYear, setStartYear] = useState<number>(2021);
  const [targetYear, setTargetYear] = useState<number>(2026);
  const [yearsOvercharged, setYearsOvercharged] = useState<number>(3);

  // Lead Generation Capture State
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [isGeneratingLead, setIsGeneratingLead] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const baseIndex = ISTAT_FOI_INDICES[startYear] || 105.4;
  const targetIndex = ISTAT_FOI_INDICES[targetYear] || 123.5;
  const fullVariationPercent = ((targetIndex - baseIndex) / baseIndex) * 100;

  // Legale al 75%
  const legalVariationPercent = fullVariationPercent * 0.75;
  const legalMonthlyRent = baseRent * (1 + legalVariationPercent / 100);
  const legalMonthlyIncrease = legalMonthlyRent - baseRent;

  // Abusivo al 100%
  const abusiveMonthlyRent = baseRent * (1 + fullVariationPercent / 100);
  const monthlyDifference = abusiveMonthlyRent - legalMonthlyRent;
  const annualDifference = monthlyDifference * 12;
  const totalRefundClaimable = annualDifference * yearsOvercharged;

  const handleDownloadReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !companyName) {
      toast.error("Inserisci Ragione Sociale ed Email per ricevere il report di perizia.");
      return;
    }

    setIsGeneratingLead(true);
    setTimeout(() => {
      setIsGeneratingLead(false);
      setLeadCaptured(true);
      toast.success("Perizia ISTAT generata con successo! Verifica la tua email o accedi subito.");
    }, 1200);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Calcolatore ISTAT Affitti Commerciali 75% FOI - LeaseGuard",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description:
      "Calcola online l'adeguamento del canone di locazione commerciale al 75% ISTAT FOI (L. 392/78 art. 32). Smaschera aumenti illegittimi al 100% e calcola gli arretrati recuperabili.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qual è la percentuale massima per l'adeguamento ISTAT nei contratti commerciali 6+6?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'art. 32 della Legge 392/78 stabilisce che per i contratti di locazione commerciale della durata di 6 anni (es. negozi, ristoranti, uffici), la rivalutazione ISTAT non può superare il 75% dell'indice FOI.",
        },
      },
      {
        "@type": "Question",
        name: "Cosa succede se il locatore ha applicato il 100% dell'aumento ISTAT?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La clausola contrattuale che prevede il 100% di aumento è nulla per contrarietà a norma imperativa. Il conduttore ha diritto a richiedere la restituzione delle somme pagate in eccesso negli ultimi 10 anni (art. 2033 c.c. - ripetizione dell'indebito).",
        },
      },
      {
        "@type": "Question",
        name: "Come richiedere il rimborso degli arretrati ISTAT non dovuti?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "È necessario inviare una formale lettera di contestazione via PEC o raccomandata A/R con il conteggio analitico delle somme indebitamente versate, richiedendo la rettifica del canone futuro e la compensazione degli arretrati.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Scale className="h-4 w-4" /> Tool Gratuito a Norma di Legge (Art. 32 L. 392/78)
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Calcolatore Adeguamento ISTAT <span className="text-primary">75% FOI</span> Affitti Commerciali
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Scopri all&apos;istante se il proprietario ti ha applicato un aumento illegittimo del canone
            e calcola le somme indebitamente versate che puoi <strong>recuperare per legge fino a 10 anni indietro</strong>.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Controls Input Card */}
          <Card className="lg:col-span-6 shadow-md border-border">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                1. Dati del Contratto di Locazione
              </CardTitle>
              <CardDescription>
                Inserisci l&apos;importo iniziale pattuito e gli anni di riferimento.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label htmlFor="baseRent" className="text-sm font-semibold">
                  Canone Mensile di Base Iniziale (€)
                </Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">€</span>
                  <Input
                    id="baseRent"
                    type="number"
                    value={baseRent}
                    onChange={(e) => setBaseRent(Number(e.target.value))}
                    min="100"
                    step="50"
                    className="pl-8 text-base font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Anno di Stipula (Indice Base)</Label>
                  <Select
                    value={startYear.toString()}
                    onValueChange={(v) => v && setStartYear(Number(v))}
                  >
                    <SelectTrigger className="font-medium">
                      <SelectValue placeholder="Seleziona anno" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(ISTAT_FOI_INDICES).map((y) => (
                        <SelectItem key={y} value={y}>
                          {y} (Indice FOI: {ISTAT_FOI_INDICES[Number(y)]})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Anno di Rivalutazione</Label>
                  <Select
                    value={targetYear.toString()}
                    onValueChange={(v) => v && setTargetYear(Number(v))}
                  >
                    <SelectTrigger className="font-medium">
                      <SelectValue placeholder="Seleziona anno" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(ISTAT_FOI_INDICES).map((y) => (
                        <SelectItem key={y} value={y}>
                          {y} (Indice FOI: {ISTAT_FOI_INDICES[Number(y)]})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold">
                  Da quanti anni paghi l&apos;aumento richiesto dal proprietario?
                </Label>
                <Select
                  value={yearsOvercharged.toString()}
                  onValueChange={(v) => v && setYearsOvercharged(Number(v))}
                >
                  <SelectTrigger className="font-medium">
                    <SelectValue placeholder="Anni di pagamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Anno</SelectItem>
                    <SelectItem value="2">2 Anni</SelectItem>
                    <SelectItem value="3">3 Anni</SelectItem>
                    <SelectItem value="4">4 Anni</SelectItem>
                    <SelectItem value="5">5 Anni</SelectItem>
                    <SelectItem value="8">8 Anni</SelectItem>
                    <SelectItem value="10">10 Anni (Termine Massimo di Prescrizione)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
                <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Indice FOI {startYear}: <strong>{baseIndex}</strong> ➔ Indice FOI {targetYear}: <strong>{targetIndex}</strong>.
                  Variazione lorda ISTAT totale: <strong>+{fullVariationPercent.toFixed(2)}%</strong>.
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Results Comparison Card */}
          <Card className="lg:col-span-6 shadow-md border-border flex flex-col justify-between">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  2. Verdetto di Conformità Legale
                </CardTitle>
                <span className="rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 text-xs font-bold">
                  Limite 75%
                </span>
              </div>
              <CardDescription>
                Confronto analitico tra canone dovuto per legge e pretese non conformi.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-6">
              {/* Box A: Canone Legale */}
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> CANONE LEGITTIMO A NORMA DI LEGGE (75%)
                  </span>
                  <strong className="text-sm text-emerald-700 dark:text-emerald-300 font-bold">
                    +{legalVariationPercent.toFixed(2)}%
                  </strong>
                </div>
                <div className="text-2xl font-black text-foreground">
                  {formatCurrency(legalMonthlyRent)} <span className="text-xs font-normal text-muted-foreground">/mese</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Aumento massimo consentito: +{formatCurrency(legalMonthlyIncrease)}/mese
                </p>
              </div>

              {/* Box B: Canone Abusivo al 100% */}
              <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-destructive flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4" /> SE IL PROPRIETARIO APPLICA IL 100% (ILLEGITTIMO)
                  </span>
                  <strong className="text-sm text-destructive font-bold">
                    +{fullVariationPercent.toFixed(2)}%
                  </strong>
                </div>
                <div className="text-2xl font-black text-destructive">
                  {formatCurrency(abusiveMonthlyRent)} <span className="text-xs font-normal text-muted-foreground">/mese</span>
                </div>
                <p className="text-[11px] text-destructive/80 font-medium">
                  Sovrapprezzo indebito: +{formatCurrency(monthlyDifference)}/mese ({formatCurrency(annualDifference)} all&apos;anno)
                </p>
              </div>

              {/* Box C: Arretrati Recuperabili */}
              <div className="rounded-xl border border-primary/40 bg-primary/10 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    Somma Totale Recuperabile Subito:
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Ripetizione indebito ex art. 2033 c.c. ({yearsOvercharged} anni)
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-primary">
                  {formatCurrency(totalRefundClaimable)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lead Capture Magnet Box */}
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-background p-6 sm:p-10 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
              <Download className="h-3.5 w-3.5" /> Report di Perizia ISTAT Ufficiale + Fac-Simile Lettera PEC
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Richiedi il Rimborso al Proprietario con la Perizia Ufficiale LeaseGuard
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Inserisci la tua Ragione Sociale ed Email per scaricare il documento certificato con il conteggio
              analitico e il testo formale pronto da inviare via PEC al locatore.
            </p>
          </div>

          {!leadCaptured ? (
            <form onSubmit={handleDownloadReport} className="grid gap-4 sm:grid-cols-3 max-w-4xl">
              <div className="space-y-1.5">
                <Label htmlFor="companyName" className="text-xs font-semibold">
                  Ragione Sociale / Nome Azienda
                </Label>
                <Input
                  id="companyName"
                  placeholder="Es. Mario Rossi S.r.l. / Pizzeria Duomo"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="h-10 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email Aziendale o PEC
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="amministrazione@azienda.it"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10 text-xs"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <Button
                  type="submit"
                  disabled={isGeneratingLead}
                  className="h-10 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full shadow"
                >
                  {isGeneratingLead ? (
                    "Generazione in corso..."
                  ) : (
                    <>
                      Scarica Perizia & Inizia Gratis <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                Perizia generata per {companyName}!
              </div>
              <p className="text-xs text-muted-foreground">
                Abbiamo impostato il conteggio con {formatCurrency(totalRefundClaimable)} di arretrati recuperabili.
                Crea la tua password in 30 secondi per salvare tutti i tuoi contratti ed essere avvisato prima delle scadenze.
              </p>
              <Link
                href={`/dashboard/auth/signup?email=${encodeURIComponent(email)}&company=${encodeURIComponent(companyName)}`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
              >
                Accedi alla Dashboard e Scarica il PDF <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Legal Authority & FAQ Section */}
        <div className="space-y-6 pt-8 border-t border-border">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Normativa e Giurisprudenza sulle Locazioni Commerciali in Italia
            </h3>
            <p className="text-xs sm:text-muted-foreground max-w-2xl mx-auto">
              Cosa dice la legge e perché i locatori non possono derogare al limite del 75%.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 space-y-2">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Art. 32 Legge 27 luglio 1978, n. 392
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Le variazioni del canone non possono superare il <strong>75%</strong> dell&apos;indice dei prezzi al consumo per le famiglie di operai e impiegati (FOI), accertato dall&apos;ISTAT. Qualsiasi patto contrario in contratti di durata standard (6+6) è <strong>nullo di diritto</strong> ai sensi dell&apos;art. 79 della stessa legge.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 space-y-2">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-primary" />
                Diritto al Rimborso Decennale (Art. 2033 c.c.)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                La giurisprudenza della Corte di Cassazione ha confermato che il conduttore ha diritto a ripetere tutte le somme indebitamente versate a titolo di canone maggiorato fino a 10 anni dalla data del pagamento, potendo compensarle con i canoni futuri.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
