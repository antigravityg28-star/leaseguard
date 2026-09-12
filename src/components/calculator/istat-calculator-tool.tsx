// =============================================================================
// LEASEGUARD B2B - Calcolatore ISTAT Avanzato & Recupero Arretrati
// =============================================================================
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency, ISTAT_FOI_INDICES } from "@/lib/utils";
import { ShieldAlert, CheckCircle2, ArrowRight, Sparkles, Scale } from "lucide-react";
import Link from "next/link";

export function IstatCalculatorTool() {
  const [baseRent, setBaseRent] = useState<number>(2000);
  const [startYear, setStartYear] = useState<number>(2021);
  const [targetYear, setTargetYear] = useState<number>(2026);
  const [yearsOvercharged, setYearsOvercharged] = useState<number>(3);

  const baseIndex = ISTAT_FOI_INDICES[startYear] || 105.4;
  const targetIndex = ISTAT_FOI_INDICES[targetYear] || 123.5;
  const fullVariationPercent = ((targetIndex - baseIndex) / baseIndex) * 100;

  // Canone al 75% di legge
  const legalVariationPercent = fullVariationPercent * 0.75;
  const legalMonthlyRent = baseRent * (1 + legalVariationPercent / 100);
  const legalMonthlyIncrease = legalMonthlyRent - baseRent;

  // Canone abusivo al 100%
  const abusiveMonthlyRent = baseRent * (1 + fullVariationPercent / 100);
  const abusiveMonthlyIncrease = abusiveMonthlyRent - baseRent;

  // Differenza mensile e annuale
  const monthlyDifference = abusiveMonthlyRent - legalMonthlyRent;
  const annualDifference = monthlyDifference * 12;

  // Calcolo arretrati indebitamente versati (prescrizione decennale)
  const totalRefundClaimable = annualDifference * yearsOvercharged;

  return (
    <div className="space-y-8">
      {/* Simulation Form Cards */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Form: Inputs */}
        <Card className="lg:col-span-6 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary" />
              Parametri del Contratto
            </CardTitle>
            <CardDescription>
              Inserisci i dati del canone e degli anni per verificare la legittimità dell&apos;adeguamento.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="rent">Canone Mensile Iniziale (€)</Label>
              <Input
                id="rent"
                type="number"
                value={baseRent}
                onChange={(e) => setBaseRent(Number(e.target.value))}
                min="100"
                step="50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Anno di Stipula (Base)</Label>
                <Select
                  value={startYear.toString()}
                  onValueChange={(v) => v && setStartYear(Number(v))}
                >
                  <SelectTrigger><SelectValue placeholder="Seleziona anno" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(ISTAT_FOI_INDICES).map((y) => (
                      <SelectItem key={y} value={y}>{y} (Indice: {ISTAT_FOI_INDICES[Number(y)]})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Anno di Calcolo</Label>
                <Select
                  value={targetYear.toString()}
                  onValueChange={(v) => v && setTargetYear(Number(v))}
                >
                  <SelectTrigger><SelectValue placeholder="Seleziona anno" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(ISTAT_FOI_INDICES).map((y) => (
                      <SelectItem key={y} value={y}>{y} (Indice: {ISTAT_FOI_INDICES[Number(y)]})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Anni in cui hai pagato l&apos;aumento al 100% (per calcolo rimborso arretrati):</Label>
              <Select
                value={yearsOvercharged.toString()}
                onValueChange={(v) => v && setYearsOvercharged(Number(v))}
              >
                <SelectTrigger><SelectValue placeholder="Anni di pagamento" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Anno</SelectItem>
                  <SelectItem value="2">2 Anni</SelectItem>
                  <SelectItem value="3">3 Anni</SelectItem>
                  <SelectItem value="4">4 Anni</SelectItem>
                  <SelectItem value="5">5 Anni</SelectItem>
                  <SelectItem value="8">8 Anni (Prescrizione Decennale)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Right Card: Real-Time Comparison */}
        <Card className="lg:col-span-6 bg-muted/20 border-primary/20 shadow-sm flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Confronto Legittimità ISTAT</CardTitle>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                Art. 32 L. 392/78
              </span>
            </div>
            <CardDescription>
              Variazione totale indice FOI ISTAT: <strong>+{fullVariationPercent.toFixed(2)}%</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Box 1: Legale */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  CANONE LEGITTIMO A NORMA DI LEGGE (75%)
                </span>
                <strong className="text-base text-emerald-700 dark:text-emerald-300 font-bold">
                  +{legalVariationPercent.toFixed(2)}%
                </strong>
              </div>
              <div className="text-2xl font-extrabold text-foreground">
                {formatCurrency(legalMonthlyRent)} <span className="text-xs font-normal text-muted-foreground">/mese</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Aumento legittimo massimo: +{formatCurrency(legalMonthlyIncrease)}/mese
              </p>
            </div>

            {/* Box 2: Abusivo */}
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-destructive flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  CANONE ILLEGITTIMO APPLICATO AL 100%
                </span>
                <strong className="text-base text-destructive font-bold">
                  +{fullVariationPercent.toFixed(2)}%
                </strong>
              </div>
              <div className="text-2xl font-extrabold text-destructive">
                {formatCurrency(abusiveMonthlyRent)} <span className="text-xs font-normal text-muted-foreground">/mese</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Sovrapprezzo mensile non dovuto: +{formatCurrency(monthlyDifference)}/mese ({formatCurrency(annualDifference)}/anno)
              </p>
            </div>

            {/* Box 3: Rimborso arretrati recuperabile */}
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-foreground block">
                  Somma Totale Recuperabile (Rimborso Arretrati):
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Ripetizione dell&apos;indebito ex art. 2033 c.c. ({yearsOvercharged} anni)
                </span>
              </div>
              <div className="text-2xl font-black text-primary">
                {formatCurrency(totalRefundClaimable)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Step Action */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/30 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-foreground flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="h-4 w-4 text-primary" />
              Vuoi contestare l&apos;aumento al proprietario o richiedere gli arretrati?
            </h4>
            <p className="text-xs text-muted-foreground">
              Genera all&apos;istante la PEC formale di contestazione con i riferimenti di legge e il conteggio allegato.
            </p>
          </div>
          <Link
            href="/dashboard/letters"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground shadow hover:bg-primary/90"
          >
            Genera PEC di Contestazione <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
