// =============================================================================
// LEASEGUARD B2B - Sign Up Form (Direct Supabase Client with Profile & Company)
// =============================================================================
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const signupSchema = z.object({
  fullName: z.string().min(2, "Inserisci il tuo nome"),
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "La password deve avere almeno 6 caratteri"),
  companyName: z.string().min(2, "Inserisci la ragione sociale o nome attività"),
  vatNumber: z.string().min(8, "Partita IVA non valida"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      vatNumber: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsPending(true);
    try {
      // 1. Registra utente in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password,
        options: {
          data: {
            full_name: data.fullName.trim(),
          },
        },
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) {
        throw new Error("Errore durante la creazione dell'account.");
      }

      // 2. Crea l'Azienda nel Database
      const { data: company, error: compError } = await supabase
        .from("companies")
        .insert({
          name: data.companyName.trim(),
          vat_number: data.vatNumber.trim(),
          subscription_status: "trialing",
          subscription_plan: "starter",
        })
        .select()
        .single();

      if (compError) {
        console.warn("Company insert notice:", compError);
      }

      // 3. Crea il Profilo Utente
      if (company?.id) {
        await supabase.from("profiles").insert({
          company_id: company.id,
          auth_user_id: userId,
          full_name: data.fullName.trim(),
          email: data.email.trim(),
          role: "owner",
        });
      }

      toast({
        title: "Account Creato con Successo!",
        description: "Benvenuto su LeaseGuard B2B.",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error("Signup error:", err);
      toast({
        title: "Errore di Registrazione",
        description: err.message || "Impossibile completare la registrazione.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome e Cognome</FormLabel>
                <FormControl>
                  <Input placeholder="Mario Rossi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Aziendale</FormLabel>
                <FormControl>
                  <Input placeholder="mario.rossi@azienda.it" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Azienda / Insegna Locale</FormLabel>
                <FormControl>
                  <Input placeholder="Trattoria Milano S.r.l." {...field} />
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
                <FormLabel>Partita IVA</FormLabel>
                <FormControl>
                  <Input placeholder="IT01234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creazione Account...
              </>
            ) : (
              "Inizia Gratis — 14 Giorni"
            )}
          </Button>

          <div className="pt-2 text-center text-xs text-muted-foreground">
            Hai già un account?{" "}
            <Link href="/dashboard/auth/signin" className="text-primary font-semibold hover:underline">
              Accedi qui
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
