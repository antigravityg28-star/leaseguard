// =============================================================================
// LEASEGUARD B2B - Sign Up Form
// =============================================================================
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "@/lib/actions/auth-actions";

const signupSchema = z.object({
  fullName: z.string().min(2, "Nome troppo corto"),
  email: z.string().email("Email non valida"),
  password: z.string().min(8, "Password almeno 8 caratteri"),
  companyName: z.string().min(2, "Nome azienda"),
  vatNumber: z.string().min(11, "Partita IVA minima 11 caratteri").max(16),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

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
    startTransition(async () => {
      const result = await signUp(data);
      if (result.error) {
        toast({ title: "Errore", description: result.error, variant: "destructive" });
      } else {
        toast({ title: "Account creato!", description: "Verifica la tua email." });
        router.push("/dashboard");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
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
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome azienda</FormLabel>
              <FormControl>
                <Input placeholder="Mario Rossi S.r.l." {...field} />
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
                <Input placeholder="01234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Registrazione in corso..." : "Crea Account Gratis"}
        </Button>
      </form>
    </Form>
  );
}
