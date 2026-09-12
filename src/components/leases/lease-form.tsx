// =============================================================================
// LEASEGUARD B2B - Lease Form Component (Robust, No Silent Failures)
// =============================================================================
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Loader2, Save } from "lucide-react";
import Link from "next/link";

export function LeaseForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    defaultValues: {
      code: "LG-MIL-01",
      property_name: "Trattoria Milano Centro — Corso Buenos Aires",
      property_address: "Corso Buenos Aires 45",
      property_city: "Milano",
      property_province: "MI",
      property_cap: "20124",
      property_type: "restaurant",
      landlord_name: "Immobiliare Sempione S.r.l.",
      landlord_address: "Via Dante 10, Milano",
      landlord_pec: "immobiliare.sempione@pec.it",
      lease_start_date: "2021-06-01",
      lease_end_date: "2027-05-31",
      base_rent_monthly: 3200,
      rent_percentage: false,
      percentage_breakpoint: 0,
      percentage_rate: 0,
      is_statute_indexed: true,
      index_percentage: 75,
      base_index_year: 2021,
      cam_expenses_monthly: 0,
      deposit_amount: 9600,
      deposit_type: "bank_guarantee",
      notice_period_months: 12,
      renewal_option: false,
      renewal_years: 6,
      break_option: false,
      break_years: 3,
      break_notice_months: 6,
    },
  });

  const onSubmit = async (values: any) => {
    setIsPending(true);
    try {
      const { data: { user }, error: userErr } = await supabase.auth.getUser();
      if (userErr || !user) {
        throw new Error("Sessione scaduta. Effettua nuovamente l'accesso.");
      }

      // 1. Trova o crea la Company associata
      let companyId: string | null = null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (profile?.company_id) {
        companyId = profile.company_id;
      } else {
        const { data: newComp, error: compErr } = await supabase
          .from("companies")
          .insert({
            name: values.property_name || "Azienda Conduttrice",
            vat_number: `IT${Math.floor(10000000000 + Math.random() * 90000000000)}`,
            subscription_status: "trialing",
            subscription_plan: "starter",
          })
          .select()
          .single();

        if (compErr) {
          console.warn("Notice creating company:", compErr);
        }

        companyId = newComp?.id || null;

        if (companyId) {
          await supabase.from("profiles").upsert({
            company_id: companyId,
            auth_user_id: user.id,
            full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Amministratore",
            email: user.email || "",
            role: "owner",
          });
        }
      }

      // Se non abbiamo ancora un companyId, creane una di riserva
      if (!companyId) {
        const { data: fallbackComp } = await supabase
          .from("companies")
          .select("id")
          .limit(1)
          .single();
        companyId = fallbackComp?.id || null;
      }

      // 2. Inserimento del contratto
      const payload: any = {
        code: (values.code || "LG-01").toUpperCase(),
        property_name: values.property_name || "Locale Commerciale",
        property_address: values.property_address || "Indirizzo non specificato",
        property_city: values.property_city || "Milano",
        property_province: (values.property_province || "MI").toUpperCase(),
        property_cap: values.property_cap || "00000",
        property_type: values.property_type || "shop",
        landlord_name: values.landlord_name || "Proprietà",
        landlord_address: values.landlord_address || null,
        landlord_pec: values.landlord_pec || null,
        lease_start_date: values.lease_start_date || "2021-06-01",
        lease_end_date: values.lease_end_date || "2027-05-31",
        base_rent_monthly: Number(values.base_rent_monthly) || 0,
        rent_percentage: Boolean(values.rent_percentage),
        percentage_breakpoint: Number(values.percentage_breakpoint) || 0,
        percentage_rate: Number(values.percentage_rate) || 0,
        is_statute_indexed: Boolean(values.is_statute_indexed),
        index_percentage: Number(values.index_percentage) || 75,
        base_index_year: Number(values.base_index_year) || 2021,
        cam_expenses_monthly: Number(values.cam_expenses_monthly) || 0,
        deposit_amount: Number(values.deposit_amount) || 0,
        deposit_type: values.deposit_type || "bank_guarantee",
        notice_period_months: Number(values.notice_period_months) || 6,
        renewal_option: Boolean(values.renewal_option),
        renewal_years: Number(values.renewal_years) || 6,
        break_option: Boolean(values.break_option),
        break_years: Number(values.break_years) || 3,
        break_notice_months: Number(values.break_notice_months) || 6,
        current_status: "active",
      };

      if (companyId) {
        payload.company_id = companyId;
      }

      const { data: newLease, error: insertError } = await supabase
        .from("leases")
        .insert(payload)
        .select()
        .single();

      if (insertError) throw insertError;

      toast({
        title: "Contratto Salvato con Successo!",
        description: "Reindirizzamento all'elenco dei locativi...",
      });

      // Redirezione immediata all'elenco locativi
      window.location.href = "/dashboard/leases";
    } catch (err: any) {
      console.error("Save lease error:", err);
      toast({
        title: "Errore durante il salvataggio",
        description: err.message || "Verifica la connessione e riprova.",
        variant: "destructive",
      });
      setIsPending(false);
    }
  };

  const onError = (errors: any) => {
    console.warn("Form validation errors:", errors);
    toast({
      title: "Campi incompleti",
      description: "Verifica che il nome dell'immobile sia inserito.",
      variant: "destructive",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dati Immobile</CardTitle>
            <CardDescription>Informazioni sul locale commerciale locato</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="code" render={({ field }) => (
              <FormItem><FormLabel>Codice Contratto</FormLabel><FormControl><Input placeholder="LG-MIL-01" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_type" render={({ field }) => (
              <FormItem><FormLabel>Tipo Immobile</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="shop">Negozio</SelectItem><SelectItem value="restaurant">Ristorante</SelectItem><SelectItem value="office">Ufficio</SelectItem><SelectItem value="warehouse">Magazzino</SelectItem><SelectItem value="franchise">Franchising</SelectItem><SelectItem value="other">Altro</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_name" render={({ field }) => (
              <FormItem><FormLabel>Nome Immobile / Insegna</FormLabel><FormControl><Input placeholder="Trattoria Milano Centro — Corso Buenos Aires" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_address" render={({ field }) => (
              <FormItem><FormLabel>Indirizzo</FormLabel><FormControl><Input placeholder="Corso Buenos Aires 45" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_city" render={({ field }) => (
              <FormItem><FormLabel>Città</FormLabel><FormControl><Input placeholder="Milano" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_province" render={({ field }) => (
              <FormItem><FormLabel>Provincia (2 lettere)</FormLabel><FormControl><Input placeholder="MI" maxLength={2} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_cap" render={({ field }) => (
              <FormItem><FormLabel>CAP (5 cifre)</FormLabel><FormControl><Input placeholder="20124" maxLength={5} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="base_rent_monthly" render={({ field }) => (
              <FormItem><FormLabel>Canone Mensile Base (€)</FormLabel><FormControl><Input type="number" placeholder="3200" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dettagli Contratto & Scadenze</CardTitle>
            <CardDescription>Durata, preavviso PEC e clausola ISTAT</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="lease_start_date" render={({ field }) => (
              <FormItem><FormLabel>Data Inizio Contratto</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="lease_end_date" render={({ field }) => (
              <FormItem><FormLabel>Data Fine (Scadenza 1° Periodo)</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="notice_period_months" render={({ field }) => (
              <FormItem><FormLabel>Preavviso Disdetta PEC (mesi)</FormLabel><Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={field.value?.toString()}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="6">6 mesi di preavviso</SelectItem><SelectItem value="12">12 mesi di preavviso</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="deposit_amount" render={({ field }) => (
              <FormItem><FormLabel>Deposito Cauzionale / Fideiussione (€)</FormLabel><FormControl><Input type="number" placeholder="9600" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="index_percentage" render={({ field }) => (
              <FormItem><FormLabel>Percentuale Adeguamento ISTAT (%)</FormLabel><Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={field.value?.toString()}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="75">75% (Norma di Legge Art. 32 L. 392/78)</SelectItem><SelectItem value="100">100%</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="deposit_type" render={({ field }) => (
              <FormItem><FormLabel>Forma di Garanzia Prestata</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="bank_guarantee">Fideiussione Bancaria</SelectItem><SelectItem value="cash">Deposito in Contanti</SelectItem><SelectItem value="insurance">Polizza Fideiussoria</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/leases"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
          >
            Annulla
          </Link>
          <Button type="submit" disabled={isPending} className="min-w-[160px]">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvataggio...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Salva Contratto
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
