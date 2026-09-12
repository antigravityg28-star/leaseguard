// =============================================================================
// LEASEGUARD B2B - Lease Form Component
// =============================================================================
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { createLeaseSchema } from "@/lib/validators/lease-validator";

type LeaseFormData = z.infer<typeof createLeaseSchema>;

export function LeaseForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(createLeaseSchema),
    defaultValues: {
      code: "",
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
    startTransition(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Non autenticato");

        const { data: profile } = await supabase
          .from("profiles")
          .select("company_id")
          .eq("auth_user_id", user.id)
          .single();

        if (!profile?.company_id) {
          throw new Error("Azienda non trovata. Crea prima il tuo profilo.");
        }

        const { error } = await supabase.from("leases").insert({
          ...data,
          company_id: profile.company_id,
          code: data.code.toUpperCase(),
          lease_start_date: data.lease_start_date,
          lease_end_date: data.lease_end_date || null,
        });

        if (error) throw error;

        toast({ title: "Successo!", description: "Contratto registrato correttamente." });
        router.push("/dashboard/leases");
      } catch (err: any) {
        toast({ title: "Errore", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dati Immobile</CardTitle>
            <CardDescription>Informazioni sul locale locato</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="code" render={({ field }) => (
              <FormItem><FormLabel>Codice Contratto</FormLabel><FormControl><Input placeholder="LG-001" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_type" render={({ field }) => (
              <FormItem><FormLabel>Tipo Immobile</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="shop">Negozio</SelectItem><SelectItem value="restaurant">Ristorante</SelectItem><SelectItem value="office">Ufficio</SelectItem><SelectItem value="warehouse">Magazzino</SelectItem><SelectItem value="franchise">Franchising</SelectItem><SelectItem value="other">Altro</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_name" render={({ field }) => (
              <FormItem><FormLabel>Nome Immobile</FormLabel><FormControl><Input placeholder="Via Roma 123 - Negozio" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_address" render={({ field }) => (
              <FormItem><FormLabel>Indirizzo</FormLabel><FormControl><Input placeholder="Via Roma 123" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_city" render={({ field }) => (
              <FormItem><FormLabel>Città</FormLabel><FormControl><Input placeholder="Roma" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_province" render={({ field }) => (
              <FormItem><FormLabel>Provincia</FormLabel><FormControl><Input placeholder="RM" maxLength={2} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="property_cap" render={({ field }) => (
              <FormItem><FormLabel>CAP</FormLabel><FormControl><Input placeholder="00100" maxLength={5} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="base_rent_monthly" render={({ field }) => (
              <FormItem><FormLabel>Canone Mensile Base (€)</FormLabel><FormControl><Input type="number" placeholder="1200" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dettagli Contratto</CardTitle>
            <CardDescription>Durata, condizioni e clausole</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="lease_start_date" render={({ field }) => (
              <FormItem><FormLabel>Data Inizio</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="lease_end_date" render={({ field }) => (
              <FormItem><FormLabel>Data Fine</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="notice_period_months" render={({ field }) => (
              <FormItem><FormLabel>Preavviso Disdetta (mesi)</FormLabel><Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={field.value?.toString()}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="3">3 mesi</SelectItem><SelectItem value="6">6 mesi</SelectItem><SelectItem value="12">12 mesi</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="deposit_amount" render={({ field }) => (
              <FormItem><FormLabel>Deposito/Cauzione (€)</FormLabel><FormControl><Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="index_percentage" render={({ field }) => (
              <FormItem><FormLabel>Percentuale Adeguamento ISTAT (%)</FormLabel><Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={field.value?.toString()}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="75">75% (norma standard)</SelectItem><SelectItem value="100">100%</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="deposit_type" render={({ field }) => (
              <FormItem><FormLabel>Tipo Deposito</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="bank_guarantee">Fideiussione Bancaria</SelectItem><SelectItem value="cash">Deposito in Contanti</SelectItem><SelectItem value="insurance">Polizza Assicurativa</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/leases")}>Annulla</Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Salva Contratto
          </Button>
        </div>
      </form>
    </Form>
  );
}
