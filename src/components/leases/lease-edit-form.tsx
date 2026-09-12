// =============================================================================
// LEASEGUARD B2B - Lease Edit Form Component
// =============================================================================
"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import { createLeaseSchema } from "@/lib/validators/lease-validator";
import Link from "next/link";

interface LeaseEditFormProps {
  lease: any;
}

export function LeaseEditForm({ lease }: LeaseEditFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(createLeaseSchema),
    defaultValues: {
      code: lease.code || "",
      property_name: lease.property_name || "",
      property_address: lease.property_address || "",
      property_city: lease.property_city || "",
      property_province: lease.property_province || "",
      property_cap: lease.property_cap || "",
      property_type: (lease.property_type || "shop") as any,
      landlord_name: lease.landlord_name || "",
      landlord_address: lease.landlord_address || "",
      landlord_pec: lease.landlord_pec || "",
      lease_start_date: lease.lease_start_date || "",
      lease_end_date: lease.lease_end_date || "",
      base_rent_monthly: Number(lease.base_rent_monthly) || 0,
      rent_percentage: Boolean(lease.rent_percentage),
      percentage_breakpoint: Number(lease.percentage_breakpoint) || 0,
      percentage_rate: Number(lease.percentage_rate) || 0,
      is_statute_indexed: Boolean(lease.is_statute_indexed),
      index_percentage: Number(lease.index_percentage) || 75,
      base_index_year: Number(lease.base_index_year) || 2024,
      cam_expenses_monthly: Number(lease.cam_expenses_monthly) || 0,
      deposit_amount: Number(lease.deposit_amount) || 0,
      deposit_type: (lease.deposit_type || "bank_guarantee") as any,
      notice_period_months: Number(lease.notice_period_months) || 6,
      renewal_option: Boolean(lease.renewal_option),
      renewal_years: Number(lease.renewal_years) || 6,
      break_option: Boolean(lease.break_option),
      break_years: Number(lease.break_years) || 3,
      break_notice_months: Number(lease.break_notice_months) || 6,
    },
  });

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      try {
        const { error } = await supabase
          .from("leases")
          .update({
            ...data,
            code: data.code.toUpperCase(),
            lease_start_date: data.lease_start_date,
            lease_end_date: data.lease_end_date || null,
          })
          .eq("id", lease.id);

        if (error) throw error;

        toast({ title: "Aggiornato!", description: "Dati del contratto aggiornati con successo." });
        router.push(`/dashboard/leases/${lease.id}`);
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
            <CardDescription>Modifica le informazioni sul punto vendita</CardDescription>
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
            <CardTitle>Dettagli Contratto & Locatore</CardTitle>
            <CardDescription>Date e riferimenti della proprietà</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="lease_start_date" render={({ field }) => (
              <FormItem><FormLabel>Data Inizio</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="lease_end_date" render={({ field }) => (
              <FormItem><FormLabel>Data Fine</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="landlord_name" render={({ field }) => (
              <FormItem><FormLabel>Nome / Ragione Sociale Locatore</FormLabel><FormControl><Input placeholder="Immobiliare S.r.l." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="landlord_pec" render={({ field }) => (
              <FormItem><FormLabel>PEC Locatore</FormLabel><FormControl><Input placeholder="locatore@pec.it" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="notice_period_months" render={({ field }) => (
              <FormItem><FormLabel>Preavviso Disdetta (mesi)</FormLabel><Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={field.value?.toString()}><FormControl><SelectTrigger><SelectValue placeholder="Seleziona..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="3">3 mesi</SelectItem><SelectItem value="6">6 mesi</SelectItem><SelectItem value="12">12 mesi</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="deposit_amount" render={({ field }) => (
              <FormItem><FormLabel>Deposito/Cauzione (€)</FormLabel><FormControl><Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl><FormMessage /></FormItem>
            )} />
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Link
            href={`/dashboard/leases/${lease.id}`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Annulla
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Salva Modifiche
          </Button>
        </div>
      </form>
    </Form>
  );
}
