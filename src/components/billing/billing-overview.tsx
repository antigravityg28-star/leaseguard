// =============================================================================
// LEASEGUARD B2B - Billing Overview Component
// =============================================================================
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Crown, Mail } from "lucide-react";

export function BillingOverview() {
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "professional" }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      toast({ title: "Errore", description: "Impossibile creare il checkout.", variant: "destructive" });
    }
  };

  const handleManagePortal = async () => {
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast({ title: "Attenzione", description: data.error || "Nessuna sottoscrizione attiva trovata." });
      }
    } catch (err) {
      toast({ title: "Errore", description: "Impossibile aprire il portale pagamenti.", variant: "destructive" });
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            Piano Attuale
          </CardTitle>
          <CardDescription>Starter — 14 giorni gratuiti</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Hai attivo il piano Starter con 14 giorni di prova gratuita. Scade il 26/09/2026.
          </p>
          <Button onClick={handleUpgrade} className="w-full">
            Passa a Professional <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Metodo di Pagamento</CardTitle>
          <CardDescription>Ultimo aggiornamento: carta di credito</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-12 rounded bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-800">VISA</div>
              <span className="text-sm text-muted-foreground">•••• •••• •••• 4242</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleManagePortal}>Gestisci Fatture & Carta</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
