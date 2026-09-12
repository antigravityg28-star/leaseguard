// =============================================================================
// LEASEGUARD B2B - Company Settings Component
// =============================================================================
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const settingsSchema = z.object({
  companyName: z.string().min(2, "Nome azienda richiesto"),
  legalName: z.string().optional(),
  vatNumber: z.string().min(11, "Partita IVA"),
  pecEmail: z.string().email("Email PEC non valida").optional().or(z.literal("")),
  phone: z.string().optional(),
  website: z.string().url("URL non valido").optional().or(z.literal("")),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export function CompanySettings() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: "",
      legalName: "",
      vatNumber: "",
      pecEmail: "",
      phone: "",
      website: "",
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    startTransition(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Utente non autenticato");

        const { data: profile } = await supabase
          .from("profiles")
          .select("company_id")
          .eq("auth_user_id", user.id)
          .single();

        if (!profile?.company_id) throw new Error("Azienda non trovata");

        const { error } = await supabase
          .from("companies")
          .update({
            name: data.companyName,
            legal_name: data.legalName,
            vat_number: data.vatNumber,
            pec_email: data.pecEmail || null,
            phone: data.phone || null,
            website: data.website || null,
          })
          .eq("id", profile.company_id);

        if (error) throw error;
        toast({ title: "Successo!", description: "Impostazioni aggiornate." });
      } catch (err: any) {
        toast({ title: "Errore", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dati Azienda</CardTitle>
          <CardDescription>Informazioni sulla tua partita IVA</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField control={form.control} name="companyName" render={({ field }) => (
            <FormItem><FormLabel>Nome Azienda</FormLabel><FormControl><Input placeholder="Mario Rossi S.r.l." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="legalName" render={({ field }) => (
            <FormItem><FormLabel>Ragione Sociale</FormLabel><FormControl><Input placeholder="Mario Rossi S.r.l." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="vatNumber" render={({ field }) => (
            <FormItem><FormLabel>Partita IVA</FormLabel><FormControl><Input placeholder="01234567890" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="pecEmail" render={({ field }) => (
            <FormItem><FormLabel>Email PEC</FormLabel><FormControl><Input placeholder="pec@pec.it" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Telefono</FormLabel><FormControl><Input placeholder="+39 06 1234567" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="website" render={({ field }) => (
            <FormItem><FormLabel>Sito Web</FormLabel><FormControl><Input placeholder="https://www.miosito.it" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </CardContent>
      </Card>
      <Button type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Salva Impostazioni
      </Button>
    </form>
  );
}
