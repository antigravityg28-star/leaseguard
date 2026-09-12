// =============================================================================
// LEASEGUARD B2B - Company Settings Component (Wrapped with Form & Pre-Loaded)
// =============================================================================
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Loader2, Save, Building, ShieldCheck } from "lucide-react";

export function CompanySettings() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      companyName: "",
      legalName: "",
      vatNumber: "",
      pecEmail: "",
      phone: "",
      website: "",
    },
  });

  // Carica i dati dell'azienda dell'utente
  useEffect(() => {
    async function loadCompanyData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("company_id")
          .eq("auth_user_id", user.id)
          .maybeSingle();

        if (profile?.company_id) {
          setCompanyId(profile.company_id);
          const { data: company } = await supabase
            .from("companies")
            .select("*")
            .eq("id", profile.company_id)
            .maybeSingle();

          if (company) {
            form.reset({
              companyName: company.name || "",
              legalName: company.legal_name || "",
              vatNumber: company.vat_number || "",
              pecEmail: company.pec_email || "",
              phone: company.phone || "",
              website: company.website || "",
            });
          }
        }
      } catch (err) {
        console.warn("Could not load company data:", err);
      }
    }
    loadCompanyData();
  }, [form]);

  const onSubmit = async (data: any) => {
    setIsPending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utente non autenticato");

      let currentCompId = companyId;

      if (!currentCompId) {
        const { data: newComp, error: compErr } = await supabase
          .from("companies")
          .insert({
            name: data.companyName || "Azienda Conduttrice",
            vat_number: data.vatNumber || "IT00000000000",
            legal_name: data.legalName || null,
            pec_email: data.pecEmail || null,
            phone: data.phone || null,
            website: data.website || null,
            subscription_status: "trialing",
            subscription_plan: "starter",
          })
          .select()
          .single();

        if (compErr) throw compErr;
        currentCompId = newComp.id;
        setCompanyId(currentCompId);

        await supabase.from("profiles").upsert({
          company_id: currentCompId,
          auth_user_id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Amministratore",
          email: user.email || "",
          role: "owner",
        });
      } else {
        const { error } = await supabase
          .from("companies")
          .update({
            name: data.companyName,
            legal_name: data.legalName || null,
            vat_number: data.vatNumber,
            pec_email: data.pecEmail || null,
            phone: data.phone || null,
            website: data.website || null,
          })
          .eq("id", currentCompId);

        if (error) throw error;
      }

      toast({ title: "Successo!", description: "Dati aziendali aggiornati correttamente." });
    } catch (err: any) {
      toast({ title: "Errore", description: err.message, variant: "destructive" });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="h-5 w-5 text-primary" />
              Dati Anagrafici & Fiscali
            </CardTitle>
            <CardDescription>
              Informazioni utilizzate per l&apos;intestazione delle lettere legali e delle PEC di contestazione.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Azienda / Insegna</FormLabel>
                  <FormControl>
                    <Input placeholder="Trattoria Milano S.r.l." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ragione Sociale Completa</FormLabel>
                  <FormControl>
                    <Input placeholder="Trattoria Milano S.r.l. Semplificata" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vatNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partita IVA / Codice Fiscale</FormLabel>
                  <FormControl>
                    <Input placeholder="01234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pecEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indirizzo PEC Ufficiale</FormLabel>
                  <FormControl>
                    <Input placeholder="azienda@pec.it" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono / Recapito</FormLabel>
                  <FormControl>
                    <Input placeholder="+39 02 1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sito Web / Social</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.trattoriamilano.it" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending} className="min-w-[160px]">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvataggio...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Salva Impostazioni
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
