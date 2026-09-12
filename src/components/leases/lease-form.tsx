// =============================================================================
// LEASEGUARD B2B - Lease Form Component (Resilient with Auto-Company creation)
// =============================================================================
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Loader2, Save } from "lucide-react";
import { createLeaseSchema } from "@/lib/validators/lease-validator";
import Link from "next/link";

export function LeaseForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(createLeaseSchema),
    defaultValues: {
      code: "LG-MIL-01",
      property_name: "",
      property_address: "",
      property_city: "",
      property_province: "",
      property_cap: "",
      property_type: "shop" as const,
      landlord_name: "",
      landlord_address: "",
      landlord_pec: "",
      lease_start_date: "",
      lease_end_date: "",
      base_rent_monthly: 0,
      rent_percentage: false,
      percentage_breakpoint: 0,
      percentage_rate: 0,
      is_statute_indexed: true,
      index_percentage: 75,
      base_index_year: 2024,
      cam_expenses_monthly: 0,
      deposit_amount: 0,
      deposit_type: "bank_guarantee" as const,
      notice_period_months: 6,
      renewal_option: false,
      renewal_years: 6,
      break_option: false,
      break_years: 3,
      break_notice_months: 6,
    },
  });

  const onSubmit = async (data: any) => {
    setIsPending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utente non autenticato. Effettua il login.");

      // Recupera o crea la company
      let companyId: string | null = null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (profile?.company_id) {
        companyId = profile.company_id;
      } else {
        // Auto-crea azienda se mancante
        const { data: newCompany, error: compErr } = await supabase
          .from("companies")
          .insert({
            name: data.property_name ? `${data.property_name} (Azienda)` : "Azienda Conduttrice",
            vat_number: `IT${Math.floor(10000000000 + Math.random() * 90000000000)}`,
            subscription_status: "trialing",
            subscription_plan: "starter",
          })
          .select()
          .single();

        if (compErr) throw compErr;
        companyId = newCompany.id;

        await supabase.from("profiles").insert({
          company_id: companyId,
          auth_user_id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Amministratore",
          email: user.email || "",
          role: "owner",
        });
      }

      if (!companyId) throw new Error("Impossibile associare l'azienda al contratto.");

      // Inserimento del contratto
      const { error: leaseError } = await supabase.from("leases").insert({
        company_id: companyId,
        code: data.code.toUpperCase(),
        property_name: data.property_name,
        property_address: data.property_address,
        property_city: data.property_city,
        property_province: data.property_province.toUpperCase(),
        property_cap: data.property_cap,
        property_type: data.property_type,
        landlord_name: data.landlord_name || null,
        landlord_address: data.landlord_address || null,
        landlord_pec: data.landlord_pec || null,
        lease_start_date: data.lease_start_date,
        lease_end_date: data.lease_end_date || null,
        base_rent_monthly: Number(data.base_rent_monthly),
        rent_percentage: Boolean(data.rent_percentage),
        percentage_breakpoint: Number(data.percentage_breakpoint) || 0,
        percentage_rate: Number(data.percentage_rate) || 0,
        is_statute_indexed: Boolean(data.is_statute_indexed),
        index_percentage: Number(data.index_percentage) || 75,
        base_index_year: Number(data.base_index_year) || 2024,
        cam_expenses_monthly: Number(data.cam_expenses_monthly) || 0,
        deposit_amount: Number(data.deposit_amount) || 0,
        deposit_type: data.deposit_type,
        notice_period_months: Number(data.notice_period_months) || 6,
        renewal_option: Boolean(data.renewal_option),
        renewal_years: Number(data.renewal_years) || 6,
        break_option: Boolean(data.break_option),
        break_years: Number(data.break_years) || 3,
        break_notice_months: Number(data.break_notice_months) || 6,
        current_status: "active",
      });

      if (leaseError) throw leaseError;

      toast({
        title: "Contratto Salvato con Successo!",
        description: "Reindirizzamento all'elenco dei locativi...",
      });

      // Redirezione immediata
      window.location.href = "/dashboard/leases";
    } catch (err: any) {
      console.error("Save lease error:", err);
      toast({
        title: "Errore durante il salvataggio",
        description: err.message || "Verifica i dati inseriti e riprova.",
        variant: "destructive",
      });
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
