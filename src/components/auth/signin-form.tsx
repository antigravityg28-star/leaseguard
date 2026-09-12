// =============================================================================
// LEASEGUARD B2B - Sign In Form (Direct Supabase SSR Client with Hard Navigation)
// =============================================================================
"use client";

import { useState } from "react";
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

const signinSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(6, "La password deve avere almeno 6 caratteri"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export function SignInForm() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    setIsPending(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      });

      if (error) throw error;

      if (!authData.session) {
        throw new Error("Sessione non avviata. Verifica le tue credenziali.");
      }

      toast({ title: "Bentornato!", description: "Accesso in corso alla Dashboard..." });

      // Navigazione completa con cookie sincronizzati
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast({
        title: "Errore di Accesso",
        description: err.message || "Credenziali non valide. Riprova.",
        variant: "destructive",
      });
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="tuo@email.com" type="email" {...field} />
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
          <Button type="submit" className="w-full mt-2" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Accesso in corso...
              </>
            ) : (
              "Accedi alla Dashboard"
            )}
          </Button>

          <div className="pt-2 text-center text-xs text-muted-foreground">
            Non hai ancora un account?{" "}
            <Link href="/dashboard/auth/signup" className="text-primary font-semibold hover:underline">
              Registrati gratis
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
